import Ember from 'ember';
import { module } from 'qunit';
import { test } from 'ember-qunit';
import strength from 'password-strength';

module('Ember-CLI-Password-Strength shim');

test('it exports vendor shim', function (assert) {
  assert.equal(Ember.typeOf(strength), 'function', 'function is imported from vendor shim');

  const result = strength('foo1234');
  assert.ok(Ember.isPresent(result), 'result is returned from shim function');
  assert.ok(Ember.isPresent(result.score), 'score is contained in result');
});
