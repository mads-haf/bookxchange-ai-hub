
// This file simulates Isolation Forest fraud detection
// In a real implementation, this would call a backend API

type Transaction = {
  userId: string;
  itemId: string;
  amount: number;
  timestamp: Date;
  paymentMethod: string;
  userAccountAge: number; // in days
  userPreviousTransactions: number;
  deviceFingerprint: string;
  ipAddress: string;
  geoLocation?: {
    country: string;
    city: string;
  };
};

// Add the missing function for aiService.ts
export const detectFraudulentTransaction = (transaction: any): {isFraudulent: boolean, confidenceScore: number, reason?: string} => {
  // Simple fraud detection logic
  const isSuspicious = Math.random() > 0.9;
  
  if (isSuspicious) {
    return {
      isFraudulent: true,
      confidenceScore: 0.75,
      reason: "Suspicious transaction pattern detected"
    };
  }
  
  return {
    isFraudulent: false,
    confidenceScore: 0.2
  };
};

// Simulated Isolation Forest anomaly detection
export const detectFraudWithIsolationForest = (
  transaction: Transaction,
  recentUserTransactions: Transaction[] = []
): { isSuspicious: boolean; anomalyScore: number; reasons: string[] } => {
  console.log('Running Isolation Forest fraud detection');
  
  const reasons: string[] = [];
  let anomalyScore = 0;
  
  // Check for multiple transactions in a short time
  if (recentUserTransactions.length > 3) {
    const lastHourTransactions = recentUserTransactions.filter(t => 
      (transaction.timestamp.getTime() - t.timestamp.getTime()) < 3600000
    );
    
    if (lastHourTransactions.length >= 3) {
      reasons.push('Multiple transactions in a short time period');
      anomalyScore += 0.3;
    }
  }
  
  // Check for new account with high value transaction
  if (transaction.userAccountAge < 7 && transaction.amount > 1000) {
    reasons.push('New account with high value transaction');
    anomalyScore += 0.4;
  }
  
  // Check for unusual location
  if (transaction.geoLocation && 
      recentUserTransactions.length > 0 && 
      recentUserTransactions[0].geoLocation &&
      transaction.geoLocation.country !== recentUserTransactions[0].geoLocation.country) {
    reasons.push('Transaction from unusual location');
    anomalyScore += 0.25;
  }
  
  // Check for unusual payment method
  const usualPaymentMethods = new Set(recentUserTransactions.map(t => t.paymentMethod));
  if (recentUserTransactions.length > 3 && !usualPaymentMethods.has(transaction.paymentMethod)) {
    reasons.push('Unusual payment method');
    anomalyScore += 0.15;
  }
  
  // Check for unusual transaction amount
  if (recentUserTransactions.length > 0) {
    const avgAmount = recentUserTransactions.reduce((sum, t) => sum + t.amount, 0) / recentUserTransactions.length;
    if (transaction.amount > avgAmount * 3) {
      reasons.push('Transaction amount significantly higher than average');
      anomalyScore += 0.2;
    }
  }
  
  // Determine if the transaction is suspicious based on the anomaly score
  const isSuspicious = anomalyScore >= 0.5;
  
  return { 
    isSuspicious, 
    anomalyScore, 
    reasons 
  };
};

// Example of how to use the fraud detection
export const checkTransaction = (transaction: Transaction): { 
  isApproved: boolean;
  requiresReview: boolean;
  message: string;
} => {
  // In a real implementation, we would fetch recent transactions from the database
  const mockRecentTransactions: Transaction[] = [
    {
      userId: transaction.userId,
      itemId: '123',
      amount: 250,
      timestamp: new Date(Date.now() - 3600000 * 24), // 1 day ago
      paymentMethod: 'credit_card',
      userAccountAge: transaction.userAccountAge,
      userPreviousTransactions: transaction.userPreviousTransactions - 1,
      deviceFingerprint: transaction.deviceFingerprint,
      ipAddress: '192.168.1.1',
      geoLocation: transaction.geoLocation
    }
  ];
  
  const fraudDetectionResult = detectFraudWithIsolationForest(transaction, mockRecentTransactions);
  
  if (fraudDetectionResult.isSuspicious && fraudDetectionResult.anomalyScore > 0.7) {
    // High risk - block transaction
    return {
      isApproved: false,
      requiresReview: true,
      message: 'Transaction blocked due to suspicious activity. Please contact support.'
    };
  } else if (fraudDetectionResult.isSuspicious) {
    // Medium risk - additional verification required
    return {
      isApproved: true,
      requiresReview: true,
      message: 'Additional verification required before completing this transaction.'
    };
  } else {
    // Low risk - approve transaction
    return {
      isApproved: true,
      requiresReview: false,
      message: 'Transaction approved.'
    };
  }
};
