var deriv = require("../lib/main.js");
var chai = require("chai");
var chaiStats = require('chai-stats');

chai.use(chaiStats);
var expect = chai.expect;

describe("deriv", function(){

  it("is a callable function", function(){
    expect(deriv).to.be.a("function");
  });

  it("evaluates derivatives correclty", function(){
    expect(deriv(function(x){return x*x}, 4, 0.1).res).to.be.almost.equal(8);
    expect(deriv(function(x){return 3*Math.pow(x, 3) + 2*x*x + 8*x + 7}, 2, 0.1).res).to.be.almost.equal(52);
  });

  it("stores result and absolute error", function(){
    expect(deriv(function(x){return x*x}, 4, 0.1)).to.have.property('res');
    expect(deriv(function(x){return x*x}, 4, 0.1)).to.have.property('err');
  });

  it("works with both central and forward method", function(){
    expect(deriv(function(x){return x*x}, 4, 0.1,"forward").res).to.be.almost.equal(8);
    expect(deriv(function(x){return x*x}, 4, 0.1,"central").res).to.be.almost.equal(8);
  });
});
