const log = require('log-stderr');
const Web3 = require('web3');
const { TxPool } = require('web3-eth-txpool');
const { url } = require('../options').ethereum;
const web3 = new Web3(url);
const txPool = new TxPool(url);
const parity = require('./parity')(web3);
const { eth } = web3;
const { net } = eth;

const {
  setGaugeValue,
  //
  registry,
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
} = require('./metrics');

async function updateCommon() {
  setGaugeValue(networkType, await net.getNetworkType());
  setGaugeValue(netId, await net.getId());
  setGaugeValue(isListening, await net.isListening());
  setGaugeValue(peerCount, await net.getPeerCount());
  setGaugeValue(protocolVersion, await eth.getProtocolVersion());
  setGaugeValue(isMining, await eth.isMining());
  setGaugeValue(hashRate, await eth.getHashrate());
  setGaugeValue(blockNumber, await eth.getBlockNumber());
  setGaugeValue(nodeInfo, await eth.getNodeInfo());
}

async function updateParity() {
  try {
    setGaugeValue(parityMode, await parity.mode());
  } catch (err) {
    log.notice('Parity methods not supported');
    log.debug(err);
    return err;
  }

  setGaugeValue(parityTransactionsLimit, await parity.transactionsLimit());
  setGaugeValue(parityUnsignedTransactionsCount, await parity.unsignedTransactionsCount());
  setGaugeValue(parityChain, await parity.chain());

  const { track, version } = await parity.versionInfo();
  const { major, minor, patch } = version;
  setGaugeValue(parityVersionTrack, track);
  setGaugeValue(parityVersionMajor, major);
  setGaugeValue(parityVersionMinor, minor);
  setGaugeValue(parityVersionPatch, patch);

  const { active, connected, max } = await parity.netPeers();
  setGaugeValue(parityPeersActive, active);
  setGaugeValue(parityPeersConnected, connected);
  setGaugeValue(parityPeersMax, max);

  const { availability, capability } = await parity.nodeKind();
  setGaugeValue(parityNodeAvailability, availability);
  setGaugeValue(parityNodeCapability, capability);

  const { enabled, interface, port } = await parity.rpcSettings();
  setGaugeValue(parityRpcEnabled, enabled);
  setGaugeValue(parityRpcInterface, interface);
  setGaugeValue(parityRpcPort, port);
}

async function updateTxPool() {
  try {
    const { pending, queued } = await txPool.getStatus();
    setGaugeValue(txpoolPending, pending);
    setGaugeValue(txpoolQueued, queued);
  } catch (err) {
    log.notice('TxPool methods not supported');
    log.debug(err);
    return err;
  }
}

async function updateSyncing() {
  const result = await web3.eth.isSyncing();
  setGaugeValue(isSyncing, typeof result === 'object');

  if (typeof result !== 'object') return;

  setGaugeValue(startingBlock, result.startingBlock);
  setGaugeValue(currentBlock, result.currentBlock);
  setGaugeValue(highestBlock, result.highestBlock);

  if (typeof result.knownStates === 'number') setGaugeValue(knownStates, result.knownStates);
  if (typeof result.pulledStates === 'number') setGaugeValue(pulledStates, result.pulledStates);
}

async function update() {
  try {
    await updateCommon();
    await updateParity();
    await updateTxPool();
    await updateSyncing();
  } catch (err) {
    log.error(err.message);
    log.debug(err);
    exporterErrors.inc();
  }

  return registry;
}

module.exports = update;
