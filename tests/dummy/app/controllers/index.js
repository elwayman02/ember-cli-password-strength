import Ember from 'ember';
const { Controller, computed, inject } = Ember;

export default Controller.extend({
  passwordStrength: inject.service(),
  password: '',

  strength: computed('password', function () {
    return this.get('passwordStrength').strength(this.get('password'));
  })
});
