var semver    = require('semver');
var path      = require('path');
var moduleDir = '../';
var homeDir   = '../../'
var requireDir= homeDir + moduleDir
var fs = require('fs');
var util = require('util');

fs.exists(homeDir + 'node_modules/sails', function(exists){
  if(exists){
    var sailsVersion = require(requireDir + 'node_modules/sails/package.json').version;
    createSeed(function(){
      if(semver.lt(sailsVersion, '0.11.0')) createHook(function(){});
    });
  } else {
    util.debug('You are not using a sails project. Please use a sails project.');
  }
})

function createSeed(cb){
  fs.exists(homeDir + 'config/seeds.js', function(exists){
    if(exists) {
      console.log('Seed file already exists.');
      cb();
    } else {
      generateSeed(cb);
    };

  });
}

function createHook(cb){
  fs.exists(homeDir + 'api/hooks', function(exists){
    if(exists){
      fs.exists(homeDir + 'api/hooks/seed', function(exists){
        if(exists){
          generateHook(cb);
        } else {
          generateHookDir(cb);
        }
      });
    } else {
      generateHooksDir(cb);
    }
  });
}

function generateSeed(cb){
  fs.readFile('./templates/configSeed.js', function(err, data){
    fs.writeFile(homeDir + 'config/seeds.js', data, function(err){
      console.log('Seed file was generated');
      cb();
    });
  });
}

function generateHook(cb){
  fs.exists(homeDir + 'api/hooks/seed/index.js', function(exists){
    if(exists){
      console.log('Hook file already exists');
      cb();
    } else {
      fs.readFile('./templates/userHook.js', function(err, data){
        fs.writeFile(homeDir + 'api/hooks/seed/index.js', data, function(err){
          console.log('Hook file was generated');
          cb();
        });
      });
    }
  });
}

function generateHookDir(cb){
  fs.mkdir(homeDir + '/api/hooks/seed', function(err){
    console.log('Seed Hook Dir File Generated');
    generateHook(cb);
  });
}

function generateHooksDir(cb){
  fs.mkdir(homeDir + '/api/hooks', function(err){
    console.log('Hooks dir generated');
    fs.exists(homeDir + 'api/hooks/seed', function(exists){
      if(exists){
        generateHook(cb);
      } else {
        generateHookDir(cb);
      }
    });
  });
}
