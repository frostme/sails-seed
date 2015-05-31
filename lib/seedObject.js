module.exports = function(model){
  function seedObject(callback) {
    var self = this;
    var modelName = self.identity.charAt(0).toUpperCase() + self.identity.slice(1);
    if(self.unique) {
      self.findOrCreate(_.pick(self.seedData, self.unique), self.seedData).exec(function(err, results){
        if (err) {
          sails.log.error(err);
          callback();
        } else {
          sails.log.debug(modelName + ' seed planted');
          callback();
        }
      });
    } else {
      self.create(self.seedData).exec(function (err, results) {
        if (err) {
          sails.log.error(err);
          callback();
        } else {
          sails.log.debug(modelName + ' seed planted');
          callback();
        }
      });
    }

  }

  model.seedObject = seedObject;
};
