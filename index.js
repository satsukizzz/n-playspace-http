'use strict';
const http = require('http');
const server = http
  .createServer((req, res) => {
    const now = new Date();
    console.info('[' + now + '] Requested by ' + req.socket.remoteAddress);
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });

    switch (req.method) {
      case 'GET':
        res.write('GET' + req.url);
        break;
      case 'POST':
        res.write('POST' + req.url);
        let rawData = '';
        req
          .on('data', chunk => {
            rawData = rawData + chunk;
          })
          .on('end', () => {
            console.info('[' + '] Data posted: ' + rawData);
          });
        break;
      case 'DELETE':
        res.write('DELETE' + req.url);
        break;
      default:
        break;
    }
    res.end();
  })
  .on('error', e => {
    console.error('[' + new Date() + '] Server Error', e);
  })
  .on('clientError', e => {
    console.error('[' + new Date() + '] Client Error', e);
  });
const port = 8000;
server.listen(port, () => {
  console.log('Listening on ' + port);
});
