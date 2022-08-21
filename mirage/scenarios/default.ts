import { camelize } from "@ember/string";
import ENV from "rails-diff/config/environment";

import sample from "./sample";
import Scenario from "./scenario";

export const scenarios: Record<string, Scenario> = {
  sample,
};

const scenario: Scenario = (server) => {
  const scenario =
    scenarios[
      camelize(
        localStorage.getItem("MIRAGE_SCENARIO") ||
          ENV.MIRAGE_SCENARIO ||
          "sample"
      )
    ];

  if (scenario) {
    scenario(server);
  }
};

export default scenario;
