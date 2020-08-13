const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  //res.setHeader("Content-Type", "application/json; charset=utf-8");
  // parse принимает строку и отдает URL object
  // pathname вынимает из URL object path часть. (В www.leningrad.ru/vibori/kandidati path – '/vibori/kandidati')
  // slice(1) вернет всю строку после 1го символа, т.е. path после / – vibori/kandidati
  const pathname = url.parse(req.url).pathname.slice(1);
  
  const isSubfolder = (reqPath) => {
    return reqPath.indexOf('/') !== -1;
  }
  
  if (isSubfolder(pathname)) {
   res.statusCode = 400;
   res.end('subfolders are not implemented');
   return;
  }

  // Собирает путь. ${__dirname}/files/${pathname}
  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      // Создаем read stream, в котором читаем файлы, отдаем результат в стрим res
      fs
        .createReadStream(filepath, {
          encoding: 'utf8'
        })
        .on('error', (err) => {
          if (err.code === 'ENOENT') {
            res.statusCode = 404;
            res.end('file doesn\'t exist');
          } else {
            res.statusCode = 500;
            res.end('internal server error');
          }
        })
        .pipe(res)
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
