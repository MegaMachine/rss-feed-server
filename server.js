const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Create Server
const PORT = process.env.PORT || 5000;
const app = express();

// Use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

//Routes
app.post('/login', (req, res) => {
  let userAuth = req.body;
  if(userAuth.user === 'test@test.com' && userAuth.password === '123123123'){
    res.send(true);
  } else {
    res.send(false);
  }
});

//Feeds
app.get('/feeds', (req, res) => {
  let jsonFeeds = fs.readFileSync('./static/feeds.json');
  let feeds = JSON.parse(jsonFeeds);
  res.send(feeds);
});

app.put('/feeds', (req, res) => {
  console.log(req.body)
  let newFeeds = req.body;
  let feeds = JSON.stringify(newFeeds);
  fs.writeFileSync('./static/feeds.json', feeds);
});

//Server listen
app.listen(PORT, console.log(`Server started on port ${PORT}`));
