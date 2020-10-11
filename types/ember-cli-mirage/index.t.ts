import { Server } from "miragejs";

import AppRegistry from "../../mirage/registry";

declare global {
  const server: Server<AppRegistry>;
}
