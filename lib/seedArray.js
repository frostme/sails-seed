var async = require('async');
module.exports = function(model){
  function seedArray(callback) {
    var self = this;
    var modelName = self.identity.charAt(0).toUpperCase() + self.identity.slice(1);
    if(self.unique) {
      async.each(self.seedData, function(v, cb){
        self.findOrCreate(_.pick(v, self.unique), v).exec(function(err, results){
          if (err) {
            sails.log.error(err);
            cb();
          } else {
            cb();
          }
        });
      }, function(err){
        sails.log.debug(modelName + ' seed planted');
        callback();
      });
    } else {
      self.createEach(self.seedData).exec(function (err, results) {
        if (err) {
          sails.log.error(err);
          callback();
        } else {
          sails.log.debug(modelName + ' seed planted');
          callback();
        }
      });
    }
  };
  
  model.seedArray = seedArray;
};
