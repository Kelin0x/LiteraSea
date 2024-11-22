const hre = require("hardhat");

async function main() {
    // 部署 NFT 合约
    const MyNFT = await hre.ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment();
    console.log("MyNFT deployed to:", await myNFT.getAddress());

    // 部署 Marketplace 合约
    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.waitForDeployment();
    console.log("NFTMarketplace deployed to:", await nftMarketplace.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });