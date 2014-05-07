window.addEventListener('polymer-ready', function(e) {
  var ajax = document.querySelector('polymer-ajax');

  // Respond to events it fires.
  ajax.addEventListener('polymer-response', function(e) {
    console.log(this.response);
  });

  ajax.go(); // Call its API methods.
});