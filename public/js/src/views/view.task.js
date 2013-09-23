define(['backbone', 'taskcollection'], function(Backbone, TaskCollection){

  var TaskView = Backbone.View.extend({

    tagName: 'li',

    template: _.template($("#task-template").html()),

    events: {
      'click .destroy-task' : 'destroy'
    },

    initialize: function() {
      this.render();
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    destroy: function() {
      this.model.destroy();
    }

  });

  return TaskView;

});