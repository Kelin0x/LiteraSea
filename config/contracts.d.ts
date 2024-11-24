declare module "../config/contracts.json" {
    export interface ContractAddresses {
        NFT_CONTRACT_ADDRESS: string;
        MARKETPLACE_CONTRACT_ADDRESS: string;
        COMMENT_CONTRACT_ADDRESS: string;
    }
    const value: ContractAddresses;
    
    export default value;
} 