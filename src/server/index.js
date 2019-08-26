const log = require('log-stderr');
const http = require('http');
const options = require('../options').metrics;
const requestHandler = require('./request-handler');

const onClientError = (err, socket) => {
  log.warn(`client error from ${socket.remoteAddress} - ${err.message}`);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
};

const onServerReady = () => log.info(`listening port ${options.port}`);

function start(metrics) {
  const onRequest = requestHandler(metrics);
  const server = http.createServer(onRequest);
  server.on('clientError', onClientError);
  return server.listen(options.port, onServerReady);
}

module.exports = start;
