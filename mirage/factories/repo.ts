import faker from "faker";
import { Factory } from "miragejs";

export default Factory.extend({
  name: () => `${faker.internet.userName()}/${faker.internet.userName()}`,
});
