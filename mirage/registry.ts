import { Registry } from "miragejs";

import BranchFactory from "./factories/branch";
import OwnerFactory from "./factories/owner";
import RepoFactory from "./factories/repo";
import BranchModel from "./models/branch";
import OwnerModel from "./models/owner";
import RepoModel from "./models/repo";

type AppRegistry = Registry<
  {
    branch: typeof BranchModel;
    owner: typeof OwnerModel;
    repo: typeof RepoModel;
  },
  {
    branch: typeof BranchFactory;
    owner: typeof OwnerFactory;
    repo: typeof RepoFactory;
  }
>;

export default AppRegistry;
