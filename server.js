var express = require('express');
var app = express();
var request = require('request');

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
    res.send('hello there');
});

app.get('/ping', function(req, res) {
    res.send('pong');
});

app.get('/message', function(req, res) {
    
    var message = req.query.userInput;
    
    
    function callback(data) {
        res.send(data);
    }
    
    assistance(message, callback);
    
//    res.send(message);
});

function assistance(message, callback) {
    message = encodeURIComponent(message.trim());
    callback(message);
}

var port=Number(process.env.PORT || 3001);
app.listen(port, function() {
    console.log('listening on port: *' + port);
});
