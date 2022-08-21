import { Collection, Model, hasMany } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

import { TagType } from "./tag";

export type RepoType = {
  tags: Collection<TagType>;
  name: string;
};

const RepoModel: ModelDefinition<RepoType> = Model.extend({
  tags: hasMany("tag"),
});

export default RepoModel;
