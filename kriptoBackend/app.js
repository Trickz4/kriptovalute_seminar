const config = require('./Config/config');

const express = require("express");
const app = express();
const port = 5000;

// setup client to OSS blockchain for rpc
const Client = require("./node_modules/bitcoin-core");
const client = new Client({
  host: config.OSS.host,
  network: "mainnet",
  port: config.OSS.port,
  username: config.user_credentials.username,
  password: config.user_credentials.password,
});




// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getRawMempool", (req, res) => {
  client.getRawMempool().then((response) => {
    res.send(response);
  });
});

app.get("/currentValue", (req, res) => {
  // TODO: implement call for current value of bitcoin
  // client.getRawMempool().then((response) => {
  //   res.send(response);
  // });
});

// listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
