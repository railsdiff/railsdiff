import { faker } from "@faker-js/faker";
import { Factory } from "miragejs";

import { OwnerType } from "../models/owner";

const OwnerFactory = Factory.extend<Partial<OwnerType>>({
  login: () => faker.internet.userName(),
});

export default OwnerFactory;
