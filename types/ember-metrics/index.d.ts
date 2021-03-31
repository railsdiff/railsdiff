import type Metrics from "ember-metrics/services/metrics";

declare module "@ember/service" {
  interface Registry {
    metrics: Metrics;
  }
}
