<!--<style lang="scss">-->
  <!--/*@import "../../../src/style/var.css";*/-->
  <!---->
  <!--.am-input-autoclear {-->
    <!--.required {-->
     <!--color: red;-->
    <!--}-->
  <!--}-->
<!--</style>-->

<template>
  <div class="am-list-item am-input-autoclear">
    <div class="am-list-label">
      {{label}}
      <span class="required" v-if="required">*</span>
    </div>
    <div class="am-list-control">
      <input
        @change="$emit('change', currentValue)"
        ref="input"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :number="type === 'number'"
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        :value="currentValue"
        @input="active=true; currentValue = $event.target.value"
        @focus="active=true"
        @blur="active=false">
    </div>
    <div class="am-list-clear" v-if="!disableClear" @click="handleClear" @touchstart="handleClear">
      <i class="am-icon-clear am-icon"
         :style="{visibility: (currentValue && active) ? 'visible' : 'hidden'}"></i>
    </div>
  </div>
</template>

<script>
/**
 * am-input-autoclear
 * @desc amui文本输入框
 * @module components/field
 *
 * @param {string} [type=text] - field 类型，接受 text，number 等
 * @param {string} [label] - 标签
 * @param {string} [placeholder] - placeholder
 * @param {string} [disabled] - disabled
 * @param {string} [readonly] - readonly
 * @param {string} [maxlength] - maxlength
 * @param {string} [required] - required
 *
 * @example
 * <am-input-autoclear label="联系地址" placeholder="请输入您的联系地址" :required="true" type="text" v-model="data.address"></am-input-autoclear>
 */
export default {
  name: 'am-input-autoclear',
  props: {
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    label: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    disableClear: Boolean,
    maxlength: Number,
    value: {}
  },
  data () {
    return {
      active: false,
      currentValue: this.value
    };
  },
  methods: {
    handleClear () {
      this.currentValue = '';
      this.$refs.input.focus();
    }
  },
  watch: {
    value (val) {
      if (this.maxlength) {
        this.currentValue = val.slice(0, this.maxlength);
      } else {
        this.currentValue = val;
      }
    },
    currentValue (val) {
      this.$emit('input', val);
    }
  }
};
</script>
