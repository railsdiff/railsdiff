import { Model, hasMany } from "miragejs";

export default Model.extend({
  branches: hasMany("branch"),
});
