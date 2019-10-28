pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/drafts/Counters.sol";

contract ERC721Incrementing is ERC721Full {
    using Counters for Counters.Counter;

    Counters.Counter _id;

    constructor (string memory name, string memory symbol) public ERC721Full(name, symbol) {}

    function _mint(address owner) internal returns (uint256) {
        _id.increment();
        _mint(owner, _id.current());
        return _id.current();
    }
}
