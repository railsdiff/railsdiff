import { helper } from 'ember-helper';

export function eq(params) {
  return params[0] === params[1];
}

export default helper(eq);
