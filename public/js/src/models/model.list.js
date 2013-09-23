define(['backbone', 'taskcollection'], function(Backbone, Tasks){

  var List = Backbone.Model.extend ({
    initialize : function(){
      this.on("invalid",function(model,error){
        console.log(error);
      });
      this.tasks =  new Tasks;
      this.tasks.url = '/lists/' + this.id + '/tasks';
    },
    validate: function(attrs){
      if (attrs.title == "") {
        return "Title empty";
      }
    }
  });

  return List;

});