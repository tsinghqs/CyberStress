# SentimentallyJS
Remake of our Sentimentally project from PatriotHacks 2018 except this time the backend is an Express application running on a Node.js server
(https://github.com/EdwardL89/Sentimentally)

Steps to run:

1. Install Node.js on your machine
2. Get an API key from Twitter and create a file called config.json in SentimentallyJS/

The structure for config.json should be

{  
  "consumer_key": "",  
  "consumer_secret": "",  
  "access_token_key": "",  
  "access_token_secret": ""  
}

3. Make sure you're in the path were app.js is located and run the commmand
node app

*If you're going to be editing app.js I highly recommend installing nodemon as this will automatically restart the node server everytime a change is
detected in app.js*

npm install -g nodemon  
nodemon app

4. app.js runs on port 8080, to get to the HTML page type in localhost:8080/profile.html
