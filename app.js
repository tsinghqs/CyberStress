var express = require('express');
var twitter = require('twitter');
var bodyParser = require('body-parser');
var Sentiment = require('sentiment');
var config = require('./config.json');

var app = express();
var sentiment = new Sentiment();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var client = new twitter(config);

var car = {color: 'red"n"blue', door: 4, sunroof: true, price: 30000};
var tweets = [];

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
                score: 0
            }
            tweets.push(tweetObject);
            // console.log(tweets);
        }
        // console.log('Current tweet value');
        // console.log(tweets);
        // console.log('just got response from twitter');
        calculateSentiment(tweets);
        res.send('Search successful');
    });
});

app.get('/api/tweets', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify({data: 'Hello World'}));
    console.log('sending tweets back to client');
    // console.log(tweets);
    res.send(tweets);
});

app.get('/api/avgScore', (req, res, next) => {
    var scoreObject = {
        score: calculateAvg(tweets)
    };
    res.send(scoreObject);
})

function calculateSentiment(tweets) {
    tweets.forEach((element) => {
        var result = sentiment.analyze(element.text);
        element.score = result.score;
    });
}

function calculateAvg(tweets) {
    var sum = 0;
    counter = 0;
    tweets.forEach((element) => {
        sum = sum + element.score;
        counter++;
    });
    var avg = sum / counter;
    return avg;
}

console.log('Listening on port 8080');

app.listen(8080);