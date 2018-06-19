

// makes sure DOM is fully loaded
$(document).ready(function() {
  $('.new-tweet textarea').keyup(function() {
    var multipleValues = 140 - $(".new-tweet textarea").val().length;
    console.log(multipleValues);
  });
});

