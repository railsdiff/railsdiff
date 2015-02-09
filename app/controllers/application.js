import Ember from 'ember';
import ControllerMessaging from '../mixins/controller-messaging';

export default Ember.Controller.extend(ControllerMessaging, {
  actions: {
    transition: function() {
      this.transitionToRoute('patch', this.get('sourceVersion'), this.get('targetVersion'));
    }
  },
  showForm: Ember.computed.and('sources.length'),
  sourceVersion: Ember.computed.oneWay('sources.[].1'),
  sources: Ember.computed('model', function() {
    return Ember.keys(this.get('model')).reverse();
  }),
  targetValidator: function() {
    var targets = this.get('targets');

    if (!targets.contains(this.get('targetVersion'))) {
      this.set('targetVersion', targets[targets.length - 1]);
    }
  }.observes('targets'),
  targetVersion: Ember.computed.oneWay('targets.firstObject'),
  targets: Ember.computed('model', 'sourceVersion', function() {
    var sourceVersion = this.get('sourceVersion');
    if (!sourceVersion) { return []; }
    return (this.get('model')[sourceVersion] || []).reverse();
  })
});
