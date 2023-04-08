import { action } from '@ember/object';
import Component from '@glimmer/component';
import { WithBoundArgs } from '@glint/template';

import InputsSelectOptionComponent from './select/option';

interface InputsSelectSignature {
  Args: {
    Named: {
      onChange: (value: unknown) => void;
      value: unknown;
    };
  };
  Blocks: {
    default: [
      {
        option: WithBoundArgs<
          typeof InputsSelectOptionComponent,
          'currentValue' | 'label' | 'value'
        >;
      }
    ];
  };
  Element: HTMLSelectElement;
}

export default class InputsSelectComponent extends Component<InputsSelectSignature> {
  @action
  onChange(event: Event): void {
    this.args.onChange((event.currentTarget as HTMLSelectElement).value);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Inputs::Select': typeof InputsSelectComponent;
  }
}
