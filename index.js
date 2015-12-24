'use strict';

//dependencies
var async  = require('async'),
    path   = require('path'),
    libPath = path.join(__dirname, 'lib');

// model extras
var seed = require(path.join(libPath, 'seed')),
    seedArray = require(path.join(libPath, 'seedArray')),
    seedObject = require(path.join(libPath, 'seedObject'));

module.exports = function(sails){
  return {
    initialize: function(done){
      // first
      //
      // patch model to acquire seed data attribute
      sails
        .after(['hook:moduleloader:loaded'], function(){
          patchAttributes();
        });

      //later on wait for this/these event(s)
      //to apply methods to models
      var eventsToWaitFor = [];

      //wait for orm
      //and pub sub hooks
      //to be loaded
      //for methods to
      //be attached to models
      if(sails.hooks.orm) eventsToWaitFor.push('hook:orm:loaded');
      if(sails.hooks.pubsub) eventsToWaitFor.push('hook:pubsub:loaded');

      sails
        .after(eventsToWaitFor, function(){
          //bind additional methods
          //to models
          //then seed models
          //and let sails continue

          patch();
          seeds(done);
        });
    }
  };
};

function seeds(callback){
  if(sails.config.seeds.disable){
    callback()
  } else {
    async.eachSeries(Object.keys(sails.models), function(model, cb){
      if(sails.models[model].seed && !sails.config.seeds[model].active === false){
        sails.models[model].seed(cb);
      } else {
        cb();
      }
    }, function(err){
      if(err) sails.log.error('Your seeds were not planted correctly');
      else sails.log.info('Your seeds are ready to grow!');
      callback();
    });
  }
};
function patch(){
  _(sails.models)
    .forEach(function(model){
      if(model.globalId){
        seed(model);
        seedArray(model);
        seedObject(model);
      }
    });
}

function patchAttributes(){
  _(sails.models)
    .forEach(function(model){
      var data = sails.config.seeds[model.identity];
      if(data){
        var extend = {};
        if(_.some([data.overwrite, data.unique], _.isDefined)){
          extend.seedData = data.data ? data.data : [];
          extend.overwrite = data.overwrite;
          extend.unique    = data.unique;
        } else {
          extend.seedData = data;
          extend.overwrite = false;
        }

        _.extend(model, extend);

      } else {
        _.extend(model, {
          seedData: null
        });
      }
    });
}
