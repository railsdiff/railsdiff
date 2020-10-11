import { setApplication } from "@ember/test-helpers";
import { start } from "ember-qunit";
import Application from "rails-diff/app";
import config from "rails-diff/config/environment";
import "qunit-dom";
import "./helpers/semantic-assertions";
import "./helpers/semantic-selectors";

setApplication(Application.create(config.APP));

start();
