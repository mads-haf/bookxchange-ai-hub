
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  DocumentSnapshot,
  Timestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./config";
import { getCurrentUser } from "./auth";

export interface Book {
  id?: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  condition: string;
  language: string;
  publishYear?: number;
  price: number;
  coverImage?: string;
  ownerId: string;
  ownerName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPopular?: boolean;
  supplyCount?: number;
  demandScore?: number;
}

// Add a new book
export const addBook = async (bookData: Omit<Book, 'id' | 'ownerId' | 'ownerName' | 'createdAt' | 'updatedAt'>, imageFile?: File): Promise<string> => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    let imageUrl;
    
    // Upload image if exists
    if (imageFile) {
      const storageRef = ref(storage, `books/${user.uid}/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    
    const bookRef = await addDoc(collection(db, "books"), {
      ...bookData,
      coverImage: imageUrl || null,
      ownerId: user.uid,
      ownerName: user.displayName || 'Anonymous',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    return bookRef.id;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

// Get all books with pagination
export const getBooks = async (
  lastDoc?: DocumentSnapshot, 
  pageSize: number = 10,
  filters: {genre?: string, condition?: string, minPrice?: number, maxPrice?: number} = {}
): Promise<{books: Book[], lastDoc: DocumentSnapshot | null}> => {
  try {
    let q = collection(db, "books");
    let constraints = [];
    
    // Add filters if provided
    if (filters.genre) constraints.push(where("genre", "==", filters.genre));
    if (filters.condition) constraints.push(where("condition", "==", filters.condition));
    if (filters.minPrice) constraints.push(where("price", ">=", filters.minPrice));
    if (filters.maxPrice) constraints.push(where("price", "<=", filters.maxPrice));
    
    // Add sorting and pagination
    constraints.push(orderBy("createdAt", "desc"));
    constraints.push(limit(pageSize));
    
    // Add startAfter if lastDoc provided (for pagination)
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }
    
    const queryRef = query(q, ...constraints);
    const snapshot = await getDocs(queryRef);
    
    const books: Book[] = [];
    snapshot.forEach(doc => {
      books.push({ id: doc.id, ...doc.data() } as Book);
    });
    
    const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
    
    return { books, lastDoc: newLastDoc };
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
};

// Get a book by ID
export const getBookById = async (bookId: string): Promise<Book | null> => {
  try {
    const docRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(docRef);
    
    if (bookDoc.exists()) {
      return { id: bookDoc.id, ...bookDoc.data() } as Book;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting book:", error);
    throw error;
  }
};

// Update a book
export const updateBook = async (bookId: string, bookData: Partial<Book>, newImageFile?: File): Promise<void> => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    const bookRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(bookRef);
    
    if (!bookDoc.exists()) throw new Error("Book not found");
    
    const bookDetails = bookDoc.data() as Book;
    if (bookDetails.ownerId !== user.uid) throw new Error("Unauthorized to update this book");
    
    let imageUrl = bookDetails.coverImage;
    
    // Update image if new one provided
    if (newImageFile) {
      // Delete old image if exists
      if (bookDetails.coverImage) {
        try {
          const oldImageRef = ref(storage, bookDetails.coverImage);
          await deleteObject(oldImageRef);
        } catch (e) {
          console.warn("Error deleting old image:", e);
        }
      }
      
      // Upload new image
      const storageRef = ref(storage, `books/${user.uid}/${Date.now()}_${newImageFile.name}`);
      const snapshot = await uploadBytes(storageRef, newImageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    
    await updateDoc(bookRef, {
      ...bookData,
      coverImage: imageUrl,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

// Delete a book
export const deleteBook = async (bookId: string): Promise<void> => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    const bookRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(bookRef);
    
    if (!bookDoc.exists()) throw new Error("Book not found");
    
    const bookDetails = bookDoc.data() as Book;
    if (bookDetails.ownerId !== user.uid) throw new Error("Unauthorized to delete this book");
    
    // Delete image if exists
    if (bookDetails.coverImage) {
      try {
        const imageRef = ref(storage, bookDetails.coverImage);
        await deleteObject(imageRef);
      } catch (e) {
        console.warn("Error deleting image:", e);
      }
    }
    
    await deleteDoc(bookRef);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

// Get user's books
export const getUserBooks = async (): Promise<Book[]> => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error("User not authenticated");
    
    const q = query(
      collection(db, "books"),
      where("ownerId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    
    const snapshot = await getDocs(q);
    const books: Book[] = [];
    
    snapshot.forEach(doc => {
      books.push({ id: doc.id, ...doc.data() } as Book);
    });
    
    return books;
  } catch (error) {
    console.error("Error getting user books:", error);
    throw error;
  }
};
