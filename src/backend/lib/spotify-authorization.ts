import * as fetch from "../node_modules/node-fetch";
import { client_id, client_secret, redirect_uri } from "./global";

const getAccessAndRefresh = async (code: string) => {
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

const getAccess = async (refresh_token: string) => {
  let raw = {
    grant_type: "refresh_token",
    refresh_token,
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
export { getAccess, getAccessAndRefresh };
