Ember-CLI-Password-Strength
==============================================================================

[![Build Status](https://travis-ci.org/elwayman02/ember-cli-password-strength.svg)](https://travis-ci.org/elwayman02/ember-cli-password-strength)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-password-strength.svg)](https://emberobserver.com/addons/ember-cli-password-strength)
[![Dependency Status](https://www.versioneye.com/user/projects/562ec54036d0ab002100140f/badge.svg?style=flat)](https://www.versioneye.com/user/projects/562ec54036d0ab002100140f)
[![Code Climate](https://codeclimate.com/github/elwayman02/ember-cli-password-strength/badges/gpa.svg)](https://codeclimate.com/github/elwayman02/ember-cli-password-strength)
[![Codacy Badge](https://api.codacy.com/project/badge/d7d7c6a87e55428888cae7978849c74a)](https://www.codacy.com/app/hawker-jordan/ember-cli-password-strength)

This addon is an Ember-CLI wrapper for [zxcvbn](https://github.com/dropbox/zxcvbn), a "realistic password strength estimator".
In addition to bringing that package into your project, Ember-CLI-Password-Strength exposes a `password-strength` shim 
as an ES6 module you can import anywhere in your application, rather than using the Bower package's global variable.

Check out the [Demo](http://jhawk.co/e-c-password-strength-demo)!

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-password-strength
```

## Configuration

### Load the Zxcvbn Library Only When Needed

Zxcvbn is a large library (400kB gzipped). You can load it asynchronously
by configuring your `ember-cli-build.js`. This is the recommended configuration, but is not the default
so as to maintain backwards compatibility:

```javascript
let app = new EmberAddon(defaults, {
  'ember-cli-password-strength': {
    bundleZxcvbn: false
  }
});
```

Usage
------------------------------------------------------------------------------

### Use the `passwordStrength` service:

```javascript
//components/foo.js
import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  passwordStrength: inject(),
  password: '',

  /**
   * passwordStrength.strength returns a promise which
   * will resolve after the zxcvbn library has been loaded.
   *
   */
  strength: computed('password', function () {
    const passwordStrength = this.get('passwordStrength');
    passwordStrength.strength(this.get('password')).then(obj => {
      console.log(obj);
    });
  }),

  /**
   * strengthSync expects zxcvbn to be loaded already
   */
  strengthSync: computed('password', function () {
    const passwordStrength = this.get('passwordStrength');
    const obj = passwordStrength.strength(this.get('password');
    console.log(obj);
  }),

  /**
   * If you are using the result in a template then strengthProxy saves 
   * a step in wrapping the returned promise in an Ember.ObjectProxy
   */
  strengthProxy: computed('password', function () {
    const passwordStrength = this.get('passwordStrength');
    const obj = passwordStrength.strength(this.get('password');
    console.log(obj);
  })
});
```

### Preload the zxcvbn library to make the first run of strength() faster:

```javascript
//routes/foo.js
import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  passwordStrength: inject(),
  beforeModel() {
    const passwordStrength = this.get('passwordStrength');
    return passwordStrength.load();
  }
});
```

### Import the shim (deprecated):

Simply import the `password-strength` shim into your project:

```javascript
//components/foo.js
import Ember from 'ember';
import strength from 'password-strength';

const { Component, computed } = Ember;

export default Component.extend({
  password: '',

  strength: computed('password', function () {
    return strength(this.get('password'));
  })
});
```

Full documentation for the strength checking method can be found [here](https://github.com/dropbox/zxcvbn#usage).

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone git@github.com:elwayman02/ember-cli-password-strength.git`
* `cd ember-cli-password-strength`
* `npm install`

### Linting

* `yarn run lint:js`
* `yarn run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `yarn test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
