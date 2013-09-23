define(['listmodel', 'listcollection'], function(ListModel, ListCollection){

  describe('List Model', function() {

    it('should be a function', function(done) {
      (ListModel).should.be.a('function');
      done();
    });

    it('should create a new model', function(done){
      var testList = new ListModel({title: "Test List"});
      testList.get('title').should.equal("Test List");
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
      ListCollection.should.be.a('object');
      done();
    });

    it('should have at least one model', function(done){
      ListCollection.models.length.should.be.at.least(1);
      done();
    });

  });

});