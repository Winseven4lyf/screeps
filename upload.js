const fs = require("fs");
const path = require("path");
const https = require("https");
const terser = require("terser");
const auth = require("./.screeps.js");

const argv = require("yargs")
    .boolean("ptr").alias("ptr", "p")
    .string("branch").alias("branch", "b").default("branch", "default")
    .argv;

const src = "./src";

let data = {
    branch: argv.branch,
    modules: {}
};
let apiPath = "/api/user/code";
if (argv.ptr) { apiPath = `/ptr${apiPath}`; }

console.log("Minifying...");
fs.readdirSync(src).forEach(file => {
    let contents = fs.readFileSync(path.join(src, file), { encoding: "utf8" });
    let result = terser.minify(contents);
    if (result.error) { throw result.error; }
    console.log(` + ${file}`);
    data.modules[path.basename(file, ".js")] = result.code;
});

console.log("Uploading...");
let req = https.request({
    hostname: "screeps.com",
    port: 443,
    path: apiPath,
    method: "POST",
    auth: auth.email + ":" + auth.password,
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
}, res => {
    res.on("data", d => {
        let parsed = JSON.parse(d.toString());
        if (parsed.error) {
            console.error(`Error: ${parsed.error}`);
        } else if (parsed.ok) {
            console.log(`Uploaded successfully.`);
        }
    });
});
req.write(JSON.stringify(data));
req.end();
