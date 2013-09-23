define(['chai', 'listmodel', 'listcollection'], function(chai, ListModel, ListCollection){

  var expect = chai.expect;

  describe('List Model', function() {

    it('should be a function', function(done) {
      expect(ListModel).to.be.a('function');
      done();
    });

    it('should create a new model', function(done){
      var testList = new ListModel({title: 'Test List'});
      expect(testList.get('title')).to.equal('Test List');
      done();
    });

  });

  describe('List Collection', function() {

    beforeEach(function(done){
      var testModel = new ListModel();
      ListCollection.fetch().always(function(){
        done();
      });
    });

    it('should be an object', function(done){
      expect(ListCollection).to.be.a('object');
      done();
    });

    it('should have at least one model', function(done){
      expect(ListCollection.length).to.be.at.least(1);
      done();
    });

    it('should accept new models', function(done){
      ListCollection.create({title: 'Collections Test', id: 99});
      expect(ListCollection.get(99).get('title')).to.equal('Collections Test');
      ListCollection.get(99).destroy();
      done();
    });

    it('should destroy models', function(done){
      ListCollection.create({title: 'Collections Test Destroy', id: 100});
      ListCollection.get(100).destroy();
      var newList = ListCollection.get(100);
      expect(newList).to.be.undefined;
      done();
    });

    it('should update models', function(done){
      ListCollection.create({title: 'To edit', id: 101});
      var newList = ListCollection.get(101);
      newList.save({title: 'Edited'}).always(function(){
        expect(newList.get('title')).to.equal('Edited');
      });
      newList.destroy();
      done();
    });

  });

});