
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
import { detectFraudulentTransaction } from "../ai/fraudDetection";

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
