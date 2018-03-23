<style type="text/scss">
	.page-validity .am-list:not([am-version]).form .am-list-label {
		width:1.14rem;
	}
</style>
<template>
	<div class="page-validity">
		<h1 class="page-title">Validity</h1>
		
		<div class="am-list form">
			<div class="am-list-body">
				<!-- 禁止浏览器自动填充-->
				<input style="display:none">
				<am-input-autoclear label="用户名" placeholder="请输入用户名" type="text" v-model="username" :required="true"></am-input-autoclear>
				<am-input-autoclear label="密码" placeholder="密码8~31位" type="password" v-model="password" :required="true"></am-input-autoclear>
				<am-input-autoclear label="身份证号码" placeholder="请输入身份证号码" type="text" v-model="idCard" :required="true"></am-input-autoclear>
			</div>
			<div class="am-wingblank wb15px" style="margin-top: 20px;">
				<button type="button" class="am-button" @click="save($event.target)">保&nbsp;存</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      idCard: ''
    };
  },
	
  methods: {
    save () {
      let result = this.$validity([
        {required: true, customName: '姓名不能为空', value: this.username},
				{required: true, customName: '请输入密码', value: this.password},
        {customName: '密码长度8~31位',
          value: this.password,
          customReg: this.password.length >= 8 && this.password.length <= 31
        },
				{required: true, type: 'ID_NO', value: this.idCard}
      ]);

      if (result.status) {
        console.log('验证通过发送ajax请求');
      }
    }
  }
};
</script>
