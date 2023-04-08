import Patch from './patch';

export default class Comparison {
  constructor(
    readonly sourceVersion: string,
    readonly targetVersion: string,
    readonly patch: Patch
  ) {}
}
