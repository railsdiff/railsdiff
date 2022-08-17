import { Server as MirageServer } from "miragejs";

import AppRegistry from "./registry";

export default class Server extends MirageServer<AppRegistry> {}
