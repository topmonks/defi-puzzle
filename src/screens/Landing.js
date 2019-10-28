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
                    Second layer DeFi solution
                </Headline>
                <p>
                    Leveraged trading reinvented.
                    <br />
                    Construct any custom financial product on top of Compound money market positions. 
                    <br />
                    Hold the products for yourself or sell them on an exchange.*
                    <br />
                    Let’s begin!
                    <br />
                    <br />
                    *please note the app is in a simulation mode for now.
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
