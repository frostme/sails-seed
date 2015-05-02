sails = {
  log: {
    debug: function(text){
      return text;
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
  identity: 'data'
}

seed(model);
seedArray(model);
seedObject(model);
