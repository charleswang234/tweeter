/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from tweets.json
const data = [
{
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
},
{
  "user": {
    "name": "Descartes",
    "avatars": {
      "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
      "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
      "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
    },
    "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
  ];


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


function createTweetElement(tweetObject) {
  let $tweet = $("<article>").addClass("tweet"); // the article
  let $header = $("<header>"); // footer element
  let $footer = $("<footer>"); // header element

  $tweet.append($header); // append header to article
  $tweet.append($("<p>").addClass("tweet-text").text(tweetObject.content.text)); // add the tweet content
  $tweet.append($footer); // append footer to article

  $header.append($("<img>" ).addClass("profile-pic").attr("src", tweetObject.user.avatars.small)); // adds profile pic
  $header.append($("<h2>" + tweetObject.user.name + "</h2>")); // Username
  $header.append($("<p>").addClass("at-person").text(tweetObject.user.handle)); // the @ sign

  $footer.append($("<p>").addClass("date-stamp").text(tweetObject["created_at"])); // the date

  // add all the icons to the footer
  $footer.append($("<i>").addClass("fa fa-flag"));
  $footer.append($("<i>").addClass("fa fa-heart"));
  $footer.append($("<i>").addClass("fa fa-retweet"));
  return $tweet;
}


function renderTweets(arrayOfTweets) {
  for (let i = 0; i < arrayOfTweets.length; ++i) {
    let $tweet = createTweetElement(arrayOfTweets[i]);
    $('#tweets-container').append($tweet); //append is costly, change later when have time
  }
}


$(document).ready(function() {
  renderTweets(data);

  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();  // prevents form submission
    $.ajax({
      method: 'POST',  // http request
      url: '/tweets/',
      data: $(this).serialize() // turns form data into query string
    }).done(function () {
    });
  });

});

