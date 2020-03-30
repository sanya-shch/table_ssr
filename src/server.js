import "@babel/polyfill";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { setTable } from "./redux/actions/tableActions";
import App from "./App";
import createStore from "./redux/store";
import { assetsByChunkName } from "../dist/stats.json";

import http from "http";
import fs from "fs";

const port = 3000;

const renderer = (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" type="text/css" href="/${
        assetsByChunkName.main[0]
      }" />
      <title>Document</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
      </script>
      <script src="/${assetsByChunkName.main[1]}"></script>
    </body>
  </html>`;
};

function handleError(err, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(err.message);
}

http
  .createServer((req, res) => {
    if (req.url === "/") {
      const store = createStore();

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(renderer(req, store));
    } else if (req.url === `/${assetsByChunkName.main[0]}`) {
      const stream = fs.createReadStream(`./dist${req.url}`);
      stream.on("error", err => handleError(err, res));
      res.writeHead(200, { "Content-Type": "text/css" });
      stream.pipe(res);
    } else if (req.url === `/${assetsByChunkName.main[1]}`) {
      const stream = fs.createReadStream(`./dist${req.url}`);
      stream.on("error", err => handleError(err, res));
      res.writeHead(200, { "Content-Type": "text/javascript" });
      stream.pipe(res);
    } else if (/\?m=\d+&n=\d+&x=\d+/gim.test(req.url)) {
      const { m, n, x } = require("url").parse(req.url, true).query;

      const store = createStore();

      store.dispatch(
        setTable(parseInt(m, 10), parseInt(n, 10), parseInt(x, 10))
      );

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(renderer(req, store));
    }
  })
  .listen(port, () => {
    console.log(`Server running at port: ${port}`);
  });

/*
const app = express();

app.use(express.static("dist"));

app.get("*", (req, res) => {
  console.log(`${req.method} ${req.url}`);

  const { m, n, x } = require("url").parse(req.url, true).query;

  const store = createStore();

  store.dispatch(
    setTable(
      parseInt(m, 10),
      parseInt(n, 10),
      parseInt(x, 10)
    )
  );

  const content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  res.send(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" type="text/css" href="/${
        assetsByChunkName.main[0]
      }" />
      <title>Document</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
      </script>
      <script src="/${assetsByChunkName.main[1]}"></script>
    </body>
  </html>`);
});

app.listen(3000, () => {
  console.log("Server on port 3000");
});
*/

/*
 window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}

 window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
        /</g,
        "\\u003c"
      )}
*/
