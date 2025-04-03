
// This file simulates XGBoost dynamic pricing analysis
// In a real implementation, this would call a backend API

type BookPricingFactors = {
  condition: string;
  genre: string;
  publishYear?: number;
  isPopular?: boolean;
  supplyCount?: number;
  demandScore?: number;
};

// Simulated XGBoost pricing model
export const getXGBoostPriceSuggestion = (bookDetails: BookPricingFactors): number => {
  console.log('Generating XGBoost price suggestion');
  
  // Base price based on condition
  const basePrice = {
    'Like New': 300,
    'Very Good': 250,
    'Good': 200,
    'Fair': 150,
    'Acceptable': 100,
  }[bookDetails.condition] || 200;
  
  // Genre multiplier
  const genreMultiplier = {
    'Fiction': 1.0,
    'Non-Fiction': 1.2,
    'Science Fiction': 1.1,
    'Mystery': 1.05,
    'Romance': 0.95,
    'Biography': 1.1,
    'History': 1.15,
    'Poetry': 0.9,
    'Self-Help': 1.1,
  }[bookDetails.genre] || 1.0;
  
  // Popularity factor (if available)
  const popularityFactor = bookDetails.isPopular ? 1.2 : 1.0;
  
  // Supply and demand factors (if available)
  const supplyFactor = bookDetails.supplyCount 
    ? Math.max(0.8, 1 - (bookDetails.supplyCount / 100))
    : 1.0;
    
  const demandFactor = bookDetails.demandScore
    ? Math.min(1.5, 1 + (bookDetails.demandScore / 100))
    : 1.0;
  
  // Age factor
  const currentYear = new Date().getFullYear();
  const ageFactor = bookDetails.publishYear
    ? Math.max(0.7, 1 - ((currentYear - bookDetails.publishYear) / 100))
    : 1.0;
  
  // Calculate the suggested price using all factors
  const suggestedPrice = basePrice * genreMultiplier * popularityFactor * supplyFactor * demandFactor * ageFactor;
  
  // Round to the nearest 10
  return Math.round(suggestedPrice / 10) * 10;
};

// Get price range for similar books (for price comparison)
export const getPriceRangeForSimilarBooks = (
  condition: string,
  genre: string,
  publishYear?: number
): { min: number; max: number; average: number } => {
  const basePrice = getXGBoostPriceSuggestion({
    condition,
    genre,
    publishYear
  });
  
  // Generate a price range around the base price
  const min = Math.round(basePrice * 0.85);
  const max = Math.round(basePrice * 1.15);
  const average = basePrice;
  
  return { min, max, average };
};
