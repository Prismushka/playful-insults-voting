
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { useWalletStore } from '../utils/wallet';
import { Loader2, Wallet } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { connectWallet, disconnectWallet, walletAddress } = useWalletStore();
  
  const isPhantomInstalled = () => {
    return window.phantom?.solana?.isPhantom || false;
  };
  
  const isMetamaskInstalled = () => {
    return window.ethereum?.isMetaMask || false;
  };
  
  const handleConnectPhantom = async () => {
    if (!isPhantomInstalled()) {
      window.open('https://phantom.app/download', '_blank');
      return;
    }
    
    setIsConnecting(true);
    try {
      await connectWallet('phantom');
      toast.success("Кошелек Phantom успешно подключен!");
      onClose();
    } catch (error) {
      console.error("Failed to connect Phantom:", error);
      toast.error("Не удалось подключить кошелек Phantom");
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleConnectMetamask = async () => {
    if (!isMetamaskInstalled()) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    
    setIsConnecting(true);
    try {
      await connectWallet('metamask');
      toast.success("Кошелек MetaMask успешно подключен!");
      onClose();
    } catch (error) {
      console.error("Failed to connect MetaMask:", error);
      toast.error("Не удалось подключить кошелек MetaMask");
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleDisconnect = () => {
    disconnectWallet();
    toast.info("Кошелек отключен");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md glassmorphism animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-primary-foreground">
            {walletAddress ? "Управление кошельком" : "Подключить кошелек"}
          </DialogTitle>
          <DialogDescription className="text-center text-primary-foreground/80">
            {walletAddress 
              ? "Ваш кошелек успешно подключен" 
              : "Выберите криптовалютный кошелек для подключения"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 space-y-4">
          {walletAddress ? (
            <div className="space-y-4">
              <div className="p-3 border border-border rounded-lg bg-secondary/30">
                <p className="text-sm font-medium mb-1">Адрес кошелька:</p>
                <p className="font-mono text-sm truncate">{walletAddress}</p>
              </div>
              
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={handleDisconnect}
              >
                Отключить кошелек
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button 
                className="w-full flex justify-between items-center bg-gradient-to-r from-purple-800 to-purple-900 hover:from-purple-700 hover:to-purple-800 text-white" 
                onClick={handleConnectPhantom}
                disabled={isConnecting}
              >
                <div className="flex items-center">
                  <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-5 h-5 mr-2" alt="Phantom" />
                  <span>Phantom</span>
                </div>
                {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-xs bg-primary/20 px-2 py-1 rounded-full">Solana</span>}
              </Button>
              
              <Button 
                className="w-full flex justify-between items-center bg-gradient-to-r from-orange-700 to-amber-800 hover:from-orange-600 hover:to-amber-700 text-white" 
                onClick={handleConnectMetamask}
                disabled={isConnecting}
              >
                <div className="flex items-center">
                  <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" className="w-5 h-5 mr-2" alt="MetaMask" />
                  <span>MetaMask</span>
                </div>
                {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-xs bg-primary/20 px-2 py-1 rounded-full">EVM</span>}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                Если у вас не установлен кошелек, нажмите на соответствующую кнопку, 
                и вы будете перенаправлены на официальный сайт для скачивания.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
