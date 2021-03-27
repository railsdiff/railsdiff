import faker from "faker";
import { Factory } from "miragejs";

export type FileMap = Record<string, string>;

export default Factory.extend({
  files: (): FileMap => ({}),
  name: (): string => faker.internet.userName(),
});
