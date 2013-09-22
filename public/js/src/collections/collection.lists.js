define(['backbone', 'src/models/model.list'], function(Backbone, ListModel){

  var Lists = Backbone.Collection.extend ({
    model: ListModel,
    url: '/lists',
    parse: function(data){
      return data.items;
    }
  });

  return new Lists;

});