import autosize from 'autosize';

export default {
  name: 'amTextareaAutoheight',
  bind (el) {
    autosize(el);
  }
};
