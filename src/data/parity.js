function setup(web3) {
  web3.extend({
    property: 'parity',
    methods: [
      {
        name: 'versionInfo',
        call: 'parity_versionInfo',
      },
      {
        name: 'transactionsLimit',
        call: 'parity_transactionsLimit',
      },
      {
        name: 'chain',
        call: 'parity_chain',
      },
      {
        name: 'netPeers',
        call: 'parity_netPeers',
      },
      {
        name: 'rpcSettings',
        call: 'parity_rpcSettings',
      },
      {
        name: 'unsignedTransactionsCount',
        call: 'parity_unsignedTransactionsCount',
      },
      {
        name: 'mode',
        call: 'parity_mode',
      },
      {
        name: 'nodeKind',
        call: 'parity_nodeKind',
      },
    ],
  });

  return web3.parity;
}

module.exports = setup;
