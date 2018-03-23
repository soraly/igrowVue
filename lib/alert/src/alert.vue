<template>
    <div id='' class="search">
      <div class="searchbar">
        <div class="searchbar-inner">
          <i class="iconfont icon-search"></i>
          <input ref="input" @click="visible=true" v-model="searchInputVal" :placeholder="placeholder" type="text">
        </div>
        <a v-show="visible" @click="visible=false,searchInputVal=''" href="javascript:;" class="blue-btn searchbar-cancel" v-text="calcelword"></a>

      </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
              visible: false,
              searchInputVal: this.inputVal
            }
        },
//        computed: {
//          searchInputVal:{
//            get: function () {
//              return this.inputVal
//            },
//            set: function (val) {
//              console.log(val,'valset');
//              this.$emit('input', val);
//            }
//          },
//        },
        watch:{
          inputVal: function(val){
            this.searchInputVal = val;
          },
          searchInputVal:  function(val){
            console.log(val,'watchval');
            this.$emit('update:inputVal', val);
          }
        },
        mounted(){
          console.log(this.autofocus,this.$refs.input)
          this.autofocus && this.$refs.input.focus()
        },
        props: {
          inputVal: String,
          autofocus: Boolean,
          calcelword: {
            default: '取消'
          },
          placeholder: {
            default: '搜索'
          }
        },
        methods: {},
    }
</script>
<style lang="scss">
  .blue-btn {
    color: #fff;
    text-align: center;
    line-height: 0.44rem;
    width: 1.08rem;
    height: .44rem;
    background: #4ac8d6;
    font-size: 14px;
    border-radius: 3px;
  }
  .searchbar {
    display: flex;
    align-items: center;
    position: relative;
    background-color: #d9d9d9;
    box-sizing: border-box;
    padding: 8px 10px;
    z-index: 1;
  }
  .iconfont {
    font-size: 12px;
  }
  .searchbar-inner {
    flex: 1;
    border-radius: 2px;
    height: 28px;
    background-color: #fff;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    input {
      outline: 0;
      border: none;
      flex: 1;
      width: 100%;
      height: 100%;
    }

  }
  .searchbar-cancel {
    margin-left: 10px;
    text-decoration: none;
  }
</style>
