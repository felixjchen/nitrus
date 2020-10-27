import * as express from "express";
import * as querystring from "querystring";
import * as path from "path";

import { getAccessAndRefresh } from "../lib/spotify-authorization";
import { getProfile } from "../lib/spotify-helpers";
import {
  client_id,
  redirect_uri,
  room,
  frontend_url,
  production,
} from "../global";

const rootRouter = express.Router();

rootRouter.get("/", async (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../build/index.html`));
});

rootRouter.get("/login", async (req, res) => {
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
      let profile = await getProfile(access_token);
      profile.access_token = access_token;
      profile.refresh_token = refresh_token;
      if (profile.images[0].url) {
        profile.profileImageURL = profile.images[0].url;
      }

      console.log(frontend_url, production);

      room.users[profile.id] = profile;
      console.log(`User ${profile.display_name} has authenticated`);

      if (production) {
        res.redirect(`/?${querystring.stringify({ spotifyID: profile.id })}`);
      } else {
        res.redirect(
          `${frontend_url}?${querystring.stringify({ spotifyID: profile.id })}`
        );
      }
    }
  }
});

export { rootRouter };
