const production = process.env.production ? true : false;
console.log(`IS PRODUCTION = ${production}`);

let frontend_url = "http://localhost:3000";
let client_id = undefined;
let client_secret = undefined;
let redirect_uri = undefined;

if (production) {
  ({ client_id, client_secret, redirect_uri } = process.env);
  frontend_url = "https://nitrus.azurewebsites.net";
} else {
  ({ client_id, client_secret, redirect_uri } =
    require("../secrets.json") || undefined);
}

let room = { queue: [], users: {} };

export {
  production,
  client_id,
  client_secret,
  redirect_uri,
  frontend_url,
  room,
};
