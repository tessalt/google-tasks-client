var assert = require("assert"),
    request = require('request');
    chai = require('chai');

process.env.NODE_ENV = "test";

chai.should();

describe('GET /lists', function() {
  return it('should return the list', function(done) {
    return request.get('http://127.0.0.1:1234/lists', function(err, res, body) {
      res.statusCode.should.equal(200);
      return done();
    });
  });
});