const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    // 部署 NFT 合约
    const MyNFT = await hre.ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment();
    const nftAddress = await myNFT.getAddress();
    console.log("MyNFT deployed to:", nftAddress);

    // 部署 Marketplace 合约
    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.waitForDeployment();
    const marketplaceAddress = await nftMarketplace.getAddress();
    console.log("NFTMarketplace deployed to:", marketplaceAddress);

    // 更新合约地址配置文件
    const configPath = path.join(__dirname, "../config/contracts.json");
    const config = {
        NFT_CONTRACT_ADDRESS: nftAddress,
        MARKETPLACE_CONTRACT_ADDRESS: marketplaceAddress
    };

    fs.writeFileSync(
        configPath,
        JSON.stringify(config, null, 2),
        { encoding: "utf-8" }
    );
    console.log("Contract addresses have been updated in config/contracts.json");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });