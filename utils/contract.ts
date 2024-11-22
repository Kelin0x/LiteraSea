import { ethers } from 'ethers';
import MyNFTAbi from '../artifacts/contracts/NFT.sol/MyNFT.json';
import MarketplaceAbi from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

// 替换为你的合约地址
const NFT_CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const MARKETPLACE_CONTRACT_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

export const getNFTContract = (signer: any) => {
    console.log('创建NFT合约实例...');
    console.log('使用的合约地址:', NFT_CONTRACT_ADDRESS);
    console.log('签名者地址:', signer.getAddress());
    
    try {
        const contract = new ethers.Contract(
            NFT_CONTRACT_ADDRESS,
            MyNFTAbi.abi,
            signer
        );
        console.log('NFT合约实例创建成功');
        return contract;
    } catch (error) {
        console.error('创建NFT合约实例失败:', error);
        throw error;
    }
}

export const getMarketplaceContract = (signer: any) => {
    console.log('创建Marketplace合约实例...');
    console.log('使用的合约地址:', MARKETPLACE_CONTRACT_ADDRESS);
    console.log('签名者地址:', signer.getAddress());
    
    try {
        const contract = new ethers.Contract(
            MARKETPLACE_CONTRACT_ADDRESS,
            MarketplaceAbi.abi,
            signer
        );
        console.log('Marketplace合约实例创建成功');
        return contract;
    } catch (error) {
        console.error('创建Marketplace合约实例失败:', error);
        throw error;
    }
}