sails = {
  log: {
    debug: function(text){
      return text;
    }
  }
};

model = {
  seed: require('../lib/seed'),
  seedArray: require('../lib/seedArray'),
  seedObject: require('../lib/seedObject'),
  adapter: {
    identity: 'data'
  }
}
