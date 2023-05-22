<template>
  <div class="container p-5 body-main">
    <br />
    <div>
      Olá, usuário: {{ $auth.user.username.toUpperCase() }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPage'
}
</script>
<style scoped>
.body-main {
  min-height: 600px;
}
</style>