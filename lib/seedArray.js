module.exports = function(model){
  function seedArray(callback) {
    var self = this;
    var modelName = self.adapter.identity.charAt(0).toUpperCase() + self.adapter.identity.slice(1);
    self.createEach(self.seedData).exec(function (err, results) {
      if (err) {
        sails.log.error(err);
        callback();
      } else {
        sails.log.debug(modelName + ' seed planted');
        callback();
      }
    });
  };
  
  model.seedArray = seedArray;
};
