pragma solidity >=0.4.21 <0.6.0;

import "./Token.sol";

contract ShortToken is Token {

    constructor (string memory _name, string memory _symbol) public Token(_name, _symbol) { }

}
