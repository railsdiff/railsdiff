import { Model, hasMany } from "miragejs";

export default Model.extend({
  tags: hasMany("tag"),
});
