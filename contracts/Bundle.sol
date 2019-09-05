pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "./Token.sol";

contract BundleToken is ERC721Full, Ownable {
    using Address for address;

    struct Bundle {
        address long;
        uint256 longAmount;
        address short;
        uint256 shortAmount;
        uint256 maturity;
    }

    mapping(uint256 => Bundle) public bundles;

    constructor () public ERC721Full("Bundle", "BNDL") { }

    function createPair(address long, uint256 longAmount, address short, uint256 shortAmount, uint256 maturity) public {
        uint256 id = _mint(msg.sender, totalSupply());
        Token shortToken = Token(short);
        Token longToken = Token(long);
        shortToken.bundle(msg.sender, id, shortAmount);
        longToken.bundle(msg.sender, id, longAmount);
        Bundle memory b = Bundle(long, longAmount, short, shortAmount, maturity);
        bundles[id] = b;
    }

    function bundle(uint id, address token, uint256 amount, uint256 maturity) public {
        Bundle a = bundles[id];
        require(a.maturity == 0 || a.maturity >= now);
        Token shortToken = Token(a.short);
        Token longToken = Token(a.long);
        Token bundledToken = Token(token);
        require(shortToken.valuate(shortAmount) < bundledToken.valuate(longAmount), "undercollaterized");
        shortToken.bundle(msg.sender, id, shortAmount);
        longToken.bundle(msg.sender, id, longAmount);
        Bundle memory b = Bundle(long, longAmount, short, shortAmount, maturity);
        bundles[id] = b;
    }
}
