const jsonServer = require("json-server");
const auth = require("json-server-auth");
const moment = require("moment");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.db = router.db;
const queryString = require("query-string");
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = moment().valueOf();
    req.body.updatedAt = moment().valueOf();
  }

  if (req.method === "PUT") {
    req.method = "PATCH";
  }

  if (req.method === "PATCH") {
    req.body.updatedAt = moment().valueOf();
  }

  next();
});

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  // const header = res.getHeaders();

  // const totalCountHeader = header["x-total-count"];

  // const queryParams = queryString.parse(req._parsedUrl.query);
  // if (req.method === "GET" && totalCountHeader) {
  //   const result = {
  //     data: res.locals.data,
  //     pagination: {
  //       _page: Number.parseInt(queryParams._page) || 1,
  //       _limit: Number.parseInt(queryParams._limit) || 10,
  //       _totalRows: Number.parseInt(totalCountHeader),
  //     },
  //   };
  //   return res.jsonp(result);
  // }
  res.jsonp(res.locals.data);
};

// Use default router
const PORT = process.env.PORT || 5000;

server.use(auth);
server.use(router);
server.listen(PORT, () => {
  console.log("JSON Server is running");
});
