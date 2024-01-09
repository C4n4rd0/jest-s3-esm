import { resolve } from "path";
import cwd from "cwd";
import S3rver from "s3rver";
import Debug from "debug";
import { promisify } from "util";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const debug = Debug("jest-s3:setup");

const defaultOptions = {
    port: 4569,
    address: "localhost",
    directory: ".",
};

module.exports = async function () {
    const config = require(resolve(cwd(), "jest-s3-config.js")),
        s3rverOptions = typeof config === "function" ? await config() : config,
        s3rver = new S3rver(Object.assign(defaultOptions, s3rverOptions)),
        runAsync = promisify(s3rver.run).bind(s3rver);

    await runAsync();

    // Set reference to s3rver in order to close the server during teardown.
    global.__S3D__ = s3rver;
};

// async function createBuckets(s3, buckets) {
//     return Promise.all(
//         buckets.map((bucket) => s3.createBucket({ Bucket: bucket }).promise())
//     );
// }
