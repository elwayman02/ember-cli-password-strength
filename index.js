/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-password-strength',

  included(app) {
    this._super.included.apply(this, arguments);

    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    app.import('vendor/zxcvbn.js');
    app.import('vendor/shims/password-strength.js');
  },

  treeForVendor(vendorTree) {
    var zxcvbnTree = new Funnel(path.dirname(require.resolve('zxcvbn/dist/zxcvbn.js')), {
      files: ['zxcvbn.js', 'zxcvbn.js.map'],
    });

    return new MergeTrees([vendorTree, zxcvbnTree]);
  },
};
