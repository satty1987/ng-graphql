// server.js

const express = require("express");
var app = express();
var httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer({
  ssl: false,
  secure: false,
  changeOrigin: true
  });
const serverOne = 'https://watsonapihackathon-ilab02-green.dev.px-npe01.cf.t-mobile.com';

var proxy = require('express-http-proxy');
// app.use('/graphql', proxy(serverOne));



app.use(express.static('./dist'));

app.get('/*', function(req,res) {
  res.sendfile('./dist/index.html');
}); 

app.all("/graphql", function(req, res) {
  apiProxy.web(req, res, {target: serverOne});
});

apiProxy.on('error', (err, req, res) => {
  console.log('Proxy server error: \n', err);
  res.status(500).json({ message: err.message });
});

app.listen(4000);

console.log("Running a GraphQL API server at http://localhost:4000/graphql");