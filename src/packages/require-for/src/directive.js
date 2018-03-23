const test = (el, binding) => {
  let btn = el.getElementsByClassName('am-button')[0];
  for (let i in binding.value) {
    if (binding.value[i] !== 0 && !(binding.value[i] + '').trim()) {
      btn.setAttribute('disabled', 'disabled');
      break;
    }
    btn.removeAttribute('disabled');
  }
};

export default {
  name: 'amRequireFor',
  bind (el, binding) {
    test(el, binding);
  },
  update (el, binding) {
    test(el, binding);
  }
};
