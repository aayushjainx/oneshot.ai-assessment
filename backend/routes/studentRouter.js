const express = require('express');
const Student = require('../models/student');
const studentRouter = express.Router();

studentRouter.get('/id/:sid', async (req, res) => {
  await Student.findById(req.params.sid, async (err, student) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(student);
    }
  });
});

studentRouter.get('/collegeid/:cid', async (req, res) => {
  var query = { college_id: req.params.cid };
  await Student.find(query, async (err, student) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(student);
    }
  });
});

module.exports = studentRouter;
