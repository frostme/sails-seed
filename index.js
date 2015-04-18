var async  = require('async');
var _      = require('lodash');
module.exports = function(cb){
  async.series(_(sails.models).toArray().filter(function (it){
    return !it.junctionTable;
  }).map(function(model){ 
    return model.seed;
  }), cb);
};

module.exports.seed = require('./lib/seed');
module.exports.seedArray = require('./lib/seedArray');
module.exports.seedObject = require('./lib/seedObject');
