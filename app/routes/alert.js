module.exports = app => {
  const alert = require("../controllers/alert.js");

  var router = require("express").Router();

  // Create a new Tutorial
  // router.post("/all", alert.creates);
  router.post("/", alert.create);

  // Retrieve all alert
  router.get("/", alert.findAll);

  // Retrieve all published alert
  router.get("/published", alert.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", alert.findOne);

  // Update a Tutorial with id
  router.put("/:id", alert.update);

  // Delete a Tutorial with id
  router.delete("/:id", alert.delete);

  // Create a new Tutorial
  router.delete("/", alert.deleteAll);

  app.use("/api/alert", router);
};
