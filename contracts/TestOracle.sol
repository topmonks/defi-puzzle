pragma solidity ^0.5.6;

import "./PriceOracle.sol";
import "./RadMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract TestOracle is PriceOracle, RadMath, Ownable {

    uint256 private price = 1 ether;

    function set(uint256 _price) public {
        price = _price;
    }

    function to(uint256 value) public view returns (uint256) {
        return wmul(value, price);
    }

    function from(uint256 value) public view returns (uint256) {
        return wdiv(value, price);
    }
}
