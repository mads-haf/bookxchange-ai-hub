
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
import { getXGBoostPriceSuggestion } from "../ai/pricingEngine";

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
export const checkIfPopular = async (genre: string): Promise<boolean> => {
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
export const getGenreSupplyCount = async (genre: string): Promise<number> => {
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
export const getGenreDemandScore = async (genre: string): Promise<number> => {
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
