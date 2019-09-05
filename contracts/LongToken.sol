pragma solidity >=0.4.21 <0.6.0;

import "./Token.sol";

contract LongToken is Token {

    ERC20 public source;

    constructor (string memory _name, string memory _symbol, address _bundle, address _source) public Token(_name, _symbol, _bundle) {
        source = ERC20(_source);
    }

    function wrap(uint256 value) public {
        source.transferFrom(msg.sender, address(this), value);
        _mint(msg.sender, value);
    }

    function unwrap(uint256 value) public {
        _burn(msg.sender, value);
        source.transfer(msg.sender, value);
    }

}
