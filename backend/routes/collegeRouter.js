const express = require('express');
const College = require('../models/college');
const collegeRouter = express.Router();

collegeRouter.get('/all', async (req, res) => {
  await College.find({}, async (err, college) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(college);
    }
  });
});

collegeRouter.get('/id/:cid', async (req, res) => {
  await College.findById(req.params.cid, async (err, college) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(college);
    }
  });
});

collegeRouter.get('/statescount', async (req, res) => {
  await College.find({}, (err, colleges) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      statemap = {};
      for (var i = 0; i < colleges.length; i++) {
        if (statemap.hasOwnProperty(colleges[i].state)) {
          statemap[colleges[i].state]++;
        } else {
          statemap[colleges[i].state] = 1;
        }
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(statemap);
    }
  });
});

collegeRouter.get('/coursescount', async (req, res) => {
  await College.find({}, (err, colleges) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      coursemap = {};
      for (var i = 0; i < colleges.length; i++) {
        for (var j = 0; j < colleges[i].courses.length; j++) {
          if (coursemap.hasOwnProperty(colleges[i].courses[j])) {
            coursemap[colleges[i].courses[j]]++;
          } else {
            coursemap[colleges[i].courses[j]] = 1;
          }
        }
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(coursemap);
    }
  });
});

collegeRouter.get('/similarColleges/:cid', async (req, res) => {
  await College.findById(req.params.cid, async (err, college) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      var query = {
        _id: { $ne: college._id },
        courses: { $in: college.courses },
        $or: [{ city: college.city }, { state: college.state }],
      };
      await College.find(query, async (err, similarCollege) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
        } else {
          if (similarCollege.length === 0) {
            res.statusCode = 200;
            res.send('No similar Colleges found');
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(similarCollege);
          }
        }
      });
    }
  });
});

collegeRouter.get('/state/:state', async (req, res) => {
  var query = { state: req.params.state };
  await College.find(query, async (err, college) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(college);
    }
  });
});

collegeRouter.get('/course/:course', async (req, res) => {
  var query = { courses: { $in: req.params.course } };
  await College.find(query, async (err, college) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(college);
    }
  });
});

module.exports = collegeRouter;
