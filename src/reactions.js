import {
    initializeWallet,
    isWalletReady,
    getWalletName,
} from './library/wallet';

export default {
    ExampleAction: ({ payload, update, context }) => {
        // When store.dispatch('ExampleAction', { foo: true, bar: false }) is called
        // here you can react to such action
        //  use action payload ({ foo: true, bar: false }),
        //  set context instance by context({ instanceName: instance })
        //  use already setted context.instanceName
        //  and update state
        //   synchronously by return { fooAndBar: foo && bar }
        //   and/or asynchronously by update({ fooAndBar: foo && bar })
    },

    InitializeWallet: ({ payload, update, context }) => {
        const walletState = ({ web3, ethereum }) => ({
            wallet: {
                isReady: Boolean(web3),
                isConnected: isWalletReady({ web3 }),
                name: getWalletName({ ethereum }),
            },
        });

        const wallet = initializeWallet(wallet => {
            context(wallet);
            update(walletState(wallet));
        });

        context(wallet);
        return walletState(wallet);
    },

    EnableWallet: ({ context }) => {
        if (context.ethereum) {
            context.ethereum.enable();
        } else {
            console.warn('No ethereum wallet to enable');
        }
    },
};
