/*
 *  Now supports only Metamask
 */

let { web3, Web3, ethereum } = global;

export const WALLET_NAMES = {
    metamask: 'Metamask',
    ledger: 'Letger',
    trezor: 'Trezor',
};

export const isWalletReady = ({ web3 = window.web3 } = {}) => {
    if (!web3) return false;

    return Boolean(
        web3.currentProvider.networkVersion === '3' && web3.eth.defaultAccount,
    );
};

export const getWalletName = ({ ethereum }) => {
    return ethereum?.isMetaMask ? 'metamask' : undefined;
};

export const initializeWallet = callback => {
    const _wallet = { ethereum, web3 };

    if (typeof web3 !== 'undefined') {
        web3 = _wallet.web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.warn('Wallet not present');
    }

    if (ethereum) {
        web3 = _wallet.web3 = new Web3(ethereum);

        ethereum.autoRefreshOnNetworkChange = false;
        ethereum.on('accountsChanged', accounts => {
            const defaultAccount = accounts[0];
            web3.eth.defaultAccount = defaultAccount;
            void callback(_wallet);
        });
        ethereum.on('networkChanged', () => {
            void callback(_wallet);
        });
        // ethereum.enable(); // call this when user confirm that
    }

    return _wallet;
};
