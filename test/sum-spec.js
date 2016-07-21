'use strict';

const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');

let should = chai.should();
let api = supertest(app);

describe('Sending a POST to /api/v1/sum', ()=>{
  describe('should fail', ()=>{
    it('when not passed an object', (done)=>{
      api.post('/api/v1/sum')
        .send()
        .expect(400)
        .end((err, res)=>{
          if(err) return done(err);

          res.body.status.should.be.equal(400);
          res.body.code.should.be.equal(1);
          res.body.error.should.be.equal('bad payload');
          res.body.message.should.be.equal('The payload was incorrect. Pleas verify that you are sending the correct looking object and try again.');

          done();
        });
    });

    it('when the type is not "addition"', (done)=>{
      api.post('/api/v1/sum')
        .send({
          type: 'subtraction',
          num1: 1,
          num2: 4
        })
        .expect(400)
        .end((err, res)=>{
          if(err) return done(err);

          res.body.status.should.be.equal(400);
          res.body.code.should.be.equal(2);
          res.body.error.should.be.equal('bad type');
          res.body.message.should.be.equal('The type requested is not allowed. Please check the documentation for what types you can use.');

          done();
        });
    });

    it('when either of the sums are missing', (done)=>{
      api.post('/api/v1/sum')
        .send({
          type: 'addition',
          num1: 1
        })
        .expect(400)
        .end((err, res)=>{
          if(err) return done(err);

          res.body.status.should.be.equal(400);
          res.body.code.should.be.equal(3);
          res.body.error.should.be.equal('sums missing');
          res.body.message.should.be.equal('Both sums to be added together must be in the payload.');

          done();
        });
    });

    it('when either of the sums are not numbers', (done)=>{
      api.post('/api/v1/sum')
        .send({
          type: 'addition',
          num1: 1,
          num2: '3'
        })
        .expect(400)
        .end((err, res)=>{
          if(err) return done(err);

          res.body.status.should.be.equal(400);
          res.body.code.should.be.equal(4);
          res.body.error.should.be.equal('sums not numbers');
          res.body.message.should.be.equal('Both sums to be added together must be numbers.');

          done();
        });
    });
  });

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

describe('Sending a GET to /api/v1/sum', ()=>{
  describe('should fail', ()=>{
    it('as that method is not allowed', (done)=>{
      api.get('/api/v1/sum')
      .expect(405, done);
    });
  });
});

describe('Sending a PUT to /api/v1/sum', ()=>{
  describe('should fail', ()=>{
    it('as that method is not allowed', (done)=>{
      api.put('/api/v1/sum')
      .expect(405, done);
    });
  });
});

describe('Sending a PATCH to /api/v1/sum', ()=>{
  describe('should fail', ()=>{
    it('as that method is not allowed', (done)=>{
      api.patch('/api/v1/sum')
      .expect(405, done);
    });
  });
});

describe('Sending a DELETE to /api/v1/sum', ()=>{
  describe('should fail', ()=>{
    it('as that method is not allowed', (done)=>{
      api.del('/api/v1/sum')
      .expect(405, done);
    });
  });
});
