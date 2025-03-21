
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DollarSign, Check, ArrowRight, Loader2 } from 'lucide-react';
import { Insult } from '../utils/data';
import { toast } from 'sonner';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  insult: Insult;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onPaymentComplete,
  insult
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletAddress] = useState('0x1a2b3c4d5e6f7g8h9i0j');

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
      toast.success("Платеж успешно обработан! Ваш голос учтен.");
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md glassmorphism animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-center">Проголосовать за ругательство</DialogTitle>
          <DialogDescription className="text-center">
            Каждый голос стоит $1 и будет переведен на указанный кошелек
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6">
          <div className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
            <p className="text-sm font-medium mb-2">Ругательство:</p>
            <p className="italic">"{insult.text}"</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border border-border rounded-lg">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium">Сумма платежа</span>
              </div>
              <span className="font-bold">$1.00</span>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-border rounded-lg">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-medium">Кошелек получателя</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-mono truncate max-w-[150px]">{walletAddress}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-input rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              Отмена
            </button>
            
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex-1 py-2 px-4 bg-primary text-white rounded-lg text-sm font-medium flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Обработка...</span>
                </>
              ) : (
                <>
                  <span>Оплатить</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
