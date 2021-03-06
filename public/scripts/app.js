/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// creates a single tweet jquery object
 function createTweetElement(tweetObject) {
  let $tweet = $("<article>").addClass("tweet"); // the article
  let $header = $("<header>"); // footer element
  let $footer = $("<footer>"); // header element

  $tweet.append($header); // append header to article
  $tweet.append($("<p>").addClass("tweet-text").text(tweetObject.content.text)); // add the tweet content
  $tweet.append($footer); // append footer to article

  $header.append($("<img>" ).addClass("profile-pic").attr("src", tweetObject.user.avatars.small)); // adds profile pic
  $header.append($("<h2>" + tweetObject.user.name + "</h2>")); // Username
  $header.append($("<p>").addClass("handle").text(tweetObject.user.handle)); // the @ sign

  $footer.append($("<p>").addClass("date-stamp").text(moment(tweetObject["created_at"]).fromNow())); // the date

  // add all the icons to the footer
  $footer.append($("<i>").addClass("fa fa-flag"));
  $footer.append($("<i>").addClass("fa fa-heart"));
  $footer.append($("<i>").addClass("fa fa-retweet"));

  return $tweet;
}

// appends all tweets to the tweet's container
function renderTweets(arrayOfTweets) {
  $('#tweets-container').empty();
  for (let i = 0; i < arrayOfTweets.length; ++i) {
    let $tweet = createTweetElement(arrayOfTweets[i]);
    $('#tweets-container').prepend($tweet); //append is costly, change later when have time
  }
}


// makes sure dom is fully loaded
$(document).ready(function() {

  $('.container .new-tweet').hide(); // hides the new tweets form
  loadTweets();

  // get request to get all the tweets using ajax a
  function loadTweets () {
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (jsonTweets) {
          renderTweets(jsonTweets);
        }
      });
  };

  // toggles the new tweets form
  $('.buttons .compose').on('click',function(event) {
    $('.container .new-tweet').slideToggle("slow"); //slides and toggles
    $('.container .new-tweet textarea').select(); // auto select the textarea
  });

  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();  // prevents form submission
    let numberCharacters = $('.new-tweet textarea').val().length;
      if (!numberCharacters) { // if no characters are entered
        alert("You have not entered anything.");
        return;
      } else if (numberCharacters > 140) { // if number of characters is exceeded
        alert("You have entered past the maximum characters!");
        return;
      }
      $.ajax({
      method: 'POST',  // http request
      url: '/tweets/',
      data: $(this).serialize() // turns form data into query string
    }).done(function (tweet) {
      $('.new-tweet textarea').val("");
      loadTweets();
    });
  });

});

