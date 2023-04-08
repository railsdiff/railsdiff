import ApplicationController from './application';

export default class IndexController extends ApplicationController {}

declare module '@ember/controller' {
  interface Registry {
    index: IndexController;
  }
}
