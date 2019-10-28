pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "./Bundle.sol";
import "./PriceOracle.sol";

contract Token is ERC20, Ownable {
    using Address for address;

    PriceOracle public priceOracle;

    string public name;
    string public symbol;
    uint8 public decimals = 18;
    address bundleAddress;

    constructor (string memory _name, string memory _symbol, address _bundle) public {
        name = _name;
        symbol = _symbol;
        bundleAddress = _bundle;
    }

    function valuate(uint256 amount) public view returns (uint256) {
        if (address(0) != address(priceOracle)) {
            priceOracle.to(amount);
        }
        return 0;
    }

    function bundle(address from, uint256 amount) public onlyOwner {
        _transfer(from, bundleAddress, amount);
    }

    function unbundle(address to, uint256 amount) public onlyOwner {
        _transfer(bundleAddress, to, amount);
    }

    // test only
    function mint(address to, uint256 value) public onlyOwner {
        _mint(to, value);
    }

    // test only
    function burn(address from, uint256 value) public onlyOwner {
        _burn(from, value);
    }
}
