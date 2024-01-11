// var Sentiment = require('sentiment');
import Sentiment from "sentiment"
var sentiment = new Sentiment();
var result = sentiment.analyze('good product, cost effective 👍🏼👍🏼');
console.dir(result);    // Score: -2, Comparative: -0.666