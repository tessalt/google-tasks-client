define(['backbone', 'taskcollection', 'taskview'], function(Backbone, TaskCollection, TaskView){

  var ListView = Backbone.View.extend({

    tagName: 'p',

    template: _.template($('#list-template').html()),

     events: {
      'click .destroy' : 'destroy',
      'click .update' : 'update',
      'click .create-task' : 'newTask'
    },

    initialize: function(){
      this.render();
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model.tasks, 'add', this.addOneTask);
      this.listenTo(this.model.tasks, 'reset', this.addAllTasks);
      this.model.tasks.fetch({reset: 'true'});
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    destroy: function() {
      this.model.destroy();
    },

    update: function() {
      var inputValue = this.$el.find('input').val().trim();
      if (inputValue) {
        this.model.save({ title: inputValue });
      }
    },

    addAllTasks: function() {
      this.model.tasks.each(this.addOneTask, this);
    },

    addOneTask: function(task) {
      var view = new TaskView({model: task});
      this.$el.find('ul').append(view.render().el);
    },

    newTask: function() {
      var attribute = this.$el.find('.create-task-title').val().trim();
      this.model.tasks.create({title: attribute});
    }

  });

  return ListView;

});