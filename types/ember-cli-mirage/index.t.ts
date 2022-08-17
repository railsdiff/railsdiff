import { Server } from "miragejs";

import AppRegistry from "../../mirage/app/registry";

declare global {
  const server: Server<AppRegistry>;
}
