'use strict';

const chai = require('chai');

let should = chai.should();

describe('Canary test: ', ()=>{
  it('five should be five', ()=>{
    let five = 5;
    five.should.be.equal(5);
  });
});
