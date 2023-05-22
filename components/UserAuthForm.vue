<script lang="ts">
  export default{
    name: 'UserAuthForm',
    data(){
      return{
        valid: false,
        showPassword: false,
        user:{
          username: '',
          password: ''
        },
      }
    },
    props: ['submitForm', 'buttonText', 'hasName']
  }
</script>
<template>
  <form @submit.prevent="submitForm(user)">
    <label class="form-label mb-3">
      <span class="d-flex mb-1">E-mail:</span>
      <input type="text" name="email" class="form-control mb-0" v-model="user.username" />
    </label>

    <label class="form-label mb-3">
      <span class="d-flex mb-1">Senha:</span>
      <input type="password" name="password" class="form-control mb-0" v-model="user.password" />
    </label>

    <label class="form-label mb-0">
      <button type="submit" class="btn btn-primary w-100 text-center">{{  buttonText }}</button>
    </label>
  </form>
</template>
<style scoped>
  form{
    margin:0 auto;
    margin-top:62px;
    margin-bottom:62px;
    padding:64px 32px;
    border-radius:8px;
    max-width:500px;
    width:100%;
    display:flex;
    flex-direction:column;
    background:#f9f9f9;
    border:1px solid #ddd;
  }
</style>
