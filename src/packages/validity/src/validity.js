import Validity from './service';
import Vue from 'vue';

const install = function (Vue) {
  Vue.$validity = Vue.prototype.$validity = Validity;
};

if (!Vue.prototype.$isServer && window.Vue) {
  window.$validity = Validity;
	Vue.use(install); // eslint-disable-line
}

Validity.install = install;
export default Validity;
