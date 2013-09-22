define(['backbone', 'underscore', 'jquery'], function(backbone, _, $){

  var ListView = Backbone.View.extend({
    template: _.template($("#list-template").html()),

     events: {
      "click .destroy" : "destroy"
    },

    initialize: function(){
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    destroy: function() {
      this.model.destroy({
        success: function(model, response){
          console.log(response);
        },
        error: function(model, response){
          console.log(response);
        }
      });
    }

  });

  return ListView;

});