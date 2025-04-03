
// This file simulates a hybrid recommendation system using BERT and SVD
// In a real implementation, this would call a backend API

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  condition: string;
  genre: string;
  description?: string;
};

type UserPreference = {
  favoriteGenres: string[];
  recentlyViewed: string[];
  purchaseHistory: string[];
};

// Simulated BERT content-based recommendation function
const getBERTContentRecommendations = (
  books: Book[],
  userPreferences: UserPreference,
  currentBookId?: string,
  limit: number = 4
): Book[] => {
  console.log('Generating BERT content-based recommendations');
  
  // In a real implementation, this would use a BERT model to analyze book content
  // and match it with user preferences
  
  // For this simulation, we'll just filter based on genre preference
  let recommendations = books.filter(book => 
    userPreferences.favoriteGenres.includes(book.genre)
  );
  
  // If we have a current book ID, exclude it from recommendations
  if (currentBookId) {
    recommendations = recommendations.filter(book => book.id !== currentBookId);
  }
  
  // Limit the number of recommendations
  return recommendations.slice(0, limit);
};

// Simulated SVD collaborative filtering recommendation function
const getSVDCollaborativeRecommendations = (
  books: Book[],
  userPreferences: UserPreference,
  currentBookId?: string,
  limit: number = 4
): Book[] => {
  console.log('Generating SVD collaborative filtering recommendations');
  
  // In a real implementation, this would use SVD to find similar users
  // and recommend books they enjoyed
  
  // For this simulation, we'll recommend based on purchase history and recently viewed
  const interactionHistory = [...userPreferences.purchaseHistory, ...userPreferences.recentlyViewed];
  
  // Simple collaborative logic: recommend books from the same authors the user has interacted with
  let recommendations = books.filter(book => {
    // Find if the user has interacted with any book by this author
    return books.some(otherBook => 
      interactionHistory.includes(otherBook.id) && 
      otherBook.author === book.author &&
      otherBook.id !== book.id
    );
  });
  
  // If we have a current book ID, exclude it from recommendations
  if (currentBookId) {
    recommendations = recommendations.filter(book => book.id !== currentBookId);
  }
  
  // Add some random books if we don't have enough recommendations
  if (recommendations.length < limit) {
    const randomBooks = books
      .filter(book => !recommendations.includes(book) && book.id !== currentBookId)
      .sort(() => 0.5 - Math.random())
      .slice(0, limit - recommendations.length);
      
    recommendations = [...recommendations, ...randomBooks];
  }
  
  // Limit the number of recommendations
  return recommendations.slice(0, limit);
};

// Hybrid recommendation system that combines both approaches
export const getHybridRecommendations = (
  books: Book[],
  userPreferences: UserPreference,
  currentBookId?: string,
  limit: number = 8
): Book[] => {
  // Get recommendations from both systems
  const contentRecommendations = getBERTContentRecommendations(books, userPreferences, currentBookId, limit / 2);
  const collaborativeRecommendations = getSVDCollaborativeRecommendations(books, userPreferences, currentBookId, limit / 2);
  
  // Combine and deduplicate
  const allRecommendations = [...contentRecommendations];
  
  // Add collaborative recommendations if they're not already in the list
  for (const book of collaborativeRecommendations) {
    if (!allRecommendations.find(rec => rec.id === book.id)) {
      allRecommendations.push(book);
    }
  }
  
  // If we still don't have enough recommendations, add some random ones
  if (allRecommendations.length < limit) {
    const randomBooks = books
      .filter(book => 
        !allRecommendations.find(rec => rec.id === book.id) && 
        book.id !== currentBookId
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, limit - allRecommendations.length);
      
    return [...allRecommendations, ...randomBooks];
  }
  
  return allRecommendations.slice(0, limit);
};

// Get personalized recommendations for the homepage
export const getPersonalizedRecommendations = (
  books: Book[],
  userPreferences: UserPreference,
  limit: number = 8
): Book[] => {
  return getHybridRecommendations(books, userPreferences, undefined, limit);
};

// Get similar books recommendations (for book details page)
export const getSimilarBooksRecommendations = (
  books: Book[],
  currentBookId: string,
  currentBookGenre: string,
  userPreferences: UserPreference,
  limit: number = 4
): Book[] => {
  // Create a temporary preference that emphasizes the current book's genre
  const enhancedPreferences: UserPreference = {
    ...userPreferences,
    favoriteGenres: [
      currentBookGenre,
      ...userPreferences.favoriteGenres.filter(genre => genre !== currentBookGenre)
    ]
  };
  
  return getHybridRecommendations(books, enhancedPreferences, currentBookId, limit);
};

// Mock user preferences for demo purposes
export const getMockUserPreferences = (): UserPreference => {
  return {
    favoriteGenres: ['Fiction', 'Mystery', 'Science Fiction'],
    recentlyViewed: ['1', '3', '5', '9'],
    purchaseHistory: ['2', '7', '11']
  };
};
