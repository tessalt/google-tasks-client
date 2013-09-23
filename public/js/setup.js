require.config({
  paths: {
    'jquery' : 'vendor/jquery/jquery',
    'backbone' : 'vendor/backbone-amd/backbone',
    'underscore' : 'vendor/underscore-amd/underscore',
    'appview'    : 'src/views/view.app',
    'listview'   : 'src/views/view.list',
    'taskview'   : 'src/views/view.task',
    'listcollection' : 'src/collections/collection.lists',
    'taskcollection' : 'src/collections/collection.tasks',
    'listmodel' : 'src/models/model.list',
    'taskmodel' : 'src/models/model.task'
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