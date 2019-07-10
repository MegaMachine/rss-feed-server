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
app.get('/feeds', (req, res) => {
  let jsonFeeds = fs.readFileSync('./static/feeds.json');
  let feeds = JSON.parse(jsonFeeds);
  res.send(feeds);
});
app.delete('/feeds', (req, res) => {
  let deleteFeed = req.body;
  let jsonFeeds = fs.readFileSync('./static/feeds.json');
  let feeds = JSON.parse(jsonFeeds);
  console.log(deleteFeed);
  // for(let key in feeds){
  //   console.log(feeds[key].name , deleteFeed.name);
  //   if(feeds[key].user === deleteFeed.user && feeds[key].title === deleteFeed.title){
  //     // feeds.splice(key,1);
  //     console.log(key);
  //   }
  // }
  // res.send(feeds);
  // let afterDelete = JSON.stringify(feeds);
  // fs.writeFileSync('./static/feeds.json', afterDelete);
});

app.put('/feeds', (req, res) => {
  let newFeed = req.body;
  let jsonFeeds = fs.readFileSync('./static/feeds.json');
  let feeds = JSON.parse(jsonFeeds);
  feeds.push(newFeed);
  res.send(feeds)
  let afterAdd = JSON.stringify(feeds);
  fs.writeFileSync('./static/feeds.json', afterAdd);
});

//Server listen
app.listen(PORT, console.log(`Server started on port ${PORT}`));
