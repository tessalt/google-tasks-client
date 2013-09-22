require.config({
  paths: {
    'jquery'        : '../vendor/jquery/jquery',
    'underscore'    : '../vendor/underscore-amd/underscore',
    'backbone'      : '../vendor/backbone-amd/backbone',
    'mocha'         : '../vendor/mocha/mocha',
    'chai'          : '../vendor/chai/chai',
    'appview'       : '../src/views/view.app',
    'listview'      : '../src/views/view.list',
    'listcollection' : '../src/collections/collection.lists',
    'listmodel'     : '../src/models/model.list'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'jquery': {
      exports: '$'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  },
});

require(['require', 'chai', 'mocha', 'jquery'], function(require, chai){

  // Chai
  var should = chai.should();
  /*globals mocha */
  mocha.setup('bdd');

  require([
    'specs/spec',
  ], function(require) {
    mocha.run();
  });

});