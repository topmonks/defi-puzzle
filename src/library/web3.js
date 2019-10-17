let { web3, Web3 } = global;

export const isWeb3Ready = (web3 = window.web3) => {
    if (!web3) return false;

    return (
        web3.currentProvider.networkVersion === '3' &&
        web3.eth.defaultAccount &&
        true
    );
};

export const initializeWeb3 = callback => {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.error('todo: web3 not defined');
    }

    if (window.ethereum) {
        const ethereum = window.ethereum;

        const web3Provider = new Web3(ethereum);

        ethereum.autoRefreshOnNetworkChange = false;
        ethereum.enable().then(account => {
            const defaultAccount = account[0];
            web3Provider.eth.defaultAccount = defaultAccount;
        });
        ethereum.on('networkChanged', callback);
    }

    return web3;
};
