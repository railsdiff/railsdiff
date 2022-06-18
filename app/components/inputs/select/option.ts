import Component from "@glimmer/component";

interface InputsSelectOptionSignature {
  Args: {
    currentValue: unknown;
    label: string;
    value: unknown;
  };
}

export default class InputsSelectOptionComponent extends Component<InputsSelectOptionSignature> {
  get isSelected(): boolean {
    return this.args.currentValue === this.args.value;
  }
}
