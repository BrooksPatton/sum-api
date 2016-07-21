'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const marked = require('marked');
const fs = require('fs');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res, next)=>{
  fs.readFile('README.md', 'utf8', (err, data)=>{
    if(err) return next(err);

    res.send(marked(data));
  });
});

app.get('/api/v1/health', (req, res, next)=>{
  res.json({status: 'running'});
});

app.post('/api/v1/sum', (req, res, next)=>{
  if(!req.body.type) {
    return res.status(400).json({
      status: 400,
      code: 1,
      error: 'bad payload',
      message: 'The payload was incorrect. Pleas verify that you are sending the correct looking object and try again.'
    });
  }
  else if(req.body.type !== 'addition') {
    return res.status(400).json({
      status: 400,
      code: 2,
      error: 'bad type',
      message: 'The type requested is not allowed. Please check the documentation for what types you can use.'
    });
  }
  else if(!req.body.num1 || !req.body.num2) {
    return res.status(400).json({
      status: 400,
      code: 3,
      error: 'sums missing',
      message: 'Both sums to be added together must be in the payload.'
    });
  }
  else if(typeof(req.body.num1) !== 'number' || typeof(req.body.num2) !== 'number') {
    return res.status(400).json({
      status: 400,
      code: 4,
      error: 'sums not numbers',
      message: 'Both sums to be added together must be numbers.'
    });
  }

  next();
});

app.post('/api/v1/sum', (req, res, next)=>{

  let sum = req.body.num1 + req.body.num2;

  res.json({result: sum});
});

app.use('/api/v1/sum', (req, res, next)=>{
  res.sendStatus(405);
});

module.exports = app;
