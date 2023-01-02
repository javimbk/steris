import {
  EDUCATION_KEYWORDS,
  ENTERTAINMENT_KEYWORDS,
  FIXED_COST_KEYWORDS,
  HOME_KEYWORDS,
  ONLINE_SHOPPING_KEYWORDS,
  OTHER_TRANSPORTATION_KEYWORDS,
  PUBLIC_TRANSPORTATION_KEYWORDS,
  RESTAURANT_KEYWORDS,
  SAAS_KEYWORDS,
  SALARY_KEYWORDS,
  SPORTS_KEYWORDS,
  SUPERMARKET_KEYWORDS,
  TRIP_KEYWORDS,
} from '../input/category-keywords';

type TRX_CATEGORY =
  | 'salary'
  | 'fixed_cost'
  | 'supermarket'
  | 'home'
  | 'trip'
  | 'saas'
  | 'online_shopping'
  | 'public_transportation'
  | 'other_transportation'
  | 'education'
  | 'restaurant'
  | 'entertainment'
  | 'sports'
  | 'uncategorized';

function isDescriptionIncludingKeywords(fullDescription: string, keywords: readonly string[]) {
  return keywords.some((keyword) => fullDescription.includes(keyword));
}

function extractCategoryFromFullDescription(fullDescription: string): TRX_CATEGORY {
  const lowerCaseFullDescription = fullDescription.toLowerCase();

  const isSalaryCategory = isDescriptionIncludingKeywords(
    lowerCaseFullDescription,
    SALARY_KEYWORDS
  );
  if (isSalaryCategory) {
    return 'salary';
  }

  const isFixedCostCategory = isDescriptionIncludingKeywords(
    lowerCaseFullDescription,
    FIXED_COST_KEYWORDS
  );
  if (isFixedCostCategory) {
    return 'fixed_cost';
  }

  const isSuperMarketCategory = isDescriptionIncludingKeywords(
    lowerCaseFullDescription,
    SUPERMARKET_KEYWORDS
  );
  if (isSuperMarketCategory) {
    return 'supermarket';
  }

  const isHomeCategory = isDescriptionIncludingKeywords(lowerCaseFullDescription, HOME_KEYWORDS);
  if (isHomeCategory) {
    return 'home';
  }

  const isTripCategory = isDescriptionIncludingKeywords(lowerCaseFullDescription, TRIP_KEYWORDS);
  if (isTripCategory) {
    return 'trip';
  }

  const isSAASCategory = isDescriptionIncludingKeywords(lowerCaseFullDescription, SAAS_KEYWORDS);
  if (isSAASCategory) {
    return 'saas';
  }

  const isOnlineShoppingCategory = isDescriptionIncludingKeywords(
    lowerCaseFullDescription,
    ONLINE_SHOPPING_KEYWORDS
  );
  if (isOnlineShoppingCategory) {
    return 'online_shopping';
  }

  const isPublicTransportationCategory = isDescriptionIncludingKeywords(
    lowerCaseFullDescription,
    PUBLIC_TRANSPORTATION_KEYWORDS
  );
  if (isPublicTransportationCategory) {
    return 'public_transportation';
  }

  const isOtherTransportationCategory = isDescriptionIncludingKeywords(
    lowerCaseFullDescription,
    OTHER_TRANSPORTATION_KEYWORDS
  );
  if (isOtherTransportationCategory) {
    return 'other_transportation';
  }

  const isEducationCategory = isDescriptionIncludingKeywords(
    lowerCaseFullDescription,
    EDUCATION_KEYWORDS
  );
  if (isEducationCategory) {
    return 'education';
  }

  const isRestaurantCategory = isDescriptionIncludingKeywords(
    lowerCaseFullDescription,
    RESTAURANT_KEYWORDS
  );
  if (isRestaurantCategory) {
    return 'restaurant';
  }

  const isEntertainmentCategory = isDescriptionIncludingKeywords(
    lowerCaseFullDescription,
    ENTERTAINMENT_KEYWORDS
  );
  if (isEntertainmentCategory) {
    return 'entertainment';
  }

  const isSportsCategory = isDescriptionIncludingKeywords(
    lowerCaseFullDescription,
    SPORTS_KEYWORDS
  );
  if (isSportsCategory) {
    return 'sports';
  }

  return 'uncategorized';
}

type TRX_PAYMENT_TYPE =
  | 'twint'
  | 'card_online'
  | 'card_irl'
  | 'cash_withdrawal'
  | 'invoice_qr'
  | 'payment_order'
  | 'bank_fees'
  | 'bank_transfer'
  | 'unknown';

function extractPaymentTypeFromFullDescription(fullDescription: string): TRX_PAYMENT_TYPE {
  const lowerCaseFullDescription = fullDescription.toLowerCase();

  if (lowerCaseFullDescription.includes('twint')) {
    return 'twint';
  }
  if (
    lowerCaseFullDescription.includes('debit card e-payment') ||
    lowerCaseFullDescription.includes('debit payment via e-mail / phone')
  ) {
    return 'card_online';
  }
  if (
    lowerCaseFullDescription.includes('debit payment abroad') ||
    lowerCaseFullDescription.includes('debit card point of sale payment') ||
    lowerCaseFullDescription.includes('debit card refund')
  ) {
    return 'card_irl';
  }
  if (
    lowerCaseFullDescription.includes('debit withdrawal abroad') ||
    lowerCaseFullDescription.includes('debit card cash withdrawal')
  ) {
    return 'cash_withdrawal';
  }
  if (lowerCaseFullDescription.includes('payment qr-bill')) {
    return 'invoice_qr';
  }
  if (lowerCaseFullDescription.includes('payment order')) {
    return 'payment_order';
  }
  if (lowerCaseFullDescription.includes('csx')) {
    return 'bank_fees';
  }
  if (
    lowerCaseFullDescription.includes('clearing payment') ||
    lowerCaseFullDescription.includes('payment domestic')
  ) {
    return 'bank_transfer';
  }

  return 'unknown';
}

export function parseTransactionDescription(fullDescription: string) {
  const paymentType = extractPaymentTypeFromFullDescription(fullDescription);
  const category = extractCategoryFromFullDescription(fullDescription);

  return {
    paymentType,
    category,
  };
}

export type ParsedTransaction = ReturnType<typeof parseTransactionDescription>;
