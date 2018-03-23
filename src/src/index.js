import InputAutoclear from '../packages/input-autoclear';
import SearchAutoclear from '../packages/search-autoclear';
import Alert from '../packages/alert';
import Upload from '../packages/upload';
import MultilevelChoose from '../packages/multilevel-choose';
import Validity from '../packages/validity';
import Swipe from '../packages/swipe';
import Mtswipe from '../packages/mtswipe';
import MtswipeItem from '../packages/mtswipe-item';
import RequireFor from '../packages/require-for';
import TextareaAutoheight from '../packages/textarea-autoheight';
import Select from '../packages/select';

const version = '0.1.7';
const install = function (Vue) {
  if (install.installed) return;

  Vue.component(InputAutoclear.name, InputAutoclear);
  Vue.component(SearchAutoclear.name, SearchAutoclear);
  Vue.component(Alert.name, Alert);
  Vue.component(Upload.name, Upload);
  Vue.component(MultilevelChoose.name, MultilevelChoose);
  Vue.component(Swipe.name, Swipe);
  Vue.component(Mtswipe.name, Mtswipe);
  Vue.component(MtswipeItem.name, MtswipeItem);
  Vue.component(Select.name, Select);
  Vue.use(RequireFor);
  Vue.use(TextareaAutoheight);

  Vue.$validity = Vue.prototype.$validity = Validity;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export {
  install,
  version,
  InputAutoclear,
  SearchAutoclear,
  Alert,
    Upload,
  MultilevelChoose,
  Validity,
  Swipe,
  Mtswipe,
  MtswipeItem,
  RequireFor,
  TextareaAutoheight,
  Select
};
