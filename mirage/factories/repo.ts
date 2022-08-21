import { faker } from "@faker-js/faker";
import { Factory } from "miragejs";

import { RepoType } from "../models/repo";

const RepoFactory = Factory.extend<Partial<RepoType>>({
  name: () => faker.internet.userName(),
});

export default RepoFactory;
