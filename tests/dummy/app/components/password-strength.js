import Ember from 'ember';

const { Component, computed, inject, ObjectProxy, PromiseProxyMixin } = Ember;

const ObjectPromiseProxy = ObjectProxy.extend(PromiseProxyMixin);

export default Component.extend({
  passwordStrength: inject.service(),
  password: '',

  strength: computed('password', function () {
    const passwordStrength = this.get('passwordStrength');
    return ObjectPromiseProxy.create({
      promise: passwordStrength.strength(this.get('password'))
    });
  })
});
