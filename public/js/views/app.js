define(['backbone', 'underscore', 'jquery', 'collections/lists'], function(Backbone, _, $, Lists){

  var AppView = Backbone.View.extend ({

    initialize: function() {
      Lists.fetch({reset: 'true'});
      this.listenTo(Lists, 'reset', this.render);
    },

    render: function() {
      Lists.each(this.showList, this);
    },

    showList: function(list) {
      console.log(list.toJSON());
    }

  });

  return AppView;

});