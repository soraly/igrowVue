<template>
	<div class="component page-upload">
		<h1 class="page-title">upload</h1>

		<zfb-upload></zfb-upload>
		<!--<div style="text-align: center" class="am-wingblank wb15px">-->
			<!--<button type="button" class="am-button" @click="isAlert1=true" style="margin-top: 10px;">删除类(班级主页)</button>-->
			<!--<button type="button" class="am-button" @click="isAlert2=true" style="margin-top: 10px;">输入类(实习报告)</button>-->
			<!--&lt;!&ndash;<button type="button" class="am-button" @click="isAlert2=true" style="margin-top: 10px;">图片文字居中-蓝按钮</button>&ndash;&gt;-->
			<!--&lt;!&ndash;<button type="button" class="am-button" @click="isAlert3=true" style="margin-top: 10px;">图片文字居中-白按钮</button>&ndash;&gt;-->
			<!--&lt;!&ndash;<button type="button" class="am-button" @click="isAlert4=true" style="margin-top: 10px;">纯文字居中</button>&ndash;&gt;-->
		<!--</div>-->
		<!--<zfb-alert v-if="isAlert1" :my-list="alertList1" @lzx="lzxtest" @close="closeAlert"></zfb-alert>-->
		<!--<zfb-alert v-if="isAlert2" :my-list="alertList2" @close="isAlert2=false"></zfb-alert>-->
		<!--<zfb-alert v-if="isAlert3" :my-list="alertList3" @close="isAlert3=false"></zfb-alert>-->
		<!--<zfb-alert v-if="isAlert4" :my-list="alertList4" @close="isAlert4=false"></zfb-alert>-->
	</div>
</template>
<style lang="scss">
	.page-upload {
		padding: 0 20px;
	}
	.am-button {
		font-size: 18px;
		width: 80%;
		height: 44px;
		background: #4ac8d6;
		color: #fff;
		border-radius: 20px;
		border: none;
	}
</style>
<script>
  export default {
      mounted(){
          console.log(this.$route)
      },
	  methods:{
          closeAlert(){
              this.isAlert1 = false;
		  },
          lzxtest(){
              console.log('i am kong')
		  }
	  },
    data () {
      return {
        isAlert1: false,
        alertList1: {
            type:1,
            sureWord: '请确认',
            content: '确认修改吗?'
        },
        isAlert2: false,
        alertList2: {
          	type: 2,
			sureWord: '请确认',
            placeholder: '请输入消息内容：'
        },
        isAlert3: false,
        alertList3: {
          type: 1,
          title: '温馨提示：',
          content: ['Vue.js是一套构建用户界面的渐进式框架。'],
          contentStyle: {'text-align': 'center'},
          btnColor: 'white',
          img: {
            width: '1.36rem',
            height: '1.36rem',
            url: 'https://dsb-cdn.oss-cn-hangzhou.aliyuncs.com/alipay/assets/images/sfxy-zrrxx@2x.png'
          }
        },
        isAlert4: false,
        alertList4: {
          type: 2,
          content: ['<span style="color: #f00;">密码错误</span>，请重新输入。']
        }
      };
    }
  };
</script>
