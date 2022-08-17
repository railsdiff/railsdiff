import Owner from "../models/owner";
import Repo from "../models/repo";
import Tag from "../models/tag";

export type ModelRegistry = {
  owner: typeof Owner;
  repo: typeof Repo;
  tag: typeof Tag;
};
