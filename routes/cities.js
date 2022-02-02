var express = require('express');
var router = express.Router();
const db = require("../model/helper");

router.get('/', async function(req, res) {
    await db(`SELECT * FROM cities_weather`)
    .then(results => {
      console.log("cities", results)
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
