/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-password-strength',

  included: function (app) {
    this._super.included.apply(this, arguments);

    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    app.import(app.bowerDirectory + '/zxcvbn/dist/zxcvbn.js');
    app.import('vendor/shims/password-strength.js');
  }
};
