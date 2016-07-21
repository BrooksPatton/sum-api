'use strict';

const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');

let should = chai.should();
let api = supertest(app);

describe('Sending a POST to /api/v1/sum', ()=>{
  describe('should succeed', ()=>{
    it('in adding two numbers together', (done)=>{
      api.post('/api/v1/sum')
        .send({
          type: 'addition',
          num1: 4,
          num2: 9
        })
        .expect(200)
        .end((err, res)=>{
          if(err) return done(err);
          
          res.body.result.should.be.equal(13);

          done();
        });
    });
  });
});
