import Debug from 'debug';
import { promisify } from "util";

const debug = Debug("jest-s3:teardown");

export default async function () {
    debug("Teardown s3rver");

    const closeAsync = promisify(global.__S3D__.close).bind(global.__S3D__);

    await closeAsync();
};
