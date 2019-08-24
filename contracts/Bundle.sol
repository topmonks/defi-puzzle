pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract BundleToken is ERC721Full, Ownable {
    using Address for address;

    struct Bundle {
        address short;
        uint256 shortAmount;
        address long;
        uint256 longAmount;
        uint256 maturity;
    }

    mapping(uint256 => Bundle) public bundles;

    constructor () public ERC721Metadata("Bundle", "BNDL") { }

    function mint() {

    }
}
