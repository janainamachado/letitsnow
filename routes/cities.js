var express = require('express');
var router = express.Router();
const db = require("../model/helper");

router.get('/', function(req, res) {
  console.log("bateu?")
  db("SELECT * FROM cities_weather")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
