const fs = require("fs");
const path = require("path");
const https = require("https");
const terser = require("terser");
const auth = require("./.screeps.js");

const src = "./src";

let data = {
    branch: "default",
    modules: {}
};

console.log("Minifying...")
fs.readdirSync(src).forEach(file => {
    let contents = fs.readFileSync(path.join(src, file), { encoding: "utf8" });
    console.log(`  ${file}`);
    let result = terser.minify(contents);
    if (result.error) { throw result.error; }
    data.modules[path.basename(file, ".js")] = result.code;
});

console.log("Uploading...");
let req = https.request({
    hostname: "screeps.com",
    port: 443,
    path: "/api/user/code",
    method: "POST",
    auth: auth.email + ":" + auth.password,
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
});
req.write(JSON.stringify(data));
req.end();
