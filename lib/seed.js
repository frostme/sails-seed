module.exports = function (callback) {
  console.log('also made it here');
  var self = this;
  var modelName = self.adapter.identity.charAt(0).toUpperCase() + self.adapter.identity.slice(1);
  if (!self.seedData) {
    sails.log.debug('No data avaliable to seed ' + modelName);
    callback();
    return;
  }
  self.count().exec(function (err, count) {
    if (!err && count === 0) {
      sails.log.debug('Seeding ' + modelName + '...');
      if (self.seedData instanceof Array) {
        self.seedArray(callback);
      }else{
        self.seedObject(callback);
      }
    } else {
      sails.log.debug(modelName + ' had models, so no seed needed');
      callback();
    }
  });
};

