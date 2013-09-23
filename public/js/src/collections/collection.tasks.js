define(['backbone', 'taskmodel'], function(Backbone, TaskModel){

  var Tasks = Backbone.Collection.extend({
    model: TaskModel,
    parse: function(data) {
      return data.items;
    }
  });

  return Tasks;

});