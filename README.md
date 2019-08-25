# DeFi Puzzle
Lets users create advanced financial products such as fixed-term futures contracts with the DeFi qualities of decentralization, trustlessness & no counterparty risk.

Idea conceived & first commits done at ETHBerlinZwei (https://github.com/ethberlinzwei).

For better understanding of our project, we recommend getting familiar with Compound's cTokens: .

## The Missing Piece of the Puzzle
What we have:
* Decentralised money market (Compound)
* Decentralized exchanges (DeversiFi, Uniswap…)
* Trustless stablecoin (DAI)
* Brokerless margin trading within predefined limits (dYdX, bZx…)


What we miss:
* Brokerless advanced financial products, e.g. fixed-term futures with user-defined parameters

## The Idea
Advanced products like futures can be constructed by bundling long and short tokens of various nominal amounts and asset types.
Simple example:
* Assume ETH price of $100/ETH
* Bundle of {1 long ETH + 50 short DAI} => leveraged long position
* Net value of such position is $50 (+100-50)
* For price of 1 ETH, user can buy 2 such positions


Resulting financial product is a 2x leveraged long on ETH.

## Building Blocks for the DeFi Puzzle
Long tokens:
* Represent money market deposit
* Accumulate positive interest over time
* Long tokens are already working on top of Compound (https://compound.finance/ctokens)
* e.g. long DAI = lDAI


Short tokens:
* Represent money market liability
* Accumulate negative interest over time
* e.g. short DAI = sDAI


Timelock:
* Required for fixed-term futures
* Token bundles can be timelocked, adding a fixed-term maturity to the resulting financial product

## Short Tokens ELI5
What are they?
* Fungible tokens with negative value - they represent a liability to return borrowed assets to a money market


How are they transferred?
1) Recipient has to approve
2) Short tokens always need to be in a wallet with sufficient balance of long tokens


How are they created?
* By borrowing assets from the money market
* Borrowing 100 DAI => user gets 100 lDAI + 100 sDAI

## Yes but why?
Because when we have both long and short tokens, we can bundle them as advanced financial products that are fully defined by users - without a need for custody and brokers/dealers. 

**Creating a Custom Futures Contract - Workflow:**


Assume ETH price of $100/ETH.
1) Alice owns 10 ETH, deposits into money market => 10 lETH
2) Alice borrows a bundle: {~510 lDAI, 500 sDAI}


(money market long tokens accrue interest rate through exchange rate vs original asset => hence different nominal amounts for long and short DAI; short tokens need to be “bought out” for ever increasing amount of long tokens - that’s how user pays the accrued interest on the debt. For more details please see https://compound.finance/ctokens)


3) Alice rebundles: {10 lETH, 500 sDAI}; the remaining 510 lDAI are free to be spent
4) Alice adds timelock to {10 lETH, 500 sDAI} of 90 days
5) Now she has created a fixed term futures with 90 days maturity. Futures contract is for ETH leveraged long (leverage is 2x)
6) Alice can sell the futures contract to Bob, e.g. for 501 DAI (earning a 1 DAI profit for her work)
7) Bob waits for maturity and later unlocks the ETH by buying out the short DAI tokens, e.g. for 550 lDAI (paying down the accrued interest)


**Such a futures contract is fully custom, non-custodial, trustless, brokerless.**

## Too Complicated?
The technical workflow can be abstracted away with a DeFi Puzzle visual tool.


User bundles the tokens in a visual tool - tokens shown as fitting puzzle pieces.


**DeFi Puzzle visual tool lets users create custom financial products in an intuitive way.**


**Since the resulting bundles are Ethereum NFTs, exchanges can integrate them as trustless, non-custodial exchange traded futures contracts.**


