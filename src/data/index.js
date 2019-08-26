const updateRegistry = require('./update');

async function exportAsString() {
  const registry = await updateRegistry();
  return registry.metrics();
}

async function exportAsJson() {
  const registry = await updateRegistry();
  const json = JSON.stringify(registry.getMetricsAsJSON());
  return json;
}

module.exports.asString = exportAsString;
module.exports.asJson = exportAsJson;
