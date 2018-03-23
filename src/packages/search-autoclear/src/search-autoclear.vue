<!--<style lang="css">-->
	<!--@component-namespace zfb {-->
		<!--@component search-autoclear {-->
			<!--.am-search:not([am-version]) {-->
				<!--.am-search-input {-->
					<!--.am-search-icon {-->
						<!--margin: .02rem 0 0 .05rem;-->
					<!--}-->
					<!--input {-->
						<!--padding: .065rem 0 .065rem .05rem;-->
						<!--&::placeholder {-->
						 <!--font-size: .16rem;-->
						<!--}-->
					<!--}-->
					<!--.am-search-clear {-->
						<!--width: .22rem;-->
					<!--}-->
				<!--}-->
			<!--}-->
		<!--}-->
	<!--}-->
<!--</style>-->

<template>
	<div class="zfb-search-autoclear">
		<div class="am-search am-input-autoclear">
			<div class="am-search-input">
				<div class="am-search-icon">
					<i class="am-icon search"></i>
				</div>
				<input class="am-search-value" type="text" placeholder="搜索"
							 ref="input"
							 @change="$emit('change', currentValue)"
							 :value="currentValue"
							 :placeholder="placeholder || '搜索'"
							 @input="active=true; currentValue = $event.target.value"
							 @focus="active=true"
							 @blur="active=false">
				<div class="am-search-clear" @click="handleClear" @touchstart="handleClear" v-if="!disableClear">
					<i class="am-icon-clear am-icon clear-tiny"
						 :style="{visibility: (currentValue && active) ? 'visible' : 'hidden'}"></i>
				</div>
			</div>
			<div class="am-search-button">
				<button type="button" class="am-button am-button-sm am-button-blue">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
  /**
   * am-search-autoclear
   * @desc amui搜索输入框
   * @module components/field
   *
   * @example
   * <am-search-autoclear v-model="keyword"></am-search-autoclear>
	 * api同inputAutoclear
   */
  export default {
    name: 'am-search-autoclear',
    props: {
      placeholder: String,
      disableClear: Boolean,
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
        this.currentValue = val;
      },
      currentValue (val) {
        this.$emit('input', val);
      }
    }
  };
</script>
