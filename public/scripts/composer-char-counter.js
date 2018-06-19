

// makes sure DOM is fully loaded
$(document).ready(function() {
  $('.new-tweet textarea').keyup(function() {
    var $textarea = $(this);
    var charactersLeft = 140 - $textarea.val().length;
    $textarea.siblings(".counter").text(charactersLeft);
    if (charactersLeft < 0) {
      $textarea.siblings(".counter").css("color", "red");
    } else {
       $textarea.siblings(".counter").css("color", "black");
    }
  });
});

