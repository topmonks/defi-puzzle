pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "./Bundle.sol";

contract Token is ERC20, Ownable {
    using Address for address;

    string public name;
    string public symbol;
    uint8 public decimals = 18;
    BundleToken bundle;

    constructor (string memory _name, string memory _symbol, address _bundle) public {
        name = _name;
        symbol = _symbol;
        bundle = BundleToken(_bundle);
    }

    function mint(address to, uint256 value) public onlyOwner {
        _mint(to, value);
    }

    function burn(address from, uint256 value) public onlyOwner {
        _burn(from, value);
    }

    function bundle(address from, uint256 id, uint256 amount) public onlyOwner {
        _transfer(from, address(bundle), amount);
    }
}
