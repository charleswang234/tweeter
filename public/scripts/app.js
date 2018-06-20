/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweetObject) {
  let $tweet = $("<article>").addClass("tweet"); // the article
  let $header = $("<header>"); // footer element
  let $footer = $("<footer>"); // header element

  $tweet.append($header); // append header to article
  $tweet.append($("<p>").text(tweetObject.content.text)); // add the tweet content
  $tweet.append($footer); // append footer to article

  $header.append($("<img>" ).addClass("tweet").attr("src", tweetObject.user.avatars.small)); // adds profile pic
  $header.append($("<h2>" + tweetObject.user.name + "</h2>")); // Username
  $header.append($("<p>").text(tweetObject.user.handle).addClass("add-person")); // the @ sign

  $footer.append($("<p>").text(tweetObject["created_at"])); // the date
  // add all the icons to the footer
  $footer.append($("<i>").addClass("fa fa-flag"));
  $footer.append($("<i>").addClass("fa fa-heart"));
  $footer.append($("<i>").addClass("fa fa-retweet"));
  return $tweet;
}


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.



$(document).ready(function() {

});

