import { Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import { FileMap } from 'rails-diff/helpers/compare';

export type TagType = {
  files: FileMap;
  name: string;
};

const TagModel: ModelDefinition<TagType> = Model.extend({});

export default TagModel;
