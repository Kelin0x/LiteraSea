import { ethers } from 'ethers';
import MyNFTAbi from '../artifacts/contracts/NFT.sol/MyNFT.json';
import MarketplaceAbi from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import contractAddresses from '../config/contracts.json';

// 从配置文件读取合约地址
const { NFT_CONTRACT_ADDRESS, MARKETPLACE_CONTRACT_ADDRESS } = contractAddresses;

export const getNFTContract = (signer: any) => {
    console.log('创建NFT合约实例...');
    console.log('使用的合约地址:', NFT_CONTRACT_ADDRESS);
    
    if (!NFT_CONTRACT_ADDRESS) {
        throw new Error('NFT合约地址未配置');
    }
    
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
    
    if (!MARKETPLACE_CONTRACT_ADDRESS) {
        throw new Error('Marketplace合约地址未配置');
    }
    
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