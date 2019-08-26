const client = require('prom-client');
const { prefix } = require('../options').metrics;

const exporterErrors = new client.Counter({
  help: 'Errors counter.',
  name: `${prefix}exporter_errors`,
});

const isSyncing = new client.Gauge({
  help: 'Is node syncing.',
  name: `${prefix}is_syncing`,
});

const startingBlock = new client.Gauge({
  help: 'The block number where the sync started.',
  name: `${prefix}starting_block`,
});

const currentBlock = new client.Gauge({
  help: 'The block number where at which block the node currently synced to already.',
  name: `${prefix}current_block`,
});

const highestBlock = new client.Gauge({
  help: 'The estimated block number to sync to.',
  name: `${prefix}highest_block`,
});

const knownStates = new client.Gauge({
  help: 'The estimated states to download.',
  name: `${prefix}known_states`,
});

const pulledStates = new client.Gauge({
  help: 'The already downloaded states.',
  name: `${prefix}pulled_states`,
});

const isMining = new client.Gauge({
  help: 'True if the node is mining, otherwise false.',
  name: `${prefix}is_mining`,
});

const protocolVersion = new client.Gauge({
  help: 'Protocol version - string value in labels.',
  name: `${prefix}protocol_version`,
  labelNames: ['value'],
});

const hashRate = new client.Gauge({
  help: 'Returns the number of hashes per second that the node is mining with.',
  name: `${prefix}hash_rate`,
});

const blockNumber = new client.Gauge({
  help: 'Returns the current block number.',
  name: `${prefix}block_number`,
});

const netId = new client.Gauge({
  help: 'The network ID.',
  name: `${prefix}net_id`,
});

const isListening = new client.Gauge({
  help: 'Checks if the node is listening for peers.',
  name: `${prefix}is_listening`,
});

const peerCount = new client.Gauge({
  help: 'Get the number of peers connected to.',
  name: `${prefix}peer_count`,
});

const networkType = new client.Gauge({
  help: 'Guesses the chain the node is connected by comparing the genesis hashes.',
  name: `${prefix}network_type`,
  labelNames: ['value'],
});

const txpoolPending = new client.Gauge({
  help: 'Number of pending transactions.',
  name: `${prefix}txpool_pending`,
});

const txpoolQueued = new client.Gauge({
  help: 'Number of queued transactions.',
  name: `${prefix}txpool_queuedg`,
});

const nodeInfo = new client.Gauge({
  help: 'The current client version - text value in labels.',
  name: `${prefix}node_info`,
  labelNames: ['value'],
});

const parityTransactionsLimit = new client.Gauge({
  help: 'Current max number of transactions in queue.',
  name: `${prefix}parity_transactions_limit`,
});

const parityUnsignedTransactionsCount = new client.Gauge({
  help: 'Returns number of unsigned transactions when running with Trusted Signer.',
  name: `${prefix}parity_unsigned_transactions_count`,
});

const parityMode = new client.Gauge({
  help: 'Returns number of unsigned transactions when running with Trusted Signer.',
  name: `${prefix}parity_mode`,
  labelNames: ['value'],
});

const parityChain = new client.Gauge({
  help: 'Returns the name of the connected chain.',
  name: `${prefix}parity_chain`,
  labelNames: ['value'],
});

const parityVersionTrack = new client.Gauge({
  help:
    'Track on which it was released, one of: "stable", "beta", "nightly", "testing", "null" (unknown or self-built).',
  name: `${prefix}parity_version_track`,
  labelNames: ['value'],
});

const parityVersionMajor = new client.Gauge({
  help: 'Parity version info - major.',
  name: `${prefix}parity_version_major`,
});

const parityVersionMinor = new client.Gauge({
  help: 'Parity version info - minor.',
  name: `${prefix}parity_version_minor`,
});

const parityVersionPatch = new client.Gauge({
  help: 'Parity version info - patch.',
  name: `${prefix}parity_version_patch`,
});

const parityPeersActive = new client.Gauge({
  help: 'Parity peers info - active.',
  name: `${prefix}parity_peers_active`,
});

const parityPeersConnected = new client.Gauge({
  help: 'Parity peers info - connected.',
  name: `${prefix}parity_peers_connected`,
});

const parityPeersMax = new client.Gauge({
  help: 'Parity peers info - max.',
  name: `${prefix}parity_peers_max`,
});

const parityNodeAvailability = new client.Gauge({
  help: 'Returns the node type availability and capability.',
  name: `${prefix}parity_node_availability`,
  labelNames: ['value'],
});

const parityNodeCapability = new client.Gauge({
  help: 'Returns the node type availability and capability.',
  name: `${prefix}parity_node_capability`,
  labelNames: ['value'],
});

const parityRpcEnabled = new client.Gauge({
  help: 'Provides current JSON-RPC API settings.',
  name: `${prefix}parity_rpc_enabled`,
});

const parityRpcInterface = new client.Gauge({
  help: 'Provides current JSON-RPC API settings.',
  name: `${prefix}parity_rpc_interface`,
  labelNames: ['value'],
});

const parityRpcPort = new client.Gauge({
  help: 'Provides current JSON-RPC API settings.',
  name: `${prefix}parity_rpc_port`,
});

function setGaugeValue(gauge, value) {
  const valueType = typeof value;

  if (valueType === 'string') {
    gauge.set({ value }, 1);
  } else if (valueType === 'boolean') {
    gauge.set(value === true ? 1 : 0);
  } else if (valueType === 'number') {
    gauge.set(value);
  } else {
    throw new Error(`Unknow value type "${valueType}" for gauge "${gauge.name}"`);
  }
}

module.exports = {
  setGaugeValue,
  //
  registry: client.register,
  exporterErrors,
  //
  isSyncing,
  //
  startingBlock,
  currentBlock,
  highestBlock,
  knownStates,
  pulledStates,
  isMining,
  protocolVersion,
  hashRate,
  blockNumber,
  netId,
  isListening,
  peerCount,
  networkType,
  nodeInfo,
  //
  txpoolPending,
  txpoolQueued,
  //
  parityTransactionsLimit,
  parityUnsignedTransactionsCount,
  parityMode,
  parityChain,
  parityVersionTrack,
  parityVersionMajor,
  parityVersionMinor,
  parityVersionPatch,
  parityPeersActive,
  parityPeersConnected,
  parityPeersMax,
  parityNodeAvailability,
  parityNodeCapability,
  parityRpcEnabled,
  parityRpcInterface,
  parityRpcPort,
};
