<template>
	<div class="login-page">
		<img alt="greenpress Admin Panel" src="../assets/logo.png">
		<h1>Please login:</h1>
		<LoginForm/>
	</div>
</template>

<script>
  import LoginForm from '../components/LoginForm'

  export default {
    name: 'login',
    components: {
      LoginForm
    }
  }
</script>
<style scoped>
	.login-page {
		text-align: center;
	}
	img {
		max-width: 400px;
	}
</style>
