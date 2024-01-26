//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Matic is ERC20 {
  constructor() ERC20('Matic', 'MATIC') {
    _mint(msg.sender, 2000 * 10**decimals()); 
  }
}
