
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DollarSign, Check, ArrowRight, Loader2, Wallet, Clock } from 'lucide-react';
import { Insult } from '../utils/data';
import { toast } from 'sonner';
import { useWalletStore } from '../utils/wallet';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  insult: Insult;
}

type NetworkType = 'solana' | 'polygon' | 'bsc';

interface NetworkFee {
  network: NetworkType;
  fee: number;
  totalAmount: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onPaymentComplete,
  insult
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('solana');
  const [walletAddress] = useState('0x1a2b3c4d5e6f7g8h9i0j');
  const [networkFees, setNetworkFees] = useState<NetworkFee[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const { walletAddress: userWalletAddress, walletType } = useWalletStore();
  
  useEffect(() => {
    const calculateFees = () => {
      const solanaFee = 0.00001 + (Math.random() * 0.0001);
      const polygonFee = 0.02 + (Math.random() * 0.05);
      const bscFee = 0.005 + (Math.random() * 0.01);
      
      setNetworkFees([
        { network: 'solana', fee: solanaFee, totalAmount: 1 + solanaFee },
        { network: 'polygon', fee: polygonFee, totalAmount: 1 + polygonFee },
        { network: 'bsc', fee: bscFee, totalAmount: 1 + bscFee }
      ]);
      
      setTimeRemaining(60);
    };
    
    calculateFees();
    
    const intervalId = setInterval(calculateFees, 60000);
    
    const timerId = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => {
      clearInterval(intervalId);
      clearInterval(timerId);
    };
  }, []);
  
  const getSelectedNetworkFee = () => {
    return networkFees.find(fee => fee.network === selectedNetwork);
  };
  
  const handlePayment = () => {
    if (!userWalletAddress) {
      toast.error("Пожалуйста, подключите кошелек");
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsVerifying(true);
      verifyPayment();
    }, 1500);
  };
  
  const verifyPayment = () => {
    setTimeout(() => {
      const successProbability = Math.random();
      
      if (successProbability > 0.3 || verificationAttempts >= 59) {
        setIsVerifying(false);
        onPaymentComplete();
        toast.success("Платеж успешно обработан! Ваш голос учтен.");
      } else {
        const newAttempts = verificationAttempts + 1;
        setVerificationAttempts(newAttempts);
        
        if (newAttempts < 60) {
          verifyPayment();
        } else {
          setIsVerifying(false);
          toast.error("Не удалось подтвердить платеж в течение 5 минут.");
        }
      }
    }, 5000);
  };
  
  const getNetworkIcon = (network: NetworkType) => {
    switch (network) {
      case 'solana':
        return <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-5 h-5 mr-2" alt="Solana" />;
      case 'polygon':
        return <img src="https://cryptologos.cc/logos/polygon-matic-logo.png" className="w-5 h-5 mr-2" alt="Polygon" />;
      case 'bsc':
        return <img src="https://cryptologos.cc/logos/bnb-bnb-logo.png" className="w-5 h-5 mr-2" alt="BNB Smart Chain" />;
      default:
        return <Wallet className="w-5 h-5 mr-2" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg glassmorphism animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-primary-foreground">
            Проголосовать за ругательство
          </DialogTitle>
          <DialogDescription className="text-center text-primary-foreground/80">
            Каждый голос стоит $1 и будет переведен на указанный кошелек
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6">
          <div className="flex justify-end text-xs text-muted-foreground mb-2">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>Обновление цен через: {timeRemaining}с</span>
            </div>
          </div>
          
          <div className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
            <p className="text-sm font-medium mb-2">Ругательство:</p>
            <p className="italic text-primary-foreground">{insult.text}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-secondary/30 border border-border rounded-lg">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium text-primary-foreground">Сумма голоса</span>
              </div>
              <span className="font-bold text-primary-foreground">$1.00</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-secondary/30 border border-border rounded-lg">
              <div className="flex items-center">
                <Wallet className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium text-primary-foreground">Сеть</span>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value as NetworkType)}
                  className="p-1.5 text-sm rounded border border-input bg-background text-primary-foreground font-medium"
                >
                  <option value="solana">Solana</option>
                  <option value="polygon">Polygon</option>
                  <option value="bsc">BNB Smart Chain</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-secondary/30 border border-border rounded-lg">
              <div className="flex items-center">
                <Wallet className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium text-primary-foreground">Сетевая комиссия</span>
              </div>
              <span className="font-mono text-primary-foreground">
                ${getSelectedNetworkFee()?.fee.toFixed(5) || '0.00000'}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-primary/30 rounded-lg bg-primary/10 font-medium">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-primary-foreground">Итого к оплате</span>
              </div>
              <span className="font-mono text-primary-foreground">
                ${getSelectedNetworkFee()?.totalAmount.toFixed(5) || '1.00000'}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-secondary/30 border border-border rounded-lg">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-medium text-primary-foreground">Кошелек получателя</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-mono truncate max-w-[150px] text-primary-foreground">{walletAddress}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-input rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors text-primary-foreground"
              disabled={isProcessing || isVerifying}
            >
              Отмена
            </button>
            
            <button
              onClick={handlePayment}
              disabled={isProcessing || isVerifying || !userWalletAddress}
              className="flex-1 py-2 px-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg text-sm font-medium flex items-center justify-center space-x-2 hover:from-primary/90 hover:to-primary/70 transition-colors disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Обработка...</span>
                </>
              ) : isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Проверка оплаты...</span>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    {getNetworkIcon(selectedNetwork)}
                    <span>Оплатить через {selectedNetwork === 'solana' ? 'Solana' : selectedNetwork === 'polygon' ? 'Polygon' : 'BSC'}</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          
          {!userWalletAddress && (
            <p className="mt-4 text-xs text-center text-amber-600 font-medium">
              Для оплаты необходимо подключить криптовалютный кошелек
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
