<template>
  <div class="container p-5 body-main">
    <span class="h-2 fw-bold text-primary d-flex mb-4">
     Seja bem vindo {{ $auth.loggedIn ? nameUser : 'VISITANTE' }}  
    </span>
    <div v-if="$auth.loggedIn">
      <NuxtLink to="/user">Ir para meu perfil</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data(){
    return{
      profile:{
        username: this.$auth.user.profile.username,
      }
    }
  },

  computed: {
    nameUser(){
      return this.profile.username.toUpperCase();
    },
  },
}
</script>
<style scoped>
  .body-main{
    min-height:600px;
  }
</style>