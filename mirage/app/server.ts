import { Server as MirageServer } from 'miragejs';

import Registry from './registry';

export default class Server extends MirageServer<Registry> {}
