sails = {
  log: {
    debug: function(text){
      return text;
    },
    error: function(text){

    }
  },
  seeds: {
    doc: []
  }
};

var seed       = require('../lib/seed'),
    seedArray  = require('../lib/seedArray'),
    seedObject =  require('../lib/seedObject');

model = {
  identity: 'data',
  createEach: function(){},
  exec: function(){},
  count: function(){},
  destroy: function(){},
  findOrCreate: function(){}
}

seed(model);
seedArray(model);
seedObject(model);

chai   = require('chai');
expect = chai.expect;
assert = chai.assert;
should = chai.should();
mocky  = require('sinon');
_      = require('lodash');
