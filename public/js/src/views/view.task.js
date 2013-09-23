define(['backbone', 'taskcollection'], function(Backbone, TaskCollection){

  var TaskView = Backbone.View.extend({

    tagName: 'li',

    template: _.template($("#task-template").html()),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return TaskView;

});