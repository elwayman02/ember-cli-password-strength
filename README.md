# Ember-CLI-Password-Strength

[![Build Status](https://travis-ci.org/elwayman02/ember-cli-password-strength.svg)](https://travis-ci.org/elwayman02/ember-cli-password-strength)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-password-strength.svg)](https://emberobserver.com/addons/ember-cli-password-strength)
[![Dependency Status](https://www.versioneye.com/user/projects/562ec54036d0ab002100140f/badge.svg?style=flat)](https://www.versioneye.com/user/projects/562ec54036d0ab002100140f)
[![Code Climate](https://codeclimate.com/github/elwayman02/ember-cli-password-strength/badges/gpa.svg)](https://codeclimate.com/github/elwayman02/ember-cli-password-strength)
[![Codacy Badge](https://api.codacy.com/project/badge/d7d7c6a87e55428888cae7978849c74a)](https://www.codacy.com/app/hawker-jordan/ember-cli-password-strength)

# This is probably no longer necessary for your application

[ember-auto-import](https://github.com/ef4/ember-auto-import) now provides the
ability to import from NPM without requiring this addon for `ember-cli`
versions as far back as `v2.18`. By installing `ember-auto-import` you can
replace this addon and get automatic (lazy) loading and access to `zxcvbn`:

```console
$ ember install ember-auto-import
$ yarn add zxcvbn --dev
```

Note the caveats if you had been using ember-cli-password-strength in an addon.

## Option 1: Eager loading (bundled zxcvbn)

At the top of your source file:

```javascript
import zxcvbn from 'zxcvbn';
```

And wherever you had been using the `passwordStrength` service, use this
function instead. For example:

```javascript
@computed('password')
get passwordStrengthScore() {
  const { score } = zxcvbn(this.password);

  return score;
}
```

## Option 2: Lazy loading (unbundled zxcvbn)

Follow the extra steps in the [ember-auto-import
README](https://github.com/ef4/ember-auto-import#readme) to enable dynamic
imports.

You will need an async *something* that can dynamically import zxcvbn the first
time it's needed. This could be:

* Route hook(s)
* An ember-concurrency task
* An async field validator
* A computed property that returns a promise

Here's an example of the latter:

```javascript
@computed('password')
get passwordStrengthScore() {
  return import('zxcvbn').then((chunk) => {
    const { default: zxcvbn } = chunk;
    const { score } = zxcvbn(this.password);

    return score;
  });
}
```

# Documentation

This addon is an Ember-CLI wrapper for [zxcvbn](https://github.com/dropbox/zxcvbn), a "realistic password strength estimator".
In addition to bringing that package into your project, Ember-CLI-Password-Strength exposes a `password-strength` shim 
as an ES6 module you can import anywhere in your application, rather than using the Bower package's global variable.

Check out the [Demo](http://jhawk.co/e-c-password-strength-demo)!

## Installation

`ember install ember-cli-password-strength`

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

## Usage

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
    const obj = passwordStrength.strengthSync(this.get('password'));
    console.log(obj);
  }),

  /**
   * If you are using the result in a template then strengthProxy saves 
   * a step in wrapping the returned promise in an Ember.ObjectProxy
   */
  strengthProxy: computed('password', function () {
    const passwordStrength = this.get('passwordStrength');
    const obj = passwordStrength.strengthProxy(this.get('password'));
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

## Contributing

This README outlines the details of collaborating on this Ember addon.

### Installation

* `git clone git@github.com:elwayman02/ember-cli-password-strength.git`
* `cd ember-cli-password-strength`
* `npm install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
