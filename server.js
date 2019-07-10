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
app.get('/login', (req, res) => {
  let userAuth = req.data;
  console.log(userAuth);
});
app.get('/feeds', (req, res) => {
  let jsonFeeds = fs.readFileSync('./static/feeds.json');
  let feeds = JSON.parse(jsonFeeds);
  res.send(feeds);
});

//Server listen
app.listen(PORT, console.log(`Server started on port ${PORT}`));
