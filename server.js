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
    
    function sendback(data) {
        res.send(data);
    }
    
    var message = req.query.userInput;    
    assistance(message, sendback);
    
//    res.send(message);
});

function assistance(message, sendback) {
    message = encodeURIComponent(message.trim());
    var headers = {
        'Authorization': 'Bearer 56bf6af2d8b842389fc4bc4775e56ff9'
    };

    var options = {
        url: 'https://api.api.ai/api/query?v=20150910&query=' + message + '&lang=en&sessionId=8b0a70e7-116d-4c61-8aa9-c914acee843c&timezone=2017-03-06T12:53:15+0530',
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var response = body;
            response = JSON.parse(response);
            console.log(response.result.parameters);
            sendback(response.result);

        }
    }
    request(options, callback);
    
}

var port=Number(process.env.PORT || 3001);
app.listen(port, function() {
    console.log('listening on port: *' + port);
});
