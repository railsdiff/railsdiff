// Type definitions for semantic-dom-selectors 0.0.9
// Project: https://github.com/tradegecko/semantic-dom-selectors
// Definitions by: Dray Lacy <https://github.com/omghax>

declare module "semantic-dom-selectors" {
  export function findButton(labelText: string): Element | undefined;
  export function findButtons(labelText: string): Element[];
  export function findControl(labelText: string): Element | undefined;
  export function findControls(labelText: string): Element[];
  export function findObject(
    selector: string,
    labelText: string,
    type: string
  ): Element | undefined;
  export function findObjects(
    selector: string,
    labelText: string,
    type: string
  ): Element[];

  export const findByAria: {
    key: string;
    run(selector: string, labelText: string): Element[];
  };

  export function findByLabel(selector: string, text: string): Element[] | null;
  export function findByName(selector: string, text: string): Element[];

  export function configure(configuration: any): void;
  export const config: any;

  export function notify(
    rule: string,
    type?: string,
    labelText?: string,
    generateMessage?: (humanizedType: string, labelText: string) => string
  ): void;

  export const buttonQuery: string;
  export const formControlQuery: string;
  export const selectQuery: string;
  export const textQuery: string;
  export const toggleQuery: string;

  export const types: {
    button: string[];
    select: string[];
    text: string[];
    toggle: string[];
  };
}
