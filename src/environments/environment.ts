/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrlLive: "http://203.99.177.250:8087/",
  baseUrlLocal: "http://192.168.15.3:8087/",
  baseUrlDebug: "http://localhost:1771/",
  baseUrl: "http://localhost:1771/",
};
