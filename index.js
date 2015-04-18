var async  = require('async');
module.exports = function(models,cb){
  async.series(models.map(function(model){ return model.seed }), cb);
};

module.exports.seed = require('./lib/seed');
module.exports.seedArray = require('./lib/seedArray');
module.exports.seedObject = require('./lib/seedObject');
