<template>
	<div class="require-for">
		<h1 class="page-title">RequireFor</h1>
		
		<!--<div class="am-list form" v-am-require-for="[username, password, repwd]">-->
		<div class="am-list form" >
			<div class="am-list-body">
				<!-- 禁止浏览器自动填充-->
				<input style="display:none">
				
				<am-input-autoclear label="用户名" placeholder="请输入用户名" type="text" v-model="username"></am-input-autoclear>
				<am-input-autoclear label="用户密码" placeholder="请输入用户密码" type="password" v-model="password" :required="true"></am-input-autoclear>
				<am-input-autoclear label="确认密码" placeholder="请再次输入用户密码" type="password" v-model="repwd" :required="true"></am-input-autoclear>
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
      repwd: ''
    };
  },
	
  methods: {
    save () {
      console.log('save');
    }
  }
};
</script>
