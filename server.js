const PRERENDER_TOKEN = process.env.PRERENDER_TOKEN || '';

//Install express server
const express = require("express");
const path = require("path");
const prerender = require("prerender-node");

prerender.crawlerUserAgents.push('googlebot');
prerender.crawlerUserAgents.push('bingbot');
prerender.crawlerUserAgents.push('yandex');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/staxter-currency"));

app.use(prerender.set('prerenderToken', PRERENDER_TOKEN));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/staxter-currency/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
