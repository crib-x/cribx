import React from 'react';
import {
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, ExternalLink } from 'lucide-react';

interface SuccessPopupProps {
  onClose: () => void;
  propertyUrl?: string;
  propertyName?: string; // Added property name prop
}

const SuccessPopup = ({ onClose, propertyUrl, propertyName = 'the property' }: SuccessPopupProps) => {
  const handleComplete = () => {
    if (propertyUrl) {
      window.open(propertyUrl, '_blank');
    }
    onClose();
  };

  const checkEmail = () => {
    window.open('https://mail.google.com', '_blank');
  };

  return (
    <div className="space-y-8 py-4">
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <div className="rounded-full bg-green-50 p-3">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <DialogTitle className="text-2xl font-semibold">
          Welcome to CribX!
        </DialogTitle>
        <DialogDescription className="text-base">
          Your application has been successfully initiated
        </DialogDescription>
      </div>
      
      <div className="space-y-4 text-center text-muted-foreground">
        <p className="text-sm">
          Thank you for choosing CribX for your accommodation needs! We're thrilled 
          you've taken the first step toward finding your perfect space.
        </p>
        <p className="text-sm">
          We've generated a unique discount code for your security deposit with{' '}
          <span className="font-medium text-foreground">{propertyName}</span>. 
          Check your email for all the details.
        </p>
        <p className="text-sm">
          Complete your application on the property's website to secure your new home hassle-free.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleComplete}
          className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
          size="lg"
        >
          Complete Application <ExternalLink className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={checkEmail}
          variant="outline"
          className="w-full gap-2"
          size="lg"
        >
          Check Email <Mail className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          Thank you for trusting CribX to simplify your housing journey. 
          We're here to make finding your next home seamless and rewarding!
        </p>
      </div>
    </div>
  );
};

export default SuccessPopup;