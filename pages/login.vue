<template>
  <div class="container p-5">
    <UserAuthForm buttonText="Logar" :submitForm="userLogin" />
  </div>
</template>

<script>
import UserAuthForm from '~/components/UserAuthForm.vue';
import { useAuthStore } from '~/store/authStore';
import swalMixin from '~/plugins/swalMixin';
import axios from 'axios'

//configs

export default {
  name: 'LoginPage',
  components: { UserAuthForm },
  mixins: [swalMixin],  
  data(){
    return{
      clientIp: null
    }
  },
  methods: {
    async userLogin(user_info) {
      const authStore = useAuthStore()
      try {
        let response = await this.$auth.loginWith('local', { 
          data: {
            username: user_info.username,
            password: user_info.password,
            ip_address: this.clientIp
          }
        })

        if(response.status === 202){
          authStore.setToken(response.data.token);
          this.showSuccessAlert('Login realizado com sucesso!');
        }

      } catch (err) {
        this.showErrorAlert('Falha no login. Verifique suas credenciais.');
        console.log(err)
      }
    },

    async getClientIp(){
      const url = 'https://api.ipify.org?format=json'

      const instance = axios.create({})

      await instance.get(url)
        .then(response => {
          this.clientIp = response.data.ip
        })
        .catch(error => {
          console.error('Erro ao obter o endereço IP do cliente:', error)
        })
    }
  },
  beforeMount() {
    this.getClientIp()
  },
}
</script>
<style>
  .swal-text,
  .swal-footer{
    text-align: center;
  }
</style>