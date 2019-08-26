const log = require('log-stderr');
const options = require('../options').metrics;

function requestHandler(metricsData) {
  return async (req, res) => {
    const ip = res.socket.remoteAddress;
    const { method, url } = req;

    log.info(`request ${method} ${url} from ${ip}`);

    if (url !== options.url && url !== `${options.url}.json`) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Not found');
      res.end();
      return;
    }

    let statusCode = 500;
    let contentType = 'text/plain';
    let body = 'Internal error';

    try {
      contentType = url === options.url ? 'text/plain' : 'application/json';

      body = url === options.url ? await metricsData.asString() : await metricsData.asJson();
      statusCode = 200;
    } catch (err) {
      log.error(err);
    }

    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.write(body);
    res.end();
  };
}

module.exports = requestHandler;
