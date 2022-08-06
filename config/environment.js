"use strict";

function isTruthy(value) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return ["true", "1"].includes(value.toLowerCase());
  }

  return false;
}

module.exports = function (environment) {
  const isDevelopment = environment === "development";
  const isProduction = environment === "production";
  const isTest = environment === "test";

  const {
    FILE_URL = "",
    GA_MEASUREMENT_ID = "",
    REPOSITORY = "railsdiff/rails-new-output",
    MIRAGE_ENABLED = true,
    MIRAGE_SCENARIO = "sample",
  } = {
    ...process.env,
  };

  const ENV = {
    APP: {
      FILE_URL,
      REPOSITORY,
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },
    environment,
    locationType: "history",
    modulePrefix: "rails-diff",
    rootURL: "/",
  };

  if (GA_MEASUREMENT_ID) {
    Object.assign(ENV, {
      metricsAdapters: [
        {
          config: {
            anonymizeIp: true,
            id: GA_MEASUREMENT_ID,
            sendHitTask: isProduction,
            trace: isDevelopment,
          },
          name: "GoogleAnalytics",
        },
      ],
    });
  }

  if (isDevelopment) {
    Object.assign(ENV, {
      MIRAGE_SCENARIO,
      "ember-cli-mirage": {
        enabled: isTruthy(MIRAGE_ENABLED),
      },
    });
  }

  if (isTest) {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;

    ENV.APP.FILE_URL = "";
  }

  if (isProduction) {
    // here you can enable a production-specific feature
  }

  return ENV;
};
