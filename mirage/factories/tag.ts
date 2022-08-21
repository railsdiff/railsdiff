import { faker } from "@faker-js/faker";
import { Factory } from "miragejs";

import { TagType } from "../models/tag";

const TagFactory = Factory.extend<Partial<TagType>>({
  files: () => ({}),
  name: () => faker.internet.userName(),
});

export default TagFactory;
