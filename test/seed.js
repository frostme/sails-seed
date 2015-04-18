require('./support');
var chai   = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();


describe('Sails Seed', function(){
  describe('seed', function(){
    beforeEach(function(done){
      model.count      = null;
      model.destroy    = null;
      module.create    = null;
      model.createEach = null;
      done();
    });
    describe('overwrite', function(){
      beforeEach(function(done){
        model.overwrite = true;
        done();
      });
      describe('there are models', function(){
        beforeEach(function(done){
          model.count   = function(){ return { exec: function(cb){ cb(null, 1); } }; };
          model.destroy = function(){ return { exec: function(cb){ cb(null); } }; };
          done();
        });
        it('should seed arrays', function(done){
          model.createEach  = function(options) {
            assert.typeOf(options, 'array', 'seed Data is an array');
            return {
              exec: function(cb){
                cb(null, []);
              }
            };
          };
          model.seedData = [
            {
              height: '68',
              weight: '185',
              eye_color: 'grey'
            }
          ];
          model.seed(function(){
            done();
          });
        });
        it('should seed an object', function(done){
          model.create = function(options) {
            assert.typeOf(options, 'object', 'seed Data is an object');
            return {
              exec: function(cb){
                cb(null, []);
              }
            };
          };
          model.seedData = {
            height: '68',
            weight: '185',
            eye_color: 'grey'
          };

          model.seed(function(){
            done();
          });
        });
      });
      describe('there are no models', function(){
        beforeEach(function(done){
          model.count = function(){ return { exec: function(cb){ cb(null, 0); } }; };
          model.destroy = null;
          done();
        });
        it('should seed arrays', function(done){
          model.createEach  = function(options) {
            assert.typeOf(options, 'array', 'seed Data is an array');
            return {
              exec: function(cb){
                cb(null, []);
              }
            };
          };
          model.seedData = [
            {
              height: '68',
              weight: '185',
              eye_color: 'grey'
            }
          ];

          model.seed(function(){
            done();
          });
        });
        it('should seed an object', function(done){
          model.create = function(options) {
            assert.typeOf(options, 'object', 'seed Data is an object');
            return {
              exec: function(cb){
                cb(null, []);
              }
            };
          };
          model.seedData = {
            height: '68',
            weight: '185',
            eye_color: 'grey'
          };

          model.seed(function(){
            done();
          });
        });
      });
    });
    describe('non overwrite', function(){
      beforeEach(function(done){
        model.overwrite = false;
        done();
      });
      describe('there are models', function(){
        beforeEach(function(done){
          model.count       = function(){ return { exec: function(cb){ cb(null, 1); } }; };
          model.destroy     = null;
          model.create      = null;
          module.createEach = null;
          done();
        });
        it('should not seed arrays', function(done){
          model.seedData = [
            {
              height: '68',
              weight: '185',
              eye_color: 'grey'
            }
          ];

          model.seed(function(){
            done();
          });
        });
        it('should not seed objects', function(done){
          model.seedData = {
            height: '68',
            weight: '185',
            eye_color: 'grey'
          };

          model.seed(function(){
            done();
          });
        });
      });
      describe('there are no models', function(){
        beforeEach(function(done){
          model.count = function(){ return { exec: function(cb){ cb(null, 0); } }; };
          model.destroy = null;
          done();
        });
        it('should seed arrays', function(){
          model.seedData = [
            {
              height: '68',
              weight: '185',
              eye_color: 'grey'
            }
          ];
        });
        it('should seed an object', function(){
          model.seedData = {
            height: '68',
            weight: '185',
            eye_color: 'grey'
          };
        });
      });
    });
  });
});
