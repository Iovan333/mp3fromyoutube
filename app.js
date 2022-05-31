import "dotenv/config";
import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("convert");
});

app.post("/", async (req, res) => {
  const videoId = req.body.id;

  const fetchApi = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,{
    "method": "GET",
    "headers": {
      "X-RapidAPI-Host": process.env.API_HOST,
      "X-RapidAPI-Key": process.env.API_KEY,
    }
  });

  let fetchResponse = await fetchApi.json()

  if (fetchResponse.status === 'ok') {
    res.render("convert", {success: true, song_title : fetchResponse.title, song_link : fetchResponse.link})
  } else {
    res.render("convert", {success: false, message : fetchResponse.msg})
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server is running on port 3000");
});
