require.config({
  paths: {
    'jquery' : 'vendor/jquery/jquery',
    'backbone' : 'vendor/backbone-amd/backbone',
    'underscore' : 'vendor/underscore-amd/underscore',
    'appview'    : 'src/views/view.app',
    'listview'   : 'src/views/view.list',
    'listcollection' : 'src/collections/collection.lists',
    'listmodel' : 'src/models/model.list'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});

require(['appview'], function(AppView){
  new AppView();
});