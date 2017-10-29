(function() {
  function vendorModule() {
    'use strict';

    if ('Ember' in window) {
      window.Ember.deprecate('Importing password-strength deprecated. Use the passwordStrength service instead.', false, {
        id: 'ember-cli-password-strength-shim',
        until: 'v2.0.0'
      });
    }

    return { 'default': self['zxcvbn'] };
  }

  define('password-strength', [], vendorModule);
})();
