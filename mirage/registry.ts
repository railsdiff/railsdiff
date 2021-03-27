import { Registry } from "miragejs";

import RepoFactory from "./factories/repo";
import TagFactory from "./factories/tag";
import RepoModel from "./models/repo";
import TagModel from "./models/tag";

type AppRegistry = Registry<
  {
    repo: typeof RepoModel;
    tag: typeof TagModel;
  },
  {
    repo: typeof RepoFactory;
    tag: typeof TagFactory;
  }
>;

export default AppRegistry;
