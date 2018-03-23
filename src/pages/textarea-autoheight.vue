<style scoped>
  .my-textarea{
    padding:10px 15px;
  }
  textarea{
    border:1px solid #ddd;
    width:100%;
    min-height:60px;
  }
</style>
<template>
  <div class="page-textarea-autoheight">
    <h1 class="page-title">TextareaAutoheight</h1>

    <div class="my-textarea">
      <textarea  cols="30" v-am-textarea-autoheight rows="2" placeholder="请输入您的居住地址" v-model="address"></textarea>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        address: 'textarea的高度会根据输入内容的多少实现自动增高，避免出现滚动条。'
      };
    }
  };
</script>
