var async  = require('async');
module.exports = function(cb){
  async.series(_(sails.models).toArray().filter(function (it){
    return !it.junctionTable;
  }).value().map(function(model){ 
    return model.seed;
  }), cb);
};

module.exports.seed = require('./lib/seed');
module.exports.seedArray = require('./lib/seedArray');
module.exports.seedObject = require('./lib/seedObject');
