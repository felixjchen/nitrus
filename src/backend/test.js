const Express = require("express");
const Fetch = require("node-fetch");

const app = Express();
const port = 80;

let { client_id, client_secret } = require("./secrets.json");
let redirect_uri = "http://localhost";

const getAccessAndRefresh = async (code) => {
  let raw = {
    grant_type: "authorization_code",
    redirect_uri,
    code,
    client_id,
    client_secret,
  };
  let urlencoded = new URLSearchParams();
  for (let k in raw) {
    urlencoded.append(k, raw[k]);
  }
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: urlencoded,
    redirect: "follow",
  };

  let response = await Fetch(
    "https://accounts.spotify.com/api/token",
    requestOptions
  );
  return JSON.parse(await response.text());
};

const getProfile = async (access_token) => {
  let requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    redirect: "follow",
  };
  let response = await Fetch("https://api.spotify.com/v1/me", requestOptions);
  return JSON.parse(await response.text());
};

app.get("/", async (req, res) => {
  if (req.query.code == null) {
    // Authenticate
    let scopes = "user-read-email user-modify-playback-state";
    res.redirect(
      "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        client_id +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(redirect_uri)
    );
  } else {
    // Has authenticated
    let { access_token, refresh_token, error } = await getAccessAndRefresh(
      req.query.code
    );

    if (error == "invalid_grant") {
      res.redirect(redirect_uri);
    } else {
      // console.log(access_token, refresh_token);
      let { display_name } = await getProfile(access_token);

      res.send(`Hello ${display_name}`);
    }
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
