import { Registry as MirageRegistry } from 'miragejs';

import { FactoryRegistry } from './factory-registry';
import { ModelRegistry } from './model-registry';

type Registry = MirageRegistry<ModelRegistry, FactoryRegistry>;

export default Registry;
