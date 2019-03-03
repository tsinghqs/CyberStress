// Import Express.js
var express = require('express');
// Import twitter client
var twitter = require('twitter');
// Import body-parser to get POST parameters
var bodyParser = require('body-parser');
// Import sentiment
var Sentiment = require('sentiment');
// Import config.json for API key
var config = require('./config.json');

var app = express();
var sentiment = new Sentiment();


    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');
  
    // Instantiates a client
    const client1 = new language.LanguageServiceClient();
  
    // The text to analyze
    var text = 'Hello, world!';
  
    

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var client = new twitter(config);

let tweets = [];
let scores = [];

app.post('/api/search', (req, res, next) => {
    var search = req.body.userInput;
    console.log('Search value: ' + search);
    client.get('search/tweets', {q: search}, (error, data, response) => {
        var t = data.statuses;
        // console.log(t);
        tweets = [];
        for (var i = 0; i < 9; i++) {
            var tweetObject = {
                user: t[i].user.name,
                text: t[i].text,
                score: Math.random() - Math.random()
            }
            tweets.push(tweetObject);
            // console.log(tweets);
        }
        // console.log('Current tweet value');
        // console.log(tweets);
        // console.log('just got response from twitter');
       // calculateSentiment(tweets);
        //for (let i = 0; i < 9; i++) {
            //tweets[i].score = scores[i];
        //}
        res.send('Search successful');
    });
});

app.get('/api/tweets', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify({data: 'Hello World'}));
    // console.log('sending tweets back to client');
    // console.log(tweets);
    res.send(tweets);
});

app.get('/api/avgScore', (req, res, next) => {
    console.log(calculateAvg(tweets))
    var scoreObject = {
        score: calculateAvg(tweets)
    };
    console.log('Average Score: ', scoreObject.score);
    res.send(scoreObject);
})

/**
 * Calculate the sentiment score for each tweet
 * 
 * @param {} tweets 
 */
function calculateSentiment(tweets) {


    //   console.log(element.text)
    tweets.forEach((element) => {
        const document = {
            content: element.text,
            type: 'PLAIN_TEXT',
          };
        client1
    .analyzeSentiment({document: document})
    .then(results => {
      const sentiment = results[0].documentSentiment;
      let x = parseFloat(sentiment.score);
    //   element = {score: x};
    //   scores.push(x);
      console.log("Score:" ,x);
    })
    .catch(err => {
        console.error('ERROR:', err);
      });
    });
    
        
        

}

/**
 * Calculate the average sentiment score
 * 
 * @param {} tweets 
 */
function calculateAvg(tweets) {
    var sum = 0;
    counter = 0;
    tweets.forEach((element) => {
        sum = sum + element.score;
        counter++;
    });
    var avg = sum / counter;
    console.log(avg);
    return avg;
}

console.log('Listening on port 8080');

// Run server on port 8080
app.listen(8080);
