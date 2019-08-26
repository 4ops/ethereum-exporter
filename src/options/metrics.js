const metrics = {
  url: process.env.METRICS_URL || '/metrics',
  port: process.env.METRICS_PORT || 9144,
  prefix: process.env.METRICS_PREFIX || 'ethereum_',
};

module.exports = metrics;
