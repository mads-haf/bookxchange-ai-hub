
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  Timestamp 
} from "firebase/firestore";
import { db } from "./config";
import { getCurrentUser } from "./auth";
import { Book } from "./bookService";
import { getXGBoostPriceSuggestion, getPriceRangeForSimilarBooks } from "../ai/pricingEngine";
import { getSimilarBooksRecommendations } from "../ai/recommendationEngine";
import { detectFraudulentTransaction } from "../ai/fraudDetection";

// AI Price Suggestion - now connected to Firebase for historical data
export const getAIPriceSuggestion = async (
  condition: string,
  genre: string,
  publishYear?: number
): Promise<number> => {
  try {
    // First use our existing model
    const suggestedPrice = getXGBoostPriceSuggestion({
      condition,
      genre,
      publishYear,
      isPopular: await checkIfPopular(genre),
      supplyCount: await getGenreSupplyCount(genre),
      demandScore: await getGenreDemandScore(genre)
    });
    
    // Store this suggestion in Firestore for future reference
    const user = getCurrentUser();
    if (user) {
      await addDoc(collection(db, "priceSuggestions"), {
        userId: user.uid,
        condition,
        genre,
        publishYear,
        suggestedPrice,
        timestamp: Timestamp.now()
      });
    }
    
    return suggestedPrice;
  } catch (error) {
    console.error("Error getting AI price suggestion:", error);
    return getXGBoostPriceSuggestion({ condition, genre, publishYear }); // Fallback to local model
  }
};

// Check if a genre is popular based on recent listings
const checkIfPopular = async (genre: string): Promise<boolean> => {
  try {
    const q = query(
      collection(db, "books"),
      where("genre", "==", genre)
    );
    const snapshot = await getDocs(q);
    return snapshot.size > 5; // Simplistic measure - genres with >5 books are "popular"
  } catch (error) {
    console.error("Error checking popularity:", error);
    return false;
  }
};

// Get supply count for a genre
const getGenreSupplyCount = async (genre: string): Promise<number> => {
  try {
    const q = query(
      collection(db, "books"),
      where("genre", "==", genre)
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error("Error getting supply count:", error);
    return 0;
  }
};

// Simulate demand score based on recent views/interests
const getGenreDemandScore = async (genre: string): Promise<number> => {
  try {
    // This would ideally use actual analytics data
    // For now, we'll use a simple random score weighted by popularity
    const isPopular = await checkIfPopular(genre);
    return Math.floor(Math.random() * 50) + (isPopular ? 50 : 30);
  } catch (error) {
    console.error("Error getting demand score:", error);
    return 50; // Default middle value
  }
};

// Get personalized book recommendations
export const getPersonalizedRecommendations = async (
  count: number = 6
): Promise<Book[]> => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error("User not authenticated");
    
    // Get all books
    const booksSnapshot = await getDocs(collection(db, "books"));
    const allBooks: Book[] = [];
    booksSnapshot.forEach(doc => {
      allBooks.push({ id: doc.id, ...doc.data() } as Book);
    });
    
    // Get user preferences (from previous interactions)
    const userPreferences = await getUserPreferences(user.uid);
    
    // Get user's already owned books to exclude them
    const q = query(collection(db, "books"), where("ownerId", "==", user.uid));
    const userBooksSnapshot = await getDocs(q);
    const userBookIds: string[] = [];
    userBooksSnapshot.forEach(doc => userBookIds.push(doc.id));
    
    // Filter out user's own books
    const availableBooks = allBooks.filter(book => !userBookIds.includes(book.id!));
    
    // Use our existing recommendation algorithm (simulated)
    // In a real implementation, we'd use Firebase ML or a dedicated ML service
    return getSimilarBooksRecommendations(
      availableBooks,
      "", // No specific book ID since we want general recommendations
      userPreferences.favoriteGenre,
      userPreferences,
      count
    );
  } catch (error) {
    console.error("Error getting recommendations:", error);
    // Fallback to random books
    return await getRandomBooks(count);
  }
};

// Get random books (fallback)
const getRandomBooks = async (count: number): Promise<Book[]> => {
  try {
    const booksSnapshot = await getDocs(collection(db, "books"));
    const allBooks: Book[] = [];
    booksSnapshot.forEach(doc => {
      allBooks.push({ id: doc.id, ...doc.data() } as Book);
    });
    
    // Shuffle and take first 'count' elements
    return allBooks
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  } catch (error) {
    console.error("Error getting random books:", error);
    return [];
  }
};

// Get user preferences from Firebase
const getUserPreferences = async (userId: string): Promise<any> => {
  try {
    // Try to get stored preferences
    const q = query(collection(db, "userPreferences"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      return snapshot.docs[0].data();
    }
    
    // If no preferences found, generate default ones
    return {
      userId,
      favoriteGenre: "Fiction", // Default
      priceRange: { min: 100, max: 500 },
      preferredConditions: ["Like New", "Very Good", "Good"]
    };
  } catch (error) {
    console.error("Error getting user preferences:", error);
    return {
      favoriteGenre: "Fiction",
      priceRange: { min: 100, max: 500 },
      preferredConditions: ["Like New", "Very Good", "Good"]
    };
  }
};

// Check transaction for fraud
export const checkTransactionForFraud = async (
  transaction: {
    buyerId: string,
    sellerId: string,
    bookId: string,
    amount: number,
    paymentMethod: string
  }
): Promise<{isFraudulent: boolean, confidenceScore: number, reason?: string}> => {
  try {
    // Get transaction history for this user
    const q = query(
      collection(db, "transactions"),
      where("buyerId", "==", transaction.buyerId)
    );
    const snapshot = await getDocs(q);
    
    const transactionHistory: any[] = [];
    snapshot.forEach(doc => {
      transactionHistory.push(doc.data());
    });
    
    // Use our existing fraud detection (simulated)
    return detectFraudulentTransaction({
      ...transaction,
      timestamp: new Date().getTime(),
      history: transactionHistory
    });
  } catch (error) {
    console.error("Error checking for fraud:", error);
    // Default to not fraudulent with warning
    return {
      isFraudulent: false,
      confidenceScore: 0.5,
      reason: "Error in fraud detection system, proceed with caution"
    };
  }
};

// Record a new transaction
export const recordTransaction = async (
  bookId: string,
  sellerId: string,
  amount: number,
  paymentMethod: string
): Promise<string> => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error("User not authenticated");
    
    const transaction = {
      bookId,
      buyerId: user.uid,
      sellerId,
      amount,
      paymentMethod,
      status: "completed",
      timestamp: Timestamp.now()
    };
    
    // Check for fraud
    const fraudCheck = await checkTransactionForFraud({
      buyerId: user.uid,
      sellerId,
      bookId,
      amount,
      paymentMethod
    });
    
    if (fraudCheck.isFraudulent) {
      throw new Error(`Potential fraud detected: ${fraudCheck.reason}`);
    }
    
    // Record transaction
    const docRef = await addDoc(collection(db, "transactions"), transaction);
    return docRef.id;
  } catch (error) {
    console.error("Error recording transaction:", error);
    throw error;
  }
};
