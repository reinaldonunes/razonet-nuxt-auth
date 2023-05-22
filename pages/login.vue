<template>
  <div class="container p-5">
    <UserAuthForm buttonText="Logar" :submitForm="userLogin" />
  </div>
</template>

<script>
import UserAuthForm from '~/components/UserAuthForm.vue';

export default {
  name: 'LoginPage',
  components: {
    UserAuthForm
  },

  methods: {
    async userLogin(user_info) {
      try {
        let response = await this.$auth.loginWith('local', { 
          data: {
            username: user_info.username,
            password: user_info.password
          }
        })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }

}
</script>