import RequireFor from './directive';
import Vue from 'vue';

const install = function (Vue) {
  let value = {};
  ['bind', 'inserted', 'componentUpdated', 'update', 'unbind'].forEach(item => {
    if (RequireFor[item]) {
      value[item] = RequireFor[item];
    }
  });
  Vue.directive(RequireFor.name, value);
};

if (!Vue.prototype.$isServer && window.Vue) {
  window.RequireFor = RequireFor;
  Vue.use(install); // eslint-disable-line
}

RequireFor.install = install;
export default RequireFor;
