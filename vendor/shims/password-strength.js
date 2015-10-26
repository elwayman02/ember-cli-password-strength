(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['zxcvbn'] };
  }

  define('password-strength', [], vendorModule);
})();
