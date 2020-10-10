import faker from "faker";
import { Factory } from "miragejs";

export default Factory.extend({
  login: () => faker.internet.userName(),
});
