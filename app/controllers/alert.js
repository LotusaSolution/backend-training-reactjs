const db = require("../models");
const Alert = db.alert;

// Create and Save a new Alert
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Alert
  const alert = new Alert({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Alert in the database
  alert
    .save(alert)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Alert."
      });
    });
};

// Retrieve all Alerts from the database.
exports.findAll = (req, res) => {
  const query = req.query;
  var condition = {};
  Object.keys(query).forEach(param => {
    condition[param] = { $regex: new RegExp(query[param]), $options: "i" }
  })

  Alert.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving alerts."
      });
    });
};

// Find a single Alert with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Alert.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Alert with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Alert with id=" + id });
    });
};

// Update a Alert by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Alert.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Alert with id=${id}. Maybe Alert was not found!`
        });
      } else res.send({ message: "Alert was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Alert with id=" + id
      });
    });
};

// Delete a Alert with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Alert.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Alert with id=${id}. Maybe Alert was not found!`
        });
      } else {
        res.send({
          message: "Alert was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Alert with id=" + id
      });
    });
};

// Delete all Alerts from the database.
exports.deleteAll = (req, res) => {
  Alert.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Alerts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all alerts."
      });
    });
};

// Find all published Alerts
exports.findAllPublished = (req, res) => {
  Alert.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving alerts."
      });
    });
};
