import { faker } from "@faker-js/faker";
import { Factory } from "miragejs";
import { FileMap } from "rails-diff/helpers/compare";

export default Factory.extend({
  files: (): FileMap => ({}),
  name: (): string => faker.internet.userName(),
});
