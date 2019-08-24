# DeFi Puzzle
Lets users create advanced financial products such as fixed-term futures contracts with all the DeFi qualities of decentralization, trustlessness & no counterparty risk.

Idea conceived & first commits done at ETHBerlinZwei (https://github.com/ethberlinzwei).

For better understanding of our project, we recommend getting familiar with Compound's cTokens: https://compound.finance/ctokens.

## The Missing Peace of the Puzzle
What we have:
* Decentralised money market (Compound)
* Decentralized exchanges (DeversiFi, Uniswap…)
* Trustless stablecoin (DAI)
* Brokerless margin trading (dYdX, bZx…)


What we miss:
* Brokerless advanced products: fully custom margin trading, fixed-term futures

## The Idea
Advanced products like futures can be constructed by combining long and short tokens of various nominal amounts and asset types.
Simple example:
* Assume ETH price of $100/ETH
* 1 long ETH + 50 short DAI => leveraged long position
* Net value of such position is $50 (+100-50)
* For price of 1 ETH, user can buy 2 such positions
* Such position is thus a 2x leveraged long on ETH

## The Jigsaw = Building Blocks for the DeFi Puzzle
Long tokens:
* Represent money market deposit
* Accumulate positive interest over time
* Already deployed on top of Compound: cDAI, cETH… - though we need to wrap them into “lc” tokens - so they can act as a liquidatable collateral for new type of short tokens


Short tokens:
* Represent money market liability
* Accumulate negative interest over time
* Can be deployed on top of Compound as scDAI, scETH...


Timelock:
* Required for fixed-term futures
* Long+short token bundles can be put into smart contract, then timelocked

## What the Hell are Short Tokens? ELI5
What are they?
* Fungible tokens with negative value - they represent a liability to return borrowed asset to Compound money market


How are they transferred?
1) Recipient has to approve
2) Short tokens alway need to be in a wallet with sufficient balance of long tokens


How are they created?
* By borrowing from Compound money market
* Borrowing 100 DAI => user gets 100 lcDAI + 100 scDAI

## Yes but why?
Because when we have all the puzzle pieces, we can create advanced financial products that are fully defined by users - without a need for custody and brokers/dealers. 

**Creating a Custom Futures Contract - Workflow**
Assume ETH price of $100/ETH.
1) Alice owns 10 ETH, deposits into Compound => 10 cETH; wraps into 10 lcETH
2) Alice borrows a bundle: {~510 lcDAI, 500 scDAI}
(Compound long tokens accrue interest rate through exchange rate vs original asset => hence diff nominal amounts; short tokens need to be “bought out” for ever increasing # of long tokens - that’s how user pays the accrued interest for the debt)
3) Alice rebundles: {10 lcETH, 500 scDAI}; she also has 510 lcDAI which she can spend on whatever
4) Alice adds timelock to {10 lcETH, 500 scDAI} of 90 days
5) Now she has created a fixed term futures with 90 days maturity. Futures contract is for ETH leveraged long (leverage is 2x)
6) Alice can sell the futures contract to Bob, e.g. for 501 DAI (earning a 1 DAI profit for her work)
7) Bob waits for maturity and later unlocks the ETH by buying out the short DAI tokens, e.g. for 550 lcDAI (paying down the accrued interest)


**Such a futures contract is fully custom, non-custodial, trustless, brokerless.**

## Too Complicated!
The workflow can be abstracted away.


User combines the tokens in a visual tool - tokens shown as fitting puzzle pieces.


**DeFi puzzle lets users create custom financial products in an intuitive way.**


**Since the resulting bundles are Ethereum NFTs, exchanges can integrate them as trustless, non-custodial exchange traded futures contracts.**


