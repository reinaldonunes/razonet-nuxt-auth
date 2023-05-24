<template>
  <div class="container p-5 body-main">
    <span class="h-2 fw-bold text-primary d-flex mb-4">
     Seja bem vindo {{ $auth.loggedIn ? nameUser : 'VISITANTE' }}  
    </span>

    <div class="row" v-if="$auth.loggedIn">
      {{  token }}
      <div class="col-12 mb-4">
        <div class="card d-flex flex-column p-4">
          <span class="h-5 fw-bold text-secondary mb-3 d-flex">
            SESSÃO ATUAL
          </span>
          <span class="alert alert-success">
            <strong>Username</strong>: {{ $auth.user.username }}
            <br />
            <strong>E-mail</strong>: {{ $auth.user.email }}
            <br />
            <strong>Status</strong>: Ativo
          </span>
          <button class="btn btn-outline-danger" @click="$auth.logout()">Encerrar sessão atual</button>
        </div>
      </div>

      <div class="col-12 mb-2">
          <div class="card d-flex flex-column p-4">
            <span class="h-5 fw-bold text-secondary mb-3 d-flex">
              OUTRAS SESSÕES
            </span>
            <div class="row">
              <div class="col-12 col-md-6" v-for="session in allSessions" :key="session.index">
                <span class="d-flex flex-column overflow-auto alert alert-warning mb-3">
                  <template v-if="session.token !== $auth.user.token">
                    <strong>Token</strong> {{ session.token }}
                    <br />
                    <button class="btn btn-outline-danger mt-2" @click="deleteSession(session.token)">Encerrar esta sessão</button>
                  </template>
                </span>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import swalMixin from '~/plugins/swalMixin';
import { useAuthStore } from '~/store/authStore';
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})


export default {
  name: 'IndexPage',
  mixins: [swalMixin],
  data(){
    return{
      userName: this.$auth.user.username,
      allSessions: []
    }
  },

  methods: {
    async getOtherSessions(){
      const response = await this.$axios.get('/api/auth/sessions')
      this.allSessions = response.data.sessions
    },

    async deleteSession(session){
      const authorizationToken = session

      instance.defaults.headers.common['Authorization'] = `Bearer ${authorizationToken}`

      const response = await instance.get('/api/auth/logout')

      if (response.status === 202){
        this.showSuccessAlert('Token removido com sucesso!');
        this.getOtherSessions()
      }
    }
  },

  mounted(){
    this.getOtherSessions()
  },

  computed: {
    token() {
      const authStore = useAuthStore();
      return authStore.token;
    },
    nameUser(){
      return this.userName.toUpperCase();
    }
  },
}
</script>
<style scoped>
  .body-main{
    min-height:600px;
  }
</style>