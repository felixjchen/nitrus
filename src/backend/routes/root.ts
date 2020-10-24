import * as express from "express";
import * as querystring from "querystring";
import * as path from "path";

import { getAccessAndRefresh, getAccess } from "../lib/spotify-authorization";
import { getProfile } from "../lib/spotify-helpers";
import {
  client_id,
  redirect_uri,
  room,
  frontend_url,
  production,
} from "../global";

const rootRouter = express.Router();

const refresh = async (id: string, refresh_token: string) => {
  let { access_token, expires_in } = await getAccess(refresh_token);

  room.users[id].access_token = access_token;
  room.users[id].refreshTimeout = setTimeout(
    () => refresh(id, refresh_token),
    (expires_in - 2) * 1000
  );

  console.log(`Refreshed acces_token for user ${room.users[id].display_name}`);
};

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

      if (profile.images[0].url) {
        profile.profileUrl = profile.images[0].url;
      }

      profile.access_token = access_token;
      room.users[profile.id] = profile;
      room.users[profile.id].refreshTimeout = setTimeout(
        () => refresh(profile.id, refresh_token),
        (expires_in - 2) * 1000
      );
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
