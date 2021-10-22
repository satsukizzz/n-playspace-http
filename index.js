'use strict';
const http = require('http');
const pug = require('pug');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const urlDirectories = req.url.split('/');
  // URLによってJSやCSSの振り分け
  if (urlDirectories[1] === 'css') {
    // ブラウザ用CSS読み込み
    try {
      const cssFile = fs.readFileSync('./resources/css/' + urlDirectories[2]);
      res.writeHead(200, {
        'Content-Type': 'text/css charset=utf-8'
      });
      res.write(cssFile);
    } catch (e) {
      //TODO client errorの追加
      console.log(e);
    } finally {
      res.end();
      return;
    }
  } else if (urlDirectories[1] === 'js') {
    // ブラウザ用JS読み込み
    try {
      const jsFile = fs.readFileSync('./resources/js/' + urlDirectories[2]);
      res.writeHead(200, {
        'Content-Type': 'text/javascript charset=utf-8'
      });
      res.write(jsFile);
    } catch (e) {
      //TODO client errorの追加
      console.error(e);
    } finally {
      res.end();
      return;
    }
  }


  // 以降、ページやリダイレクトの読み込み
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
