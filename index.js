'use strict';
const http = require('http');
const server = http.createServer((req, res) => {
  console.info(
    '[' + new Date() + '] Requested by ' + req.socket.remoteAddress
  );
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
    res.write(req.headers['user-agent']);
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