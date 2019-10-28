pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/drafts/Counters.sol";
import "./Token.sol";
import "./ERC721Incrementing.sol";

contract BundleToken is ERC721Incrementing, Ownable {
    using Address for address;

    enum Error {NONE, MATURITY, COLLATERAL}

    struct Bundle {
        address long;
        uint256 longAmount;
        address short;
        uint256 shortAmount;
        uint256 maturity;
        uint256 created;
    }

    mapping(uint256 => Bundle) public bundles;

    constructor () public ERC721Incrementing("Bundle", "BNDL") {}

    function bundle(address long, uint256 longAmount, address short, uint256 shortAmount, uint256 maturity) public {
        uint256 id = _mint(msg.sender);
        Bundle memory b = Bundle(long, longAmount, short, shortAmount, maturity, now);
        bundles[id] = b;
        Token(short).bundle(msg.sender, shortAmount);
        Token(long).bundle(msg.sender, longAmount);
        emit Bundled(id, msg.sender, long, longAmount, short, shortAmount, maturity);
    }

    function unbundle(uint256 id) public {
        require(ownerOf(id) == msg.sender);
        Bundle storage b = bundles[id];
        Token(b.short).unbundle(msg.sender, b.shortAmount);
        Token(b.long).unbundle(msg.sender, b.longAmount);
        emit Unbundled(id, msg.sender);
    }

    function check(uint256 id) public view returns (Error) {
        Bundle storage b = bundles[id];
        if (b.maturity == 0 || b.maturity >= now) return Error.MATURITY;
        if (Token(b.short).valuate(b.shortAmount) < Token(b.short).valuate(b.longAmount)) return Error.MATURITY;
        return Error.NONE;
    }

    function isValid(uint256 id) public view returns (bool) {
        return Error.NONE == check(id);
    }

    function getBundle(uint256 id) public view returns (
        address owner,
        address long,
        uint256 longAmount,
        address short,
        uint256 shortAmount,
        uint256 maturity,
        uint256 created
    ) {
        Bundle storage b = bundles[id];
        return (ownerOf(id), b.long, b.longAmount, b.short, b.shortAmount, b.maturity, b.created);
    }

    event Bundled(
        uint256 indexed id,
        address by,
        address indexed long,
        uint256 longAmount,
        address indexed short,
        uint256 shortAmount,
        uint256 maturity
    );

    event Unbundled(
        uint256 indexed id,
        address indexed by
    );
}
