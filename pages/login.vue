<template>
  <div class="container p-5">
    <UserAuthForm buttonText="Logar" :submitForm="userLogin" />
  </div>
</template>

<script>
import UserAuthForm from '~/components/UserAuthForm.vue';
import swalMixin from '~/plugins/swalMixin';
import { useAuthStore } from '~/store/authStore';

export default {
  name: 'LoginPage',
  components: {
    UserAuthForm
  },
  mixins: [swalMixin],  
  methods: {
    async userLogin(user_info) {
      const authStore = useAuthStore();
      try {
        let response = await this.$auth.loginWith('local', { 
          data: {
            username: user_info.username,
            password: user_info.password
          }
        })
        authStore.setToken(response.data.token);
        this.showSuccessAlert('Login realizado com sucesso!');
      } catch (err) {
        this.showErrorAlert('Falha no login. Verifique suas credenciais.');
        console.log(err)
      }
    }
  }

}
</script>
<style>
  .swal-text,
  .swal-footer{
    text-align: center;
  }
</style>