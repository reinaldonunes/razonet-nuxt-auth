<script>
  
</script>
<template>
  <main>
    <header class="container-fluid bg-light p-0 m-0">
      <div class="container p-4 d-flex align-items-center justify-content-between">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Nuxt_logo_%282021%29.svg/2560px-Nuxt_logo_%282021%29.svg.png" width="140px" />
  
        <nav>
          <ul class="nav" v-if="$auth.loggedIn">
            <li class="nav-item"><NuxtLink to="/" class="nav-link text-primary">Home</NuxtLink></li> 
            <li class="nav-item"><NuxtLink to="/user" class="nav-link text-primary">Profile</NuxtLink></li>
            <li class="nav-item"><a @click="$auth.logout()" class="btn nav-link text-danger pointer-event">Logout</a></li>
          </ul>
          <ul class="nav" v-else>
            <li class="nav-item"><NuxtLink to="/login" class="nav-link text-primary">Login</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </header>
    <Nuxt />
    <footer class="container-fluid p-5 bg-dark">
      ...
    </footer>
  </main>
</template>
<style>
  *{
    margin:0;
    padding:0;
  }
  ul{
    margin-bottom:0px;
  }
  footer{
    min-height:300px;
  }
</style>
