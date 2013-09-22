define(['backbone'], function(Backbone){

  var ListView = Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#list-template').html()),

     events: {
      'click .destroy' : 'destroy',
      'click .update' : 'update'
    },

    initialize: function(){
      this.render();
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'change', this.render);
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
    }

  });

  return ListView;

});