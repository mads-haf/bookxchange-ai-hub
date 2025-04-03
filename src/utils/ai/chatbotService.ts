
import { collection, addDoc, Timestamp, query, limit, getDocs, orderBy, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { getCurrentUser } from "../firebase/auth";

// Knowledge base for common book-related questions
const knowledgeBase = [
  {
    keywords: ["recommendation", "suggest", "recommendations", "recommend"],
    response: "I can recommend books based on your interests. Tell me what genres you enjoy or books you've liked in the past!"
  },
  {
    keywords: ["price", "pricing", "cost", "worth", "value"],
    response: "Our dynamic pricing system uses AI to suggest fair prices based on condition, demand, and scarcity. If you'd like a price estimate for a specific book, please provide details about its condition and genre."
  },
  {
    keywords: ["sell", "selling", "upload", "list"],
    response: "To sell a book, click on the 'Upload' button in the navigation menu. You'll need to provide details like title, author, condition, and photos. Our AI will suggest a fair price!"
  },
  {
    keywords: ["buy", "purchase", "order"],
    response: "You can browse books by clicking on 'Browse' in the navigation menu. Use filters to narrow down your search, and when you find a book you like, you can view details and contact the seller."
  },
  {
    keywords: ["condition", "grading", "grade"],
    response: "We use standard book conditions: 'Like New', 'Very Good', 'Good', 'Fair', and 'Acceptable'. Each affects the book's price differently. For detailed descriptions of each condition, visit our Help section."
  },
  {
    keywords: ["account", "profile", "sign up", "register", "login"],
    response: "You can create an account or log in by clicking the user icon in the top right corner. Your profile stores your preferences, purchase history, and listed books."
  },
  {
    keywords: ["message", "contact", "chat", "communicate"],
    response: "You can message sellers directly from the book details page. Click on the book you're interested in, then use the 'Message Seller' button to start a conversation!"
  },
  {
    keywords: ["fraud", "scam", "safe", "security", "secure"],
    response: "BookXchange uses advanced fraud detection to keep transactions secure. We monitor for suspicious patterns and verify users. Always stay on our platform for all communications and transactions for maximum safety."
  },
  {
    keywords: ["shipping", "delivery", "send", "receive"],
    response: "Shipping details are arranged between buyers and sellers. We recommend discussing shipping methods and costs in the messaging system before finalizing a transaction."
  },
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: "Hello! I'm BookWorm, your AI assistant. How can I help you with BookXchange today?"
  }
];

// Get response from the bot
export const getBotResponse = async (message: string): Promise<string> => {
  // Log the interaction for improvement
  try {
    const user = getCurrentUser();
    if (user) {
      await addDoc(collection(db, "chatInteractions"), {
        userId: user.uid,
        message,
        timestamp: Timestamp.now()
      });
    }
  } catch (error) {
    console.error("Error logging chat interaction:", error);
  }

  // Check knowledge base for relevant responses
  const lowerCaseMessage = message.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
      return entry.response;
    }
  }

  // If no matching keywords, provide a generic response
  if (lowerCaseMessage.includes("book") || lowerCaseMessage.includes("read")) {
    return "I'd be happy to help you with book-related questions! You can ask about recommendations, pricing, selling, or anything else related to BookXchange.";
  }

  // Check for questions
  if (lowerCaseMessage.includes("how") || lowerCaseMessage.includes("what") || 
      lowerCaseMessage.includes("where") || lowerCaseMessage.includes("when") || 
      lowerCaseMessage.includes("why") || lowerCaseMessage.includes("?")) {
    return "That's a great question! You can find detailed information in our Help section, or I can try to assist if you ask more specifically about books, selling, buying, or account features.";
  }

  // Get a personalized response based on user history if available
  const user = getCurrentUser();
  if (user) {
    try {
      const booksQuery = query(
        collection(db, "books"),
        where("userId", "==", user.uid),
        limit(1)
      );
      const booksSnapshot = await getDocs(booksQuery);
      
      if (!booksSnapshot.empty) {
        return "I notice you've been active on BookXchange! Is there something specific you'd like to know about buying or selling books?";
      }
      
      const viewsQuery = query(
        collection(db, "bookViews"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc"),
        limit(3)
      );
      const viewsSnapshot = await getDocs(viewsQuery);
      
      if (!viewsSnapshot.empty) {
        return "Based on books you've viewed recently, you might be interested in our recommendations page. Would you like to check it out?";
      }
    } catch (error) {
      console.error("Error getting user data for chat:", error);
    }
  }

  // Default response
  return "I'm here to help with anything related to BookXchange! You can ask about finding books, selling your books, pricing, or how to use any feature of our platform.";
};

// Record chat feedback for improving the bot
export const recordChatFeedback = async (
  chatId: string,
  wasHelpful: boolean,
  feedback?: string
): Promise<void> => {
  try {
    const user = getCurrentUser();
    await addDoc(collection(db, "chatFeedback"), {
      chatId,
      userId: user?.uid || "anonymous",
      wasHelpful,
      feedback,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error("Error recording chat feedback:", error);
    throw new Error("Failed to record feedback");
  }
};
