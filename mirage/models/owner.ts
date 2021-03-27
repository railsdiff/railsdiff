import { Model, hasMany } from "miragejs";

export default Model.extend({
  repos: hasMany("repo"),
});
