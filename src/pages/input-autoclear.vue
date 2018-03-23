<template>
	<div class="page-input-autoclear">
		<h1 class="page-title">InputAutoclear</h1>
		
		<div class="am-list form">
			<div class="am-list-body">
				<!-- 禁止浏览器自动填充-->
				<input style="display:none">
				
				<am-input-autoclear label="用户名" placeholder="请输入用户名" type="text" v-model="username"></am-input-autoclear>
				<am-input-autoclear label="用户密码" placeholder="请输入用户密码" type="password" v-model="password" :required="true"></am-input-autoclear>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    };
  }
};
</script>
