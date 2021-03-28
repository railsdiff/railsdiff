"use strict";

function isTruthy(value) {
  return ["true", "1"].includes(value.toString().toLowerCase());
}

module.exports = function (environment) {
  const isDevelopment = environment === "development";
  const isProduction = environment === "production";
  const isTest = environment === "test";

  const {
    API_URL = "",
    FILE_URL = "",
    REPOSITORY = "railsdiff/rails-new-output",
    MIRAGE_ENABLED = true,
    MIRAGE_SCENARIO = "sample",
  } = {
    ...process.env,
  };

  const ENV = {
    APP: {
      API_URL,
      FILE_URL,
      REPOSITORY,
    },
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },
    environment,
    locationType: "auto",
    modulePrefix: "rails-diff",
    rootURL: "/",
  };

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

    ENV.APP.API_URL = "";
    ENV.APP.FILE_URL = "";
  }

  if (isProduction) {
    // here you can enable a production-specific feature
  }

  return ENV;
};
