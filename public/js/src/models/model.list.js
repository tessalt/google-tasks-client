define(['backbone'], function(Backbone){

  var List = Backbone.Model.extend ({
    initialize : function(){
      this.on("invalid",function(model,error){
        console.log(error);
      });
    },
    validate: function(attrs){
      if (attrs.title == "") {
        return "Title empty";
      }
    }
  });

  return List;

});