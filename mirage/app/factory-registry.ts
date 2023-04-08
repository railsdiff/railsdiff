import Owner from '../factories/owner';
import Repo from '../factories/repo';
import Tag from '../factories/tag';

export type FactoryRegistry = {
  owner: typeof Owner;
  repo: typeof Repo;
  tag: typeof Tag;
};
