import { MetaMaskInpageProvider } from "@types/ethereum-provider";

interface Window {
    ethereum?: MetaMaskInpageProvider;
}
