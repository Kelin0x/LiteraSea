// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;     // 商品ID计数器
    Counters.Counter private _itemsSold;   // 已售商品计数器

    address payable owner;                 // 合约拥有者
    uint256 public listingPrice = 0.025 ether; // 上架费用

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() {
        owner = payable(msg.sender);
    }

    // 修改上架费用（仅合约拥有者可调用）
    function updateListingPrice(uint _listingPrice) public payable {
        require(owner == msg.sender, unicode"只有市场拥有者才能更新上架费用");
        listingPrice = _listingPrice;
    }

    // 获取上架费用
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // 创建市场商品
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, unicode"价格必须大于0");
        require(msg.value == listingPrice, unicode"必须支付上架费用");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        // 将NFT转移到市场合约
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    // 创建市场销售
    function createMarketSale(
        address nftContract,
        uint256 itemId
    ) public payable nonReentrant {
        uint price = idToMarketItem[itemId].price;
        uint tokenId = idToMarketItem[itemId].tokenId;
        
        require(msg.value == price, unicode"请支付要求的价格");

        // 转账给卖家
        idToMarketItem[itemId].seller.transfer(msg.value);
        // 将NFT转移给买家
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
        
        // 将上架费用转给市场拥有者
        payable(owner).transfer(listingPrice);
    }

    // 获取未售出的市场商品
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0)) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}