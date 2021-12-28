// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get(
    "/api/:date?",
    function (req, res) {
        let milliseconds = Number(req.params.date);
        let date;
        if (Number.isNaN(milliseconds)) {
            date = new Date(req.params.date);
        } else {
            date = new Date(milliseconds);
        }
        if (date.getTime()>0) {
            let dateInMilliSeconds = date.getTime();
            let dateInUTC = date.toUTCString();
            res.json({unix: dateInMilliSeconds, utc: dateInUTC});
        } else {
            if (req.params.date === undefined) {
                let currentDate = new Date();
                res.json({unix: currentDate.getTime(), utc: currentDate.toUTCString()});
            } else {
                res.json({error: "Invalid Date"});
            }
        }
    }
);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
