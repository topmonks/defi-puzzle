pragma solidity ^0.5.6;

interface PriceOracle {

    function to(uint256 value) external view returns (uint256);
    function from(uint256 value) external view returns (uint256);

}
