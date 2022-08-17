import { Registry } from "miragejs";

import { FactoryRegistry } from "./factory-registry";
import { ModelRegistry } from "./model-registry";

type AppRegistry = Registry<ModelRegistry, FactoryRegistry>;

export default AppRegistry;
