const express = require("express");
const cors = require("cors");
const productRoute = require("./app/routes/products");
const portfolioRoute = require("./app/routes/portfolio");
const symbolRoute = require("./app/routes/symbol");
const orderRoute = require("./app/routes/order");
const alertRoute = require("./app/routes/alert");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

productRoute(app);
portfolioRoute(app)
symbolRoute(app)
// orderRoute(app)
alertRoute(app)
// simple route
app.use("/", (req, res) => {
  let mes = `
  <p>Lotusa React training backend</p>`
  res.send(`<div>${mes}</div>`)
});

// require("./app/routes/products")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
