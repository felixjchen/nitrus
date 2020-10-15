const production = process.env.production ? true : false;
let client_id = undefined;
let client_secret = undefined;
let redirect_uri = undefined;
let frontend_url = "http://localhost:3000";

console.log(`IS PRODUCTION = ${production}`);

if (production) {
  ({ client_id, client_secret, redirect_uri } = process.env);
  frontend_url = "https://nitrous.netlify.app/";
} else {
  ({ client_id, client_secret, redirect_uri } =
    require("./secrets.json") || undefined);
}

console.log(client_id, client_secret, redirect_uri);

export { production, client_id, client_secret, redirect_uri, frontend_url };
