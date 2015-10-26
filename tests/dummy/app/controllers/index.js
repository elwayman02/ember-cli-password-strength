import Ember from 'ember';
import strength from 'password-strength';

export default Ember.Controller.extend({
  password: '',
  strength: null,

  actions: {
    checkStrength(password) {
      this.set('strength', strength(password));
    }
  }
});
