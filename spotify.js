const fetch = require("node-fetch");

const cid = "37647f33e70444dbb1c57863e099938d";
const sacret = "c42f8d838f164d91892ba77d9a7595f1";
const buff = new Buffer.from(cid + ":" + sacret);
const base64 = buff.toString("base64");

const url = "https://accounts.spotify.com/api/token";
const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: "Basic " + base64
};

const body = {
  grant_type: "client_credentials"
};

const method = "POST";
console.log(headers);
const searchParams = Object.keys(body)
  .map(key => {
    return encodeURIComponent(key) + "=" + encodeURIComponent(body[key]);
  })
  .join("&");
console.log(base64);
fetch(`https://accounts.spotify.com/api/token`, {
  method,
  headers,
  body: searchParams
})
  .then(r => r.json())
  .then(console.log);
