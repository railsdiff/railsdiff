import { test } from 'qunit';
import moduleForAcceptance from 'rails-diff/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';
import patch from '../fixtures/patch';

moduleForAcceptance('Acceptance | version links', {
  beforeEach() {
    this.server = new Pretender();
    this.server.get('http://api.railsdiff.org/v3.1.1/v3.2.6', function() {
      return [200, {}, patch];
    });
  },
  afterEach() {
    this.server.shutdown();
  }
});

const links = {
  source: '.links a.source',
  target: '.links a.target'
};

function textFor(selector) {
  return find(selector + ':first').text();
}

function hrefFor(selector) {
  return find(selector).attr('href');
}

test('links are rendered', function(assert) {
  visit('/3.1.1/3.2.6');

  andThen(function() {
    assert.ok(find(links.source));
    assert.ok(find(links.target));
  });
});

test('links match versions', function(assert) {
  visit('/3.1.1/3.2.6');

  andThen(function() {
    assert.equal(textFor(links.source), '3.1.1');
    assert.equal(textFor(links.target), '3.2.6');
  });
});

test('links navigate to generated files', function(assert) {
  visit('/3.1.1/3.2.6');

  andThen(function() {
    assert.equal(hrefFor(links.source), 'https://github.com/railsdiff/api/raw/master/generated/v3.1.1/Gemfile');
    assert.equal(hrefFor(links.target), 'https://github.com/railsdiff/api/raw/master/generated/v3.2.6/Gemfile');
  });
});
