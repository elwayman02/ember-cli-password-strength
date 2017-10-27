(function() {
  function vendorModule(RSVP) {
    'use strict';
    var loadingPromise = null;
    var load = function () {
      if (!loadingPromise) {
        loadingPromise = new RSVP.default.Promise(resolve => {
          //ensure the script was not already loaded elsewhere
          if (self['zxcvbn'] !== undefined) {
            resolve(true);
          } else {
            let script = document.createElement('script');
            const url = `/zxcvbn.js`;
            script.src = url;
            script.type = 'text/javascript';
            script.async = true;
            let first = document.getElementsByTagName('script')[0];
            first.parentNode.insertBefore(script, first);
            script.onload = () => {
              resolve(true);
            };
          }
        });
      }
      return loadingPromise;
    };

    return {
      'default': function (password, user_inputs = []) {
        return new RSVP.default.Promise(function (resolve) {
          load().then(function () {
            resolve(self['zxcvbn'](password, user_inputs));
          });
        });
      }
    };
  }

  define('async-password-strength', ['rsvp'], vendorModule);
})();
