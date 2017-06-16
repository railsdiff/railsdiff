import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('patch', {path: '/:source/:target'});
  this.route('diff', {path: '/diff/:source/:target'});
  this.route('html', {path: '/html/:path'});
  this.route('about');
  this.route('notFound', {path: '/*path'});
});

export default Router;
