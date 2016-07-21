'use strict';

const express = require('express');

let app = express();

app.get('/api/v1/health', (req, res, next)=>{
  res.json({status: 'running'});
});

module.exports = app;
