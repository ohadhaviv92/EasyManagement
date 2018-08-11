const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");

const app = express();
const vapidKeys = webpush.generateVAPIDKeys();


app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

webpush.setVapidDetails(
  "mailto:test@test.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.get("/getKey", (req, res) => {
  
  res.send(vapidKeys.publicKey);
});
// Subscribe Route
app.post("/notify", (req, res) => {
  // Get pushSubscription object
  const subscription = JSON.parse(req.body.token);


  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({title: req.body.title , body: req.body.msg});

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5001;

app.listen(port);
