(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': function (password, user_inputs = []) {
        if (self['zxcvbn'] === undefined) {
          throw new Error(`Zxcvbn is not loaded. Ensure you have set "{ bundleZxcvbn: true}" or else use "async-password-strength".
            See https://github.com/elwayman02/ember-cli-password-strength#usage for more information.`);
        } else {
          return self['zxcvbn'](password, user_inputs)
        }
      }
    };
  }

  define('password-strength', [], vendorModule);
})();
