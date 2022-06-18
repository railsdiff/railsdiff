import { action } from "@ember/object";
import Component from "@glimmer/component";

interface InputsSelectSignature {
  Args: {
    onChange: (value: unknown) => void;
    value: unknown;
  };
}

export default class InputsSelectComponent extends Component<InputsSelectSignature> {
  @action
  onChange(event: Event): void {
    this.args.onChange((event.currentTarget as HTMLSelectElement).value);
  }
}
