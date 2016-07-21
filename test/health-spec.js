'use strict';

const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');

let should = chai.should();
let api = supertest(app);

describe('Sending a GET to /api/v1/health', ()=>{
  it('should result in a health object', (done)=>{
    api.get('/api/v1/health')
      .expect(200)
      .end((err, res)=>{
        if(err) return done(err);

        res.body.status.should.be.equal('running');

        done();
      });
  });
});
