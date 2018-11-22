const chokidar = require("chokidar");
const upload = require("./upload");

const argv = require("yargs")
    .boolean("ptr").alias("ptr", "p")
    .string("branch").alias("branch", "b").default("branch", "default")
    .argv;

let watcher = chokidar.watch(upload.src);
watcher.add(upload.extraFiles);

watcher.on("change", file => {
    console.log(`${file} changed.`)
    upload.upload(upload.src, argv.branch, upload.extraFiles, argv.ptr);
});
