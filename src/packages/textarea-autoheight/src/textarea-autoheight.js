import TextareaAutoheight from './directive';
import Vue from 'vue';

const install = function (Vue) {
  let value = {};
  ['bind', 'inserted', 'componentUpdated', 'update', 'unbind'].forEach(item => {
    if (TextareaAutoheight[item]) {
      value[item] = TextareaAutoheight[item];
    }
  });
  Vue.directive(TextareaAutoheight.name, value);
};

if (!Vue.prototype.$isServer && window.Vue) {
  window.TextareaAutoheight = TextareaAutoheight;
  Vue.use(install); // eslint-disable-line
}

TextareaAutoheight.install = install;
export default TextareaAutoheight;
