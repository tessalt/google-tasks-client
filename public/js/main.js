require.config({
  paths: {
    "jquery" : "vendor/jquery/jquery",
    "backbone" : "vendor/backbone-amd/backbone",
    "underscore" : "vendor/underscore-amd/underscore"
  }
});

require(['views/app'], function(AppView){
  new AppView();
});