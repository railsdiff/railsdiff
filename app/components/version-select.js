import Component from "ember-component";

export default Component.extend({
  change(event) {
    this.sendAction("didChange", event.target.value);
  },
  tagName: "select",
});
