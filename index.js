'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-password-strength',
  passwordStrengthConfig: null,
  included(app) {
    this._super.included.apply(this, arguments);

    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    var addonOptions = (this.parent && this.parent.options) || (this.app && this.app.options) || {};
    this.passwordStrengthConfig = addonOptions[this.name] || {
      bundleZxcvbn: true
    };

    if (this.passwordStrengthConfig.bundleZxcvbn) {
      app.import('vendor/zxcvbn.js');
      app.import('vendor/shims/password-strength.js');
    }
  },

  treeForVendor(vendorTree) {
    if (!this.passwordStrengthConfig.bundleZxcvbn) {
      return vendorTree;
    }

    var zxcvbnTree = new Funnel(path.dirname(require.resolve('zxcvbn/dist/zxcvbn.js')), {
      files: ['zxcvbn.js', 'zxcvbn.js.map'],
    });

    return new MergeTrees([vendorTree, zxcvbnTree]);
  },

  treeForPublic(publicTree) {
    if (this.passwordStrengthConfig.bundleZxcvbn) {
      return publicTree;
    }
    var zxcvbnTree = new Funnel(path.dirname(require.resolve('zxcvbn/dist/zxcvbn.js')), {
      files: ['zxcvbn.js'],
    });
    var trees = [];
    if (publicTree) {
      trees.push(publicTree);
    }
    trees.push(zxcvbnTree)

    return new MergeTrees(trees);
  },
};
