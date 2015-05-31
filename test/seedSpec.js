require('./support');

describe('Sails Seed', function(){
  var logSpy, errSpy;

  describe('seed', function(){
    beforeEach(function(done){
      logSpy = mocky.spy(sails.log, 'debug');
      errSpy = mocky.spy(sails.log, 'error');
      done();
    });
    afterEach(function(done){
      sails.log.debug.restore();
      sails.log.error.restore();
      done();
    });
    describe('no seed data', function(){
      it('should not see data', function(){
        model.seed(function(){
          expect(logSpy.calledWith('No data avaliable to seed Data')).be.true;
        });
      });
    });
    describe('unique', function(){
      beforeEach(function(done){
        model.unique = ['height', 'weight'];
        done();
      });

      afterEach(function(done){
        model.unique = null;
        done();
      });

      context('there are models', function(){
        beforeEach(function(done){
          model.count   = function(){ return { exec: function(cb){ cb(null, 1); } }; };
          done();
        });
        context('array', function(){
          beforeEach(function(done){
            model.seedData = [{
              height: '68',
              weight: '185',
              eye_color: 'grey'
            }];
            done();
          });
          context('find or createEach succeeds', function(){
            beforeEach(function(done){
              mocky.stub(model, 'findOrCreate').withArgs({ height: '68', weight: '185' }, model.seedData[0]).returnsThis();
              mocky.stub(model, 'exec', function(cb){
                return cb();
              });
              done();
            });

            afterEach(function(done){
              model.findOrCreate.restore();
              model.exec.restore();
              done();
            });
            
            it('should create model', function(done){
              model.seed(function(){
                expect(errSpy.called).to.be.false;
                done();
              });
            });
          });
          context('find or createEach fails', function(){
            beforeEach(function(done){
              mocky.stub(model, 'findOrCreate').withArgs({ height: '68', weight: '185' }, model.seedData[0]).returnsThis();
              mocky.stub(model, 'exec', function(cb){
                return cb(new Error('not in my house'));
              });
              done();
            });

            afterEach(function(done){
              model.findOrCreate.restore();
              model.exec.restore();
              done();
            });
            
            it('should return error', function(done){
              model.seed(function(){
                expect(errSpy.called).to.be.true;
                done();
              });
            });
          });
        });
        context('object', function(){
          beforeEach(function(done){
            model.seedData = {
              height: '68',
              weight: '185',
              eye_color: 'grey'
            };
            done();
          });
          context('findOrCreate succeeds', function(){
            beforeEach(function(done){
              mocky.stub(model, 'findOrCreate').withArgs({ height: '68', weight: '185' }, model.seedData).returnsThis();
              mocky.stub(model, 'exec', function(cb){
                return cb();
              });
              done();
            });

            afterEach(function(done){
              model.findOrCreate.restore();
              model.exec.restore();
              done();
            });
            
            it('should create model', function(done){
              model.seed(function(){
                expect(logSpy.calledWith('Data seed planted')).to.be.true;
                done();
              });
            });
          });
          context('findOrCreate fails', function(){
            beforeEach(function(done){
              mocky.stub(model, 'findOrCreate').withArgs({ height: '68', weight: '185' }, model.seedData).returnsThis();
              mocky.stub(model, 'exec', function(cb){
                return cb(new Error('not in my house'));
              });
              done();
            });

            afterEach(function(done){
              model.findOrCreate.restore();
              model.exec.restore();
              done();
            });
            
            it('should return error', function(done){
              model.seed(function(){
                expect(errSpy.called).to.be.true;
                done();
              });
            });
          });
        });
      });

      context('there are no models', function(){
        context('array', function(){
          context('createEach succeeds', function(){

          });
          context('createEach fails', function(){

          });
        });
        context('object', function(){
          context('createEach succeeds', function(){
          });
          context('createEach fails', function(){

          });
        });
      });
    });
    describe('overwrite', function(){
      beforeEach(function(done){
        model.overwrite = true;
        done();
      });
      afterEach(function(done){
        model.overwrite = null;
        done();
      });
      describe('there are models', function(){
        beforeEach(function(done){
          model.count   = function(){ return { exec: function(cb){ cb(null, 1); } }; };
          model.destroy = function(){ return { exec: function(cb){ cb(null); } }; };
          done();
        });
        context('seeding array', function(){
          beforeEach(function(done){
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
            done();
          });
          context('createEach succeeds', function(done){
            it('should seed arrays', function(done){
              model.seed(function(){
                expect(logSpy.calledWith('Data had models, overwriting data now')).to.be.true;
                expect(logSpy.calledWith('Data seed planted')).to.be.true;
                done();
              });
            });
          });
          context('createEach fails', function(){
            beforeEach(function(done){
              mocky.stub(model, 'createEach').returnsThis();
              mocky.stub(model, 'exec', function(cb){
                return cb(new Error("this is in unacceptable CONDITIONS!!!!"));
              });
              done();
            });

            afterEach(function(done){
              model.createEach.restore();
              model.exec.restore();
              done();
            });

            it('should return an error', function(done){
              model.seed(function(err){
                expect(errSpy.called).to.be.true;
                done();
              });
            });
          });
        });
        context('seed object', function(){
          beforeEach(function(done){
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
            done();
          });
          context('create fails', function(){
            beforeEach(function(done){
              mocky.stub(model, 'create').returnsThis();
              mocky.stub(model, 'exec', function(cb){
                return cb(new Error("this is in unacceptable CONDITIONS!!!!"));
              });
              done();
            });

            afterEach(function(done){
              model.create.restore();
              model.exec.restore();
              done();
            });

            it('should return an error', function(done){
              model.seed(function(err){
                expect(errSpy.called).to.be.true;
                done();
              });
            });
          });
          context('create succeeds', function(){
            it('should seed an object', function(done){
              model.seed(function(){
                expect(logSpy.calledWith('Data had models, overwriting data now')).to.be.true;
                expect(logSpy.calledWith('Data seed planted')).to.be.true;
                done();
              });
            });
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
            expect(logSpy.calledWith('Seeding Data...')).to.be.true;
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
            expect(logSpy.calledWith('Seeding Data...')).to.be.true;
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
