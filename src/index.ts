import Papa from 'papaparse';
import fs from 'fs/promises';
import crypto from 'crypto';
import { ParsedTransaction, parseTransactionDescription } from './parseTransactionDescription';

function sha256(data: string) {
  return crypto.createHash('sha256').update(data, 'binary').digest('base64');
}

function mapCSVRowToDataEntry(csvRow: Papa.ParseStepResult<unknown>) {
  const data = csvRow.data as string[];

  if (data.length !== 5) {
    console.log('skipping row since its not transaction');
    return;
  }

  const [rowDate, rowDescription, rowDebit, rowCredit] = data;

  const trimmedDescription = rowDescription!.trim();

  const isNegativeTransaction = rowDebit !== '' && rowCredit === '';
  const parsedAmount = isNegativeTransaction
    ? -Number(rowDebit.replace('.', ''))
    : Number(rowCredit.replace('.', ''));

  const id = `${rowDate}-${trimmedDescription}-${parsedAmount}`;
  const hashedId = sha256(id);

  const { paymentType, category } = parseTransactionDescription(trimmedDescription);

  return {
    hashedId,
    date: rowDate,
    amount: parsedAmount,
    paymentType,
    category,
    fullDescription: trimmedDescription,
  };
}

async function main() {
  const csvContent = await fs.readFile('./input/2022.csv', 'utf-8');

  try {
    await fs.unlink('output/all_parsed.json');
    await fs.unlink('output/uncategorized.json');
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.writeFile('output/all_parsed.json', '', { flag: 'w' });
      await fs.writeFile('output/uncategorized.json', '', { flag: 'w' });
    }
  }

  const allTransactions: ParsedTransaction[] = [];
  const uncategorizedTransactions: ParsedTransaction[] = [];

  Papa.parse(csvContent, {
    step: (row) => {
      const parsedTransaction = mapCSVRowToDataEntry(row);
      if (parsedTransaction === undefined) {
        // skip unusable lines
        return;
      }

      if (parsedTransaction.category === 'uncategorized') {
        // useful for debugging your category keywords
        uncategorizedTransactions.push(parsedTransaction);
      }

      allTransactions.push(parsedTransaction);
    },
    complete: async () => {
      await fs.writeFile('output/uncategorized.json', JSON.stringify(uncategorizedTransactions));
      await fs.writeFile('output/all_parsed.json', JSON.stringify(allTransactions));
      console.log(`🎉 All Done! I parsed a total of ${allTransactions.length} transactions!`);
    },
  });
}

main();
