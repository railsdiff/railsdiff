import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from 'ember-qunit';

export function setupApplicationTest(
  hooks: Parameters<typeof upstreamSetupApplicationTest>[0],
  options?: Parameters<typeof upstreamSetupApplicationTest>[1]
) {
  upstreamSetupApplicationTest(hooks, options);
  setupMirage(hooks);
}

export function setupRenderingTest(
  hooks: Parameters<typeof upstreamSetupRenderingTest>[0],
  options?: Parameters<typeof upstreamSetupRenderingTest>[1]
) {
  upstreamSetupRenderingTest(hooks, options);
}

export function setupTest(
  hooks: Parameters<typeof upstreamSetupTest>[0],
  options?: Parameters<typeof upstreamSetupTest>[1]
) {
  upstreamSetupTest(hooks, options);
}
