const config = require("./config");
const flock = require("flockos");
const express = require("express");
const store = require("./store");

flock.appId = config.appId;
flock.appSecret = config.appSecret;
const app = express();
app.use(flock.events.tokenVerifier);
app.post("/events", flock.events.listener);

app.listen(3000, () => {
  console.log("app listening on 3000");
});
flock.events.on("app.install", function (event, callback) {
  store.saveToken(event.userId, event.token);
  callback();
});

flock.events.on("client.slashCommand", function (event, callback) {
  setTimer(event);
  callback(null, { text: "Meme Started" });
});

function setTimer(event) {
  const date = new Date();
  let hours = date.getHours();
  const timegap = Math.abs(7 - hours);
   const loop = Math.floor(timegap / 2);
  let ms = 0;
  for (let i = 0; i < loop; i++) {
    setTimeout(() => {
      sendMessage(event);
    }, ms);
    ms = ms + 3600000
  }
}

function sendMessage(event) {
  flock.chat.sendMessage(config.botToken, {
    to: event.chat,
    onBehalfOf: event.userId,
    text: "",
    attachments: [
      {
        title: "Thak gaye honge kam karte karte",
        description: "",
        views: {
          image: {
            original: {
              src: "https://i.imgflip.com/751npl.jpg",
              width: 400,
              height: 400,
            },
          },
        },
      },
    ],
  });
}
