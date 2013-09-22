define(['backbone', 'underscore', 'jquery'], function(backbone, _, $){

  var ListView = Backbone.View.extend({
    template: _.template("<h2><%= title %></h2><p><%= updated %></p>"),
    initialize: function(){
      this.render();
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return ListView;

});