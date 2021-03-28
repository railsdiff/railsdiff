import Component from "@glimmer/component";

interface Args {
  currentValue: unknown;
  label: string;
  value: unknown;
}

export default class InputsSelectOptionComponent extends Component<Args> {
  get isSelected() {
    return this.args.currentValue === this.args.value;
  }
}
