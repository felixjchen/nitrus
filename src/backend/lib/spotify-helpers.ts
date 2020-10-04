import * as fetch from "../node_modules/node-fetch";

const getProfile = async (access_token) => {
  let requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    redirect: "follow",
  };
  let response = await fetch("https://api.spotify.com/v1/me", requestOptions);
  return JSON.parse(await response.text());
};

export { getProfile };
