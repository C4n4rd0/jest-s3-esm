import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  globalSetup: resolve(__dirname, './setup.js'),
  globalTeardown: resolve(__dirname, './teardown.js')
};