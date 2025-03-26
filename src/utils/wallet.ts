
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WalletType = 'phantom' | 'metamask' | null;

interface WalletState {
  walletAddress: string | null;
  walletType: WalletType;
  connectWallet: (type: 'phantom' | 'metamask') => Promise<void>;
  disconnectWallet: () => void;
  getWalletUsername: () => string;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      walletAddress: null,
      walletType: null,
      
      connectWallet: async (type: 'phantom' | 'metamask') => {
        if (type === 'phantom') {
          try {
            // Request connection to Phantom
            const provider = window.phantom?.solana;
            if (!provider?.isPhantom) {
              throw new Error("Phantom wallet not found");
            }
            
            const { publicKey } = await provider.connect();
            set({ 
              walletAddress: publicKey.toString(),
              walletType: 'phantom'
            });
          } catch (error) {
            console.error("Error connecting to Phantom wallet:", error);
            throw error;
          }
        } else if (type === 'metamask') {
          try {
            // Request connection to MetaMask
            if (!window.ethereum?.isMetaMask) {
              throw new Error("MetaMask wallet not found");
            }
            
            const accounts = await window.ethereum.request({ 
              method: 'eth_requestAccounts' 
            });
            
            set({ 
              walletAddress: accounts[0],
              walletType: 'metamask'
            });
          } catch (error) {
            console.error("Error connecting to MetaMask wallet:", error);
            throw error;
          }
        }
      },
      
      disconnectWallet: () => {
        // No need to disconnect from provider, just clear the state
        set({ 
          walletAddress: null,
          walletType: null
        });
      },
      
      getWalletUsername: () => {
        const { walletAddress, walletType } = get();
        
        if (!walletAddress) return '';
        
        if (walletType === 'phantom') {
          // Return shortened wallet address for Phantom
          return walletAddress.substring(0, 4) + '...' + walletAddress.substring(walletAddress.length - 4);
        }
        
        // For MetaMask, return empty string (will default to 'Аноним')
        return '';
      }
    }),
    {
      name: 'wallet-storage',
    }
  )
);
