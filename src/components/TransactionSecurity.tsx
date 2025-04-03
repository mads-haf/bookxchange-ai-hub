
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { checkTransaction } from '@/utils/ai/fraudDetection';

// This component is for demonstration purposes only
const TransactionSecurity = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<{
    isApproved: boolean;
    requiresReview: boolean;
    message: string;
  } | null>(null);

  const handleCheckTransaction = () => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter a transaction amount",
        variant: "destructive",
      });
      return;
    }

    // Create a mock transaction
    const mockTransaction = {
      userId: 'user123',
      itemId: 'book456',
      amount: Number(amount),
      timestamp: new Date(),
      paymentMethod: 'credit_card',
      userAccountAge: 30, // 30 days
      userPreviousTransactions: 5,
      deviceFingerprint: 'device123',
      ipAddress: '192.168.1.1',
      geoLocation: {
        country: 'India',
        city: 'Mumbai'
      }
    };

    // Check the transaction
    const securityResult = checkTransaction(mockTransaction);
    setResult(securityResult);

    // Show a toast
    toast({
      title: securityResult.isApproved ? "Transaction Status" : "Transaction Blocked",
      description: securityResult.message,
      variant: securityResult.isApproved ? "default" : "destructive",
    });
  };

  return (
    <Card className="border-2 border-bookxchange-light">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Badge className="mr-2 bg-bookxchange-accent font-normal px-3 py-1">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Fraud Detection Demo
          </Badge>
        </div>

        <div className="mb-6">
          <p className="text-sm text-bookxchange-dark/70 mb-4">
            Test our Isolation Forest fraud detection system by entering a transaction amount.
            Try different amounts to see how the system responds.
          </p>
          
          <div>
            <div className="flex gap-3 mb-4">
              <Input
                type="number"
                placeholder="Enter amount (₹)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button 
                onClick={handleCheckTransaction}
                className="bg-bookxchange-accent hover:bg-bookxchange-accent/90"
              >
                Test Transaction
              </Button>
            </div>
            
            <div className="text-xs text-bookxchange-dark/70">
              <span className="font-medium">Hint:</span> Try with small amounts (₹100-₹500) for normal transactions,
              large amounts (₹5000+) for suspicious ones.
            </div>
          </div>
        </div>

        {result && (
          <div className={`p-4 rounded-lg ${
            !result.isApproved ? 'bg-red-50 border border-red-200' : 
            result.requiresReview ? 'bg-yellow-50 border border-yellow-200' : 
            'bg-green-50 border border-green-200'
          }`}>
            <div className="flex items-start">
              {!result.isApproved ? (
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
              ) : result.requiresReview ? (
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
              )}
              <div>
                <h4 className={`font-semibold ${
                  !result.isApproved ? 'text-red-800' : 
                  result.requiresReview ? 'text-yellow-800' : 
                  'text-green-800'
                }`}>
                  {!result.isApproved ? 'Transaction Blocked' : 
                   result.requiresReview ? 'Additional Verification Required' : 
                   'Transaction Approved'}
                </h4>
                <p className={`mt-1 text-sm ${
                  !result.isApproved ? 'text-red-700' : 
                  result.requiresReview ? 'text-yellow-700' : 
                  'text-green-700'
                }`}>
                  {result.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionSecurity;
