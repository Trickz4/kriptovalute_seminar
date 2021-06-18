const config = require("./Config/config");
const http = require("http");
const request = require("request");

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

app.get("/getRawTransaction", (req, res) => {
  let txId = req.query.id;

  client.getRawTransaction(txId, true).then((response) => {
    res.send(response);
  });
});

app.get("/currentValue", (req, res) => {
  // request.get("https://blockchain.info/ticker", (err, response, body) => {
  //   let JSONresponse = JSON.parse(body);
  //   res.send(JSON.parse(response.body));
  // });

  request(
    {
      method: "GET",
      uri: "https://blockchain.info/ticker",
      // headers: { Authorization: "Bearer " + "TOKEN HERE" },
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(response.body));
      } else {
        res.send("GET failed");
      }
    }
  );
});

app.get("/blockchainStats", (req, res) => {
  request(
    {
      method: "GET",
      uri: "https://api.blockchain.info/stats",
      // headers: { Authorization: "Bearer " + "TOKEN HERE" },
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(response.body));
      } else {
        res.send("GET blockchain stats failed");
      }
    }
  );
});

app.get("/getBlockchainInfo", (req, res) => {
  client.getBlockchainInfo().then((response) => {
    res.send(response);
  });
});

app.get("/getNetworkInfo", (req, res) => {
  client.getNetworkInfo().then((response) => {
    res.send(response);
  });
});


app.get("/networkHashPs", (req, res) => {
  client.getNetworkHashPs().then((response) => {
    res.send(response);
  });
});


// GET market price, timespan = 1 year, per day
app.get("/marketPriceChartData", (req, res) => {
  request(
    {
      method: "GET",
      uri: "https://api.blockchain.info/charts/market-price?timespan=1year&rollingAverage=24hours&format=json",
      // headers: { Authorization: "Bearer " + "TOKEN HERE" },
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(response.body));
      } else {
        res.send("GET chart data failed");
      }
    }
  );
});


// listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
