module.exports = function (callback) {
  var self = this;
  var modelName = self.adapter.identity.charAt(0).toUpperCase() + self.adapter.identity.slice(1);
  self.create(self.seedData).exec(function (err, results) {
    if (err) {
      sails.log.debug(err);
      callback();
    } else {
      sails.log.debug(modelName + ' seed planted');
      callback();
    }
  });

};
