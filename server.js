// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}
let current = "http://api.openweathermap.org/data/2.5/weather";
let fiveday = "http://api.openweathermap.org/data/2.5/forecast";
let apiKey = "8d2ecc26cb7a1ad860f3228c755c1a65";
let lat  = 43.451567399999995;
let long = -83.66042039999999;

let currentUrl = current + "?lat=" + lat + "&lon=" + long + "&APPID=" + apiKey
let fivedayUrl = fiveday + "?lat=" + lat + "&lon=" + long + "&APPID=" + apiKey

var fs = require("fs");
var host = "127.0.0.1";
var port = 8001;
var express = require("express");
var path = require("path");
var fetch = require("node-fetch");
// var fetch = require('fetch');
var app = express();

app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("/", function(req, res){ //root dir
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

const Current = require('./public/js/models/current.js');
const FiveDay = require('./public/js/models/fiveday.js');

app.get('/fiveday', async function(req, res){
  let x = await fetch(fivedayUrl)
  let y = await x.json()
  let t = new FiveDay(y)
  res.send(t)
})

app.get('/current', async function (req, res){
  let x = await fetch(currentUrl)
  let y = await x.json()
  let t = new Current(y)
  res.send(t)
})


//TODO add a callback that checks if already listening on that port
app.listen(port, host, function (){
  console.log('Weather server running on port:'+port);
});
