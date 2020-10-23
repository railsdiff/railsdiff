import { Registry } from "miragejs";

import OwnerFactory from "./factories/owner";
import RepoFactory from "./factories/repo";
import TagFactory from "./factories/tag";
import OwnerModel from "./models/owner";
import RepoModel from "./models/repo";
import TagModel from "./models/tag";

type AppRegistry = Registry<
  {
    owner: typeof OwnerModel;
    repo: typeof RepoModel;
    tag: typeof TagModel;
  },
  {
    owner: typeof OwnerFactory;
    repo: typeof RepoFactory;
    tag: typeof TagFactory;
  }
>;

export default AppRegistry;
