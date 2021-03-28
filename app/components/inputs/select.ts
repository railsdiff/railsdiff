import { action } from "@ember/object";
import Component from "@glimmer/component";

interface Args {
  onChange: (value: unknown) => void;
  value: unknown;
}

export default class InputsSelectComponent extends Component<Args> {
  @action
  onChange(event: Event) {
    this.args.onChange((event.currentTarget as HTMLSelectElement).value);
  }
}
