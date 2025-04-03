
import { 
  collection, 
  query, 
  where, 
  getDocs,
  Timestamp 
} from "firebase/firestore";
import { db } from "./config";
import { getCurrentUser } from "./auth";
import { Book } from "./bookService";
import { getSimilarBooksRecommendations } from "../ai/recommendationEngine";

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
      allBooks.push({ 
        id: doc.id, 
        ...doc.data(),
        // Ensure all required fields are present with defaults if needed
        language: doc.data().language || 'English',
        ownerId: doc.data().ownerId || '',
        ownerName: doc.data().ownerName || '',
        createdAt: doc.data().createdAt || Timestamp.now(),
        updatedAt: doc.data().updatedAt || Timestamp.now()
      } as Book);
    });
    
    // Get user preferences (from previous interactions)
    const userPreferences = await getUserPreferences(user.uid);
    
    // Get user's already owned books to exclude them
    const q = query(collection(db, "books"), where("ownerId", "==", user.uid));
    const userBooksSnapshot = await getDocs(q);
    const userBookIds: string[] = [];
    userBooksSnapshot.forEach(doc => userBookIds.push(doc.id));
    
    // Filter out user's own books
    const availableBooks = allBooks.filter(book => !userBookIds.includes(book.id));
    
    // Convert Book type to match recommendation engine requirements
    const simplifiedBooks = availableBooks.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      coverImage: book.coverImage || '',
      price: book.price,
      condition: book.condition,
      genre: book.genre
    }));
    
    // Use our existing recommendation algorithm (simulated)
    return getSimilarBooksRecommendations(
      simplifiedBooks,
      "", // No specific book ID since we want general recommendations
      userPreferences.favoriteGenre,
      userPreferences,
      count
    ).map(recBook => {
      // Find the corresponding full book
      const fullBook = allBooks.find(book => book.id === recBook.id);
      // Return the full Book object or a default if not found
      return fullBook || {
        id: recBook.id,
        title: recBook.title,
        author: recBook.author,
        description: '',
        genre: recBook.genre,
        condition: recBook.condition,
        language: 'English',
        price: recBook.price,
        coverImage: recBook.coverImage,
        ownerId: '',
        ownerName: '',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
    });
  } catch (error) {
    console.error("Error getting recommendations:", error);
    // Fallback to random books
    return await getRandomBooks(count);
  }
};

// Get random books (fallback)
export const getRandomBooks = async (count: number): Promise<Book[]> => {
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
export const getUserPreferences = async (userId: string): Promise<any> => {
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
