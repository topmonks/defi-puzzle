pragma solidity ^0.5.2;

import "./DSMath.sol";

contract RadMath is DSMath {

    uint constant RAD = RAY / WAD;

    function rw(uint256 x) internal pure returns (uint z) {
        return x / RAD;
    }

    function wr(uint256 x) internal pure returns (uint z) {
        return mul(x, RAD);
    }

    function w(uint256 x) internal pure returns (uint z) {
        return mul(x, WAD);
    }

    function pw(uint256 x) internal pure returns (uint z) {
        return w(x) / 100;
    }
}
