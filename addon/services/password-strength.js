import Service from '@ember/service';
import { Promise } from 'rsvp';
import { getOwner } from '@ember/application';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

export default Service.extend({
  loadingPromise: null,
  load() {
    let loadingPromise = this.get('loadingPromise');
    const config = getOwner(this).resolveRegistration('config:environment');
    if (!loadingPromise) {
      loadingPromise = new Promise((resolve, reject) => {
        //ensure the script was not already loaded elsewhere
        if ('zxcvbn' in window) {
          resolve(true);
        } else {
          let script = document.createElement('script');
          const url = `${config.rootURL}zxcvbn.js`;
          script.src = url;
          script.type = 'text/javascript';
          script.async = true;
          let first = document.getElementsByTagName('script')[0];
          first.parentNode.insertBefore(script, first);
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            const error = new Error(`Could not load Zxcvbn from ${url}`);
            reject(error);
          };
        }
      });
      this.set('loadingPromise', loadingPromise);
    }

    return loadingPromise;
  },

  /**
   * Load zxcvbn and then calculate strength
   * @param {String} password
   * @param {Array} user_inputs
   *
   * @returns {Promise}
   */
  strength(password, user_inputs = []) {
    return new Promise(resolve => {
      this.load().then(() => {
        resolve(window['zxcvbn'](password, user_inputs));
      });
    });
  },

  /**
   * Use a previously loaded zxcvbn to calculate strength
   * @param {String} password
   * @param {Array} user_inputs
   *
   * @returns {Object}
   */
  strengthSync(password, user_inputs = []) {
    if (!('zxcvbn' in window)) {
      throw new Error('`strengthSync` called before `load` was finished.');
    }
    return window['zxcvbn'](password, user_inputs)
  },

  /**
   * Load zxcvbn and then calculate strength
   * Return a ObjectProxy Promise which is suitable for use in a template
   * @param {String} password
   * @param {Array} user_inputs
   *
   * @returns {ObjectPromiseProxy}
   */
  strengthProxy(password, user_inputs = []) {
    const ObjectPromiseProxy = ObjectProxy.extend(PromiseProxyMixin);
    const promise = this.strength(password, user_inputs);
    return ObjectPromiseProxy.create({ promise });
  },
});
