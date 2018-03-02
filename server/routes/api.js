'use strict';

const express = require('express');
const router = express.Router();
const defaultTwitter = 'neymarjr';
let twit = require('twitter');

let secret = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}

let twitter = new twit(secret);

router.get('/tweets', function(req, res, next) {
  twitter.get('statuses/user_timeline',
    {screen_name: defaultTwitter, count : 30},
    function(error, tweets, response){
      if(!error){
        res.status(200).json({ tweets });
      } else{
        res.status(500).json({ error });
        console.log(error);
      }
    }
  );
});

module.exports = router;