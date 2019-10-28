# DeFi Puzzle
Lets users create advanced financial products such as leveraged positions by combining their existing money market (eg. Compound) positions.

*App submitted as a part of Kyber virtual hackathon is for simulation purposes only.*

Kyber hackathon submission: https://devpost.com/software/defi-puzzle

## Motivation: The Missing Piece of the Puzzle
What we have:
* Decentralised money markets (Compound, dYdX…)
* Decentralized exchanges (DeversiFi, Uniswap…)
* Trust-minimized stablecoin (DAI)
* Brokerless margin trading within predefined limits (dYdX, bZx…)


What we miss:
* Brokerless advanced financial products, e.g. perpetual swaps with user-defined parameters. Perpetual swaps are one of the most popular instruments among traders and are one of the reasons why centralised, custodial exchanges like BitMEX are so popular. If we could create such financial products as a DeFi product, the systemic risk of custodial exchanges could be lowered.

## The Idea
Advanced products like perpetual swaps can be constructed by bundling long and short tokens of various nominal amounts and asset types.
Simple example:
* Assume ETH price of $150
* Bundle of {1 long ETH + 75 short DAI} => leveraged long position
* Net value of such position is $750 (+150-75)
* For the price of 1 ETH, user can buy 2 such positions


Resulting financial product is a 2x leveraged long on ETH.


## Building Blocks for the DeFi Puzzle
Long tokens:
* Represent money market deposit
* Accumulate positive interest over time
* Compound cTokens are essentialy long tokens (https://compound.finance/ctokens)
* Same nominal amount as the underlying asset (interest rate is accrued through increasing nominal amount of held Long tokens)
* nomenclature: e.g. long DAI = L-DAI


Short tokens:
* Represent money market liability
* Accumulate negative interest over time
* Same nominal amount as the underlying asset (interest rate is accrued through increasing nominal amount of held Short tokens)
* nomenclature: e.g. short DAI = S-DAI


## Short Tokens ELI5
What are they?
* Fungible tokens with negative value - they represent a liability to return borrowed assets to a money market


How are they transferred?
1) Recipient has to approve
2) Short tokens always need to be in a wallet with sufficient balance of long tokens


How are they created?
* By borrowing assets from the money market
* Borrowing 100 DAI => user gets 100 L-DAI + 100 L-DAI


## Yes but why?
Because when we have both long and short tokens, we can bundle them as advanced financial products that are fully defined by users - without a need for custody and brokers/dealers. 

**Creating a Perpetual swap bundle - Workflow:**

_Assumption_: 1 ETH = $150
_Goal_: construct Pure ETH Upside bundle with DeFi Puzzle (1 L-ETH + 150 S-DAI)
_Starting user wealth_: 2 ETH (=$300)

# I Compound steps


1) deposit 2 ETH => receive 2 L-ETH; allow usage as collateral, enable borrowing
2) borrow 150 DAI => receive 150 L-DAI & 150 S-DAI; 
(!differences vs current Compound workflow: i. user borrows long tokens, not underlying assets themselves; ii. L-tokens and S-tokens in same nominal as underlying assets)
Collateralization: 300 % = (2 L-ETH + 150 L-DAI) / 150 S-DAI

# II DeFi Puzzle steps


3) Select Pure ETH Upside template => 1 L-ETH+150 S-DAI
4) Confirm => NFT appears in user’s wallet
User assets: 1 L-ETH + 150 L-DAI + Pure ETH Upside NFT

Q: should user keep his 150 L-DAI?
A: depends on user profile. 150 L-DAI acts as a safe collateral as it’s not a price volatile asset. Also it yields positive interest, bringing down the APR cost of the operation. If the user has more appetite for risk, he can change the L-DAI to L-ETH, increasing his exposure to ETH price moves (increasing both potential profit and risk).


**Such a contract is custom, non-custodial, trustless, brokerless.**


**Since the resulting bundles are Ethereum NFTs, such financial products can be traded and integrated into other DeFi projects, such as DEXes.**


