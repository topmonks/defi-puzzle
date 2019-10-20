import React from 'react';
import Headline from '../components/Headline';
import Button from '../components/Button';
import WalletIcon from '../components/WalletIcon';

export default function LandingScreen({ dispatch, wallet }) {
    const handleConnectWallet = () => {
        dispatch('ConnectWallet');
    };

    return (
        <div className="landing-screen">
            <Headline logo>DeFi Puzzle</Headline>
            <div className="landing-screen__content">
                <Headline hero>
                    Custom financial products
                    <br /> on top of Compound
                </Headline>
                <p>
                    Welcome to DeFi Puzzle! Our dashboard lets you create custom
                    financial
                    <br />
                    products by combining your existing Compound money market
                    positions.
                    <br />
                    Let’s start by connecting a wallet containing your Compound
                    cTokens, shall we?
                </p>
                <Button
                    className="landing-screen__connect-button"
                    onClick={handleConnectWallet}
                >
                    Connect wallet
                </Button>
                <div className="landing-screen__wallet-icons">
                    {['metamask', 'trezor', 'ledger'].map(name => (
                        <WalletIcon
                            key={name}
                            type={name}
                            active={wallet.name === name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
