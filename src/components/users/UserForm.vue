<template>
	<form @submit.prevent="submit">
		<FormInput title="Name" :value="user.name" @change="editedData.name = $event.target.value"/>
		<FormInput title="Email" :value="user.email" @change="editedData.email = $event.target.value"/>
		<FormInput title="Password" label="Leave empty to ignore changes"
		           type="password"
		           @change="editedData.password = $event.target.value"/>
		<button type="submit">SAVE</button>
	</form>
</template>
<script>
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { createNamespacedHelpers } from 'vuex'
  import { USERS_MODULE_NAME } from '../../store/users/consts'
  import FormInput from '../forms/FormInput'

  const { mapActions, mapState } = createNamespacedHelpers(USERS_MODULE_NAME)
  @Component({
    components: { FormInput }
  })
  export default class UserForm extends Vue {

    editedData = {}

    @Prop(Object) user

    submit () {
      this.$emit('submit', this.editedData)
    }
  }
</script>
<style scoped lang="scss">

</style>
