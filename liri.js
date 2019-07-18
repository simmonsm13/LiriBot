const dotenv = require("dotenv").config();
var Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const keys = require("./keys.js");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = keys.omdb.api_key;

const command = process.argv[2];
const secondCommand = process.argv[3];

switch (command) {
  case "my-tweets":
    getTweets();
    break;
  case "spotify-this-song":
    if (secondCommand) {
      spotifyThisSong(secondCommand);
    } else {
      spotifyThisSong("Dreams and Nightmares");
    }
    break;
  case "movie-this":
    if (secondCommand) {
      omdb(secondCommand);
    } else {
      omdb("The Da Vinci Code");
    }
    break;
  default:
    console.log("Try Again!");
}

function getTweets() {
  client.get("statuses/home_timeline", function(error, tweets, response) {
    if (error) throw error;
    console.log("--------------------------");

    const tweets_parsed = tweets.map(word => word.text);
    tweets_parsed.forEach(function(element) {
      console.log(element);
    });
  });
}

function spotifyThisSong(song) {
  spotify.search({
    type: 'track',
    query: song,
    limit: 1
  },
  function(error, data) {
    if(!error) {
      for(var i = 0; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items[i];
        console.log("Artist: " songData.artists[0].name);
        console.log("Song: " songData.name);
        console.log("Preview URL: " songData.preview_url);
        console.log("Album: " songData.album.name);
        console.log("---------------------------");
      }
    } else {
      console.log('Error');
    }
  });
}

function omdb(movie) {
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';
      
        request(omdbURL, function (error, response, body){
          if(!error && response.statusCode == 200){
            var mov = JSON.parse(mov);
      
            console.log("Title: " + mov.Title);
            console.log("Release Year: " + mov.Year);
            console.log("IMdB Rating: " + mov.imdbRating);
            console.log("Country: " + mov.Country);
            console.log("Language: " + mov.Language);
            console.log("Plot: " + mov.Plot);
            console.log("Actors: " + mov.Actors);
            console.log("Rotten Tomatoes Rating: " + mov.tomatoRating);
            console.log("Rotten Tomatoes URL: " + mov.tomatoURL);
            
          } else {
            console.log('Error')
          }

          if (movie === "The Da Vinci Code") {
            console.log("-------------------");
            console.log("The Da Vinci Code is one of the wildest and most interesting movies I have ever seen!");
            console.log("https://www.imdb.com/title/tt0382625/");
            console.log("Watch it on Netflix before they take it down!");
          }
        });
      }
    function doSomething() {
      fs.readFile('random.txt', 'utf8', function(error, data) {
        var txt = data.split(',');

        spotifyThisSong(txt[1]);
      });
    }
