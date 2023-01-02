/**
 * This is a sample file of how some of your category keywords should be structured.
 * Fill it out with the data that suits your transactions in order to have a decent
 * categorization and remove the `.example` from the filename.
 */

export const SALARY_KEYWORDS = ['your_employer_name'] as const;
export const SUPERMARKET_KEYWORDS = ['migros', 'coop', 'denner', 'lidl', 'aldi'] as const;
export const HOME_KEYWORDS = ['ikea', 'maisons du monde'] as const;
export const SAAS_KEYWORDS = ['spotify', 'netflix'] as const;

/**
 * Remember to fill all categories that are imported from `input/category-keywords`
 * on the parser in `src/parseTransactionDescription.ts`
 */
