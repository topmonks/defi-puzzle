pragma solidity >=0.4.21 <0.6.0;

import "./Token.sol";

contract ShortToken is Token {

    constructor (string memory _name, string memory _symbol, address _bundle) public Token(_name, _symbol, _bundle) { }

}
