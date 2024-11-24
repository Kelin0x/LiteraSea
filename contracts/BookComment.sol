// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BookComment is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Comment {
        string bookId;
        uint256 chapterId;
        string selectedText;
        string commentText;
        uint256 timestamp;
        address author;
    }

    mapping(uint256 => Comment) public comments;
    
    event CommentAdded(
        uint256 indexed tokenId,
        string bookId,
        uint256 chapterId,
        address indexed author,
        uint256 timestamp
    );

    constructor() ERC721("BookComment", "BKCMT") {}

    function addComment(
        string memory bookId,
        uint256 chapterId,
        string memory selectedText,
        string memory commentText,
        uint256 timestamp
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        comments[newTokenId] = Comment(
            bookId,
            chapterId,
            selectedText,
            commentText,
            timestamp,
            msg.sender
        );

        _safeMint(msg.sender, newTokenId);

        emit CommentAdded(newTokenId, bookId, chapterId, msg.sender, timestamp);

        return newTokenId;
    }

    function getComment(uint256 tokenId) public view returns (Comment memory) {
        require(_exists(tokenId), "Comment does not exist");
        return comments[tokenId];
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }
}