//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AMM {
  // The IERC20 interface allows us to access the token contracts
  IERC20 private immutable matic;
  IERC20 private immutable superflow;

  uint256 totalShares; // Stores the total amount of share issued for the pool
  uint256 totalMatic; // Stores the amount of Token1 locked in the pool
  uint256 totalSuperflow; // Stores the amount of Token2 locked in the pool
  uint256 K; // Algorithmic constant used to determine price

  mapping(address => uint256) shares; // Stores the share holding of each provider

  // Pass the token addresses to the constructor
  constructor(IERC20 _matic, IERC20 _superflow) {
    matic = _matic; 
    superflow = _superflow;
  }

  // Liquidity must be provided before we can make swaps from the pool
  modifier activePool() {
    require(totalShares > 0, "Zero Liquidity");
    _;
  }

  modifier validAmountCheck(IERC20 _token, uint256 _amount) {
    require(_amount > 0, "Amount cannot be zero!");
    require(_amount <= _token.balanceOf(msg.sender), "Insufficient amount");
    _;
  }

  modifier validSharesCheck(uint256 _amount) {
    require(_amount > 0, "Share amount cannot be zero!");
    require(_amount <= shares[msg.sender], "Insufficient share amount");
    _;
  }

	// Redefine state variables so we don't get a shadow warning
  function getPoolDetails() external view returns(uint256 maticAmount, uint256 superflowAmount, uint256 ammShares) {
    maticAmount = totalMatic;
    superflowAmount = totalSuperflow;
    ammShares = totalShares;
  }

  // Allows a user to provide liquidity to the pool
  function provide(uint256 _amountMatic, uint256 _amountSuperflow) external validAmountCheck(matic, _amountMatic) validAmountCheck(superflow, _amountSuperflow) returns(uint256 share) {
    if(totalShares == 0) { // Initial liquidity provider is issued 100 Shares
      share = 100 * 10**18;
    } else {
      uint256 share1 = totalShares * (_amountMatic / totalMatic);
      uint256 share2 = totalShares * (_amountSuperflow / totalSuperflow);
      require(share1 == share2, "Equivalent value of tokens not provided...");
      share = share1;
    }

    require(share > 0, "Asset value less than threshold for contribution!");
    // Important! The frontend must call the token contract's approve function first.
    matic.transferFrom(msg.sender, address(this), _amountMatic);
    superflow.transferFrom(msg.sender, address(this), _amountSuperflow);

    totalMatic += _amountMatic;
    totalSuperflow += _amountSuperflow;
    K = totalMatic * totalSuperflow;

    totalShares += share;
    shares[msg.sender] += share;
  }

  // Returns the amount of SUPERFLOW user will get for given amount of MATIC
  function getSwapMaticEstimate(uint256 _amountMatic)
    public
    view
    activePool
    returns (uint256 amountSuperflow)
  {
    uint256 maticAfter = totalMatic + _amountMatic;
    uint256 superflowAfter = K / maticAfter;
    amountSuperflow = totalSuperflow - superflowAfter;

    // We don't want to completely empty the pool
    if (amountSuperflow == totalSuperflow) amountSuperflow--;
  }

  // Swaps given amount of MATIC for SUPERFLOW
  function swapMatic(uint256 _amountMatic)
    external
    activePool
    validAmountCheck(matic, _amountMatic)
    returns (uint256 amountSuperflow)
  {
    amountSuperflow = getSwapMaticEstimate(_amountMatic);
    require(
      matic.allowance(msg.sender, address(this)) >= _amountMatic,
      "Insufficient allowance"
    );

    matic.transferFrom(msg.sender, address(this), _amountMatic);
    totalMatic += _amountMatic;
    totalSuperflow -= amountSuperflow;
    superflow.transfer(msg.sender, amountSuperflow);
  }

  // Returns the amount of MATIC user will get for given amount of SUPERFLOW
  function getSwapSuperflowEstimate(uint256 _amountSuperflow)
    public
    view
    activePool
    returns (uint256 amountMatic)
{
    uint256 SuperflowAfter = totalSuperflow + _amountSuperflow;
    uint256 maticAfter = K / SuperflowAfter;
    amountMatic = totalMatic - maticAfter;

    // We don't want to completely empty the pool
    if (amountMatic == totalMatic) amountMatic--;
  }

  // Swaps given amount of SUPERFLOW for MATIC
  function swapSuperflow(uint256 _amountSuperflow)
    external
    activePool
    validAmountCheck(superflow, _amountSuperflow)
    returns (uint256 amountMatic)
{
    amountMatic = getSwapSuperflowEstimate(_amountSuperflow);

    superflow.transferFrom(msg.sender, address(this), _amountSuperflow);
    totalSuperflow += _amountSuperflow;
    totalMatic -= amountMatic;
    matic.transfer(msg.sender, amountMatic);
  }
}
