<template>
  <div class="container p-5 body-main">
    <br />
    <div v-if="$auth.loggedIn">
      Olá, usuário:
      <br />
      {{ $auth.user }}
    </div>
    <div v-else>Olá visitante.</div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
<style scoped>
  .body-main{
    min-height:600px;
  }
</style>