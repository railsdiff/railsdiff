import { Collection, Model, hasMany } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';

import { RepoType } from './repo';

export type OwnerType = {
  login: string;
  repos: Collection<RepoType>;
};

const OwnerModel: ModelDefinition<OwnerType> = Model.extend({
  repos: hasMany('repo'),
});

export default OwnerModel;
