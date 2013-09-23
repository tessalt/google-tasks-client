define(['backbone', 'listcollection', 'listview'], function(Backbone, Lists, ListView){

  var AppView = Backbone.View.extend ({

    el: '#lists',

    events: {
      'click .create-list' : 'newList'
    },

    initialize: function() {
      this.$create = this.$el.find('.create-list-title');
      Lists.fetch({reset: 'true'});
      this.listenTo(Lists, 'reset', this.addAll);
      this.listenTo(Lists, 'add', this.addOne);
    },

    addAll: function() {
      this.$el.find('ul').html('');
      Lists.each(this.addOne, this);
    },

    addOne: function(list){
      var view = new ListView({model: list});
      this.$el.find('ul').append(view.render().el);
    },

    newList: function(e) {
      var attribute = this.$create.val().trim();
      if (attribute.length > 0) {
        Lists.create({title: attribute});
        this.$create.val('');
      }
    }

  });

  return AppView;

});