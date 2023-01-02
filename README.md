# Steris

Wanted to start 2023 taking a look at our finances and since my Credit Suisse app doesn't help me get a good overview decided to build something in a day or two that will help me get a better overview of where I spend my money.

**TL;DR:** This is just a parser of Credit Suisse transactions that transforms them into something I can store in a database and can make some dashboards regarding how much I spent and where do I spend it.

## What this does

Takes a CSV with all my transactions from 2022 in my bank Credit Suisse in the format they give, which is this:

```csv
21.12.2022,"TWINT Payment ,SBB EasyRide App 3000 Bern ,of 20.12.22 at 06:49,SBB EasyRide App,3000 Bern ",7.80,,
```

and transforms them into a JSON full of parsed transactions like this one:

```json
{
  "hashedId": "0gy2QEzQGOUfHVSM9WNd7ntdrYvVd/WVHgSr8LMcTts=", // made from trx data to be "unique"
  "date": "21.12.2022",
  "amount": -780, // avoiding using decimals
  "paymentType": "twint",
  "category": "public_transportation",
  "fullDescription": "TWINT Payment ,SBB EasyRide App 3000 Bern ,of 20.12.22 at 06:49,SBB EasyRide App,3000 Bern"
},
```

## Requirements to use it

- `input/2022.csv`
  - CSV with all your transactions with the following structure, this works for my case with Credit Suisse, other banks may do it differently:
    - `date,description,debit,credit,balance`
  - Personally I removed the first 5 lines that are not transactions.
- `input/categories.ts`
  - List of keywords in the different categories that will suit your case, this is personal and that is why it is not part of the source code, this is not 100% foolproof but it is good enough for me.
  - Find an example on `input/categories.ts.example` regarding how this file should be filled.