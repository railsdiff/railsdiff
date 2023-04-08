import Component from '@glimmer/component';

interface InputsSelectOptionSignature {
  Args: {
    Named: {
      currentValue: unknown;
      label: string;
      value: string;
    };
  };
}

export default class InputsSelectOptionComponent extends Component<InputsSelectOptionSignature> {
  get isSelected(): boolean {
    return this.args.currentValue === this.args.value;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Inputs::Select::Option': typeof InputsSelectOptionComponent;
    'inputs/select/option': typeof InputsSelectOptionComponent;
  }
}
