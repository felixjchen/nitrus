import * as fetch from "../node_modules/node-fetch";
import * as secrets from "../secrets.json";
const { client_id, client_secret, redirect_uri } = secrets;

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

  let response = await fetch(
    "https://accounts.spotify.com/api/token",
    requestOptions
  );
  return JSON.parse(await response.text());
};

export { getAccessAndRefresh };
