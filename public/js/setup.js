require.config({
  paths: {
    'jquery' : 'vendor/jquery/jquery',
    'backbone' : 'vendor/backbone-amd/backbone',
    'underscore' : 'vendor/underscore-amd/underscore'
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

require(['src/views/view.app'], function(AppView){
  new AppView();
});