import * as express from "express";
import * as querystring from "querystring";

import { getAccessAndRefresh, getAccess } from "../lib/spotify-authorization";
import { getProfile } from "../lib/spotify-helpers";
import { client_id, redirect_uri, frontend_url, room } from "../global";

const router = express.Router();

const refresh = async (id: string, refresh_token: string) => {
  let { access_token, expires_in } = await getAccess(refresh_token);

  room.users[id].access_token = access_token;
  room.users[id].refreshTimeout = setTimeout(
    () => refresh(id, refresh_token),
    (expires_in - 2) * 1000
  );

  console.log(`Refreshed acces_token for user ${room.users[id].display_name}`);
};

router.get("/", async (req, res) => {
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
    let {
      access_token,
      refresh_token,
      error,
      expires_in,
    } = await getAccessAndRefresh(req.query.code);
    if (error == "invalid_grant") {
      res.redirect(redirect_uri);
    } else {
      let profile = await getProfile(access_token);
      // profile.profileUrl = profile.images[0].url;
      profile.access_token = access_token;
      room.users[profile.id] = profile;
      room.users[profile.id].refreshTimeout = setTimeout(
        () => refresh(profile.id, refresh_token),
        (expires_in - 2) * 1000
      );
      console.log(`User ${profile.display_name} has authenticated`);
      res.redirect(
        `${frontend_url}?${querystring.stringify({ id: profile.id })}`
      );
    }
  }
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

export { router };
