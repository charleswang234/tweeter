

// makes sure DOM is fully loaded
$(document).ready(function() {
  $('.new-tweet textarea').keyup(function() {
    var $textarea = $(this);
    var charactersLeft = 140 - $textarea.val().length
    console.log(charactersLeft);

    // console.log($textarea.parent());
    console.log($textarea.next().children('.counter').html(charactersLeft));
  });
});

