// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  let { date } = req.params;
  console.log('req.params.date:', date);
  // if param :date isn't provided assign now to date
  if (!date) {
    date = Date.now();
  }
  // if format is seconds since epoch convert type into number before constructing Date obj
  if (Number(date)) {
    date = Number(date);
  }
  // if date param is invalid
  if (isNaN(new Date(date))) {
    const response = { "error": "Invalid Date" };
    console.log('response:', response);
    console.log();
    res.json(response);
    return;
  }
  const unixDate = new Date(date).getTime();
  const utcDate = new Date(date).toUTCString();
  const response = { "unix": unixDate, "utc": utcDate };
  console.log('response:', response);
  console.log();
  res.json(response);
  return;
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port + '\n');
});
