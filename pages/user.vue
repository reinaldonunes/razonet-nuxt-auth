<template>
  <div class="container p-5 body-main">
    <span class="h-2 fw-bold text-primary d-flex mb-4">
      Seja bem vindo {{ nameUser }}
    </span>


    <div class="row">
      <div class="col-12 mb-4">
        <div class="card d-flex flex-column p-4">
          <span class="h-5 fw-bold text-secondary mb-3 d-flex">
            SESSÃO ATUAL
          </span>
          <span class="alert alert-success">
            <div class="row">
              <div class="col-12 col-md-4 mb-3">
                <strong>Username</strong>
                <br />
                {{ profile.username }}
              </div>
              <div class="col-12 col-md-4 mb-3">
                <strong>E-mail</strong>
                <br />
                {{ profile.email }}
              </div>
              <div class="col-12 col-md-4 mb-3">
                <strong>Data</strong>
                <br />
                {{ session.date | formatDate }}
              </div>

              <div class="col-12 col-md-4 mb-3">
                <strong>Localização</strong>
                <br />
                {{ userLocation }}
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-outline-danger w-100" @click="$auth.logout()">Encerrar sessão atual</button>
            </div>
          </span>
        </div>
      </div>
      <div class="col-12 mb-2" v-if="allSessions != ''">
        <div class="card d-flex flex-column p-4">
          <span class="h-5 fw-bold text-secondary mb-3 d-flex">
            OUTRAS SESSÕES
          </span>
          <div class="row">
            <div class="col-12 col-md-6" v-for="session in allSessions" :key="session.index">
              <div class="alert alert-warning mb-3">
                <div class="row">
                  <div class="col-12 col-md-6 mb-2">
                    <strong>IP</strong>
                    <br />
                    {{  session.ip_address }}
                  </div>

                  <div class="col-12 col-md-6 mb-2">
                    <strong>Criado</strong>
                    <br />
                    {{ session.date | formatDate }}
                  </div>
                <div class="col-12">
                  <button class="btn btn-outline-danger w-100 mt-2" @click="deleteSession(session.token)">Encerrar esta sessão</button>
                </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-12">
              <span class="h-5 fw-bold text-secondary mb-3 d-flex">
                AÇÃO EM MASSA
              </span>
              <button class="btn btn-outline-danger w-100 mt-2" @click="deleteAllSessions($auth.strategy.token.get())">Encerrar todas as outras sessões.</button>
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
import { format } from 'date-fns';
import axios from 'axios'

export default {
  name: 'IndexPage',
  mixins: [swalMixin],
  data() {
    return {
      profile: {
        username: this.$auth.user.profile.username,
        email: this.$auth.user.profile.email,
        role: this.$auth.user.profile.role
      },
      session: {
        ip_address: this.$auth.user.session.ip_address,
        date: this.$auth.user.session.date,
        location: {
          city: '',
          country: '',
        }
      },
      allSessions: [],
      ip_addres: this.$auth.user.ip_addres
    }
  },

  methods: {
    async getOtherSessions() {
      const response = await this.$axios.get('/api/auth/sessions')
      this.allSessions = response.data.sessions
    },

    async deleteAllSessions(session){
      const dialog = confirm("Deseja mesmo remover todas as outras sessões? Esta ação é irreversível e você será deslogado.")
      
      if(dialog === true){
        try{
          const response = await this.$axios.get('/api/auth/logout_all')

          if(response.status === 202){
            this.showSuccessAlert('Todas as outras sessões foram revogadas.');
            this.getOtherSessions()
          }
        }catch(error){
          this.showErrorAlert('Ocorreu um erro e sua requisição não foi executada.');
          console.log(error)
        }
      }
    },

    async deleteSession(session) {
      const authorizationToken = session
      const instance = axios.create({
        baseURL: 'http://localhost:3000'
      })

      instance.defaults.headers.common['Authorization'] = `Bearer ${authorizationToken}`

      const response = await instance.get('/api/auth/logout')

      if (response.status === 202) {
        this.showSuccessAlert('Token removido com sucesso!');
        this.getOtherSessions()
      }
    },

    async getGeolocation() {
      const instance = axios.create({
        baseURL: 'https://ipapi.co/'
      })

      const response = await instance.get(`${this.session.ip_address}/json/`)

      if (response.status === 200) {
        this.session.location.city = response.data.city
        this.session.location.country = response.data.country
      }
    }
  },

  filters: {
    truncateString(value, length, omission = '...'){
      if(value.length <= length){
        return value
      }else{
        return value.slice(0, length) + omission
      }
    },
    formatDate(timestamp) {
      if (typeof timestamp === 'string') {
        timestamp = timestamp.replace(' UTC', '');
      }

      const date = new Date(timestamp);

      if (isNaN(date)) {
        return 'Data inválida';
      }

      return format(date, 'dd/MM/yyyy \'às\' HH:mm');
    },
  },

  mounted() {
    this.getOtherSessions()
    this.getGeolocation()
  },

  computed: {
    token() {
      const authStore = useAuthStore();
      return authStore.token;
    },
    nameUser() {
      return this.profile.username.toUpperCase();
    },
    userLocation() {
      if (this.session.location.city === '') {
        return 'Buscando localização...'
      } else {
        return `${this.session.location.city} - ${this.session.location.country}`
      }
    },


    sessionGeolocation(){
      return 
    },
  },
}
</script>
<style scoped>
.body-main {
  min-height: 600px;
}
</style>