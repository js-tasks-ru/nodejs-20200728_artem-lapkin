const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);
  
  const isSubfolder = (reqPath) => {
    return reqPath.indexOf('/') !== -1 || reqPath.indexOf('..') !== -1;
  }
  
  if (isSubfolder(pathname)) {
    res.statusCode = 400;
    res.end('subfolders are not implemented');
    return;
  }

  switch (req.method) {
    case 'DELETE':
      fs.unlink(filepath, (err) => {
        if (err && err.code === 'ENOENT') {
          res.statusCode = 404;
          res.end('not found');
        } else if (err && err.code !== 'ENOENT'){
          res.statusCode = 500;
          res.end('internal server error');
        } else {
          res.statusCode = 200;
          res.end('ok')
        }
      })
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
