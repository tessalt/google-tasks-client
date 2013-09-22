define(['backbone', 'underscore', 'jquery', 'collections/lists', 'views/list'], function(Backbone, _, $, Lists, ListView){

  var AppView = Backbone.View.extend ({

    el: "#lists",

    initialize: function() {
      Lists.fetch({reset: 'true'});
      this.listenTo(Lists, 'reset', this.render);
      this.listenTo(Lists, 'add', this.render);
    },

    render: function() {
      Lists.each(this.showList, this);
    },

    showList: function(list) {
      var view = new ListView({model: list});
      this.$el.append(view.render().el);
    },

  });

  return AppView;

});