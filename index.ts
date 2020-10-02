const Express = require("express");
const Fetch = require("node-fetch");

const app = Express();
const port = 3000;

let { client_id, client_secret } = require("./secrets.json");

var redirect_uri = "http://localhost:3000/";

app.get("/login", function (req, res) {
  var scopes = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      client_id +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(redirect_uri)
  );
});

app.get("/", (req, res) => {
  var raw = {
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri: "http://localhost:3000/",
    client_id,
    client_secret,
  };

  var urlencoded = new URLSearchParams();
  for (let k in raw) {
    urlencoded.append(k, raw[k]);
  }

  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: urlencoded,
    redirect: "follow",
  };

  Fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  res.send("hi");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
