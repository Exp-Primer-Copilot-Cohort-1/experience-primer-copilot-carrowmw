// Create a web server
// 1. Create a web server
// 2. Handle requests
// 3. Send responses
// 4. Listen on a port

const http = require('http');
const fs = require('fs');
const url = require('url');

// 1. Create a web server
const server = http.createServer((req, res) => {
  // 2. Handle requests
  const path = url.parse(req.url, true).pathname;
  if (path === '/comments' && req.method === 'GET') {
    // 3. Send responses
    fs.readFile('./data/comments.json', 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } else if (path === '/comments' && req.method === 'POST') {
    // 3. Send responses
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      fs.readFile('./data/comments.json', 'utf8', (err, data) => {
        const comments = JSON.parse(data);
        const comment = JSON.parse(body);
        comments.push(comment);
        fs.writeFile('./data/comments.json', JSON.stringify(comments), (err) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(comment));
        });
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// 4. Listen on a port
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
