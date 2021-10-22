'use strict';
const http = require('http');
const pug = require('pug');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/calculator') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.write(pug.renderFile('./resources/calculator.pug'));
    res.end();
    return;
  }

  // デフォルトぺージ
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write(
    `<!DOCTYPE html><html lang="ja">
      <body>
        <h1>HTMLの一番大きい見出しを表示します</h1>
      </body>
    </html>`
  );
  res.end();
  return;
});
const port = 8000;
server.listen(port, () => {
  console.log('Listening on ' + port);
});
