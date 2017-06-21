import EmberObject from 'ember-object';
import { reads } from 'ember-computed';

export default EmberObject.extend({
  version: reads('id')
});
