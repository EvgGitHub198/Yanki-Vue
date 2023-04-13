<template>
    <div class="account-page">
      <h1 class="title">My account</h1>
      <p v-if="isAdmin">Вы администратор</p>
      <p v-else>Вы пользователь</p>
      <button @click="logout()" class="btn-logout">Выйти</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AccountView',
    data() {
      return {
        isAdmin: false
      }
    },
    mounted() {
      document.title = 'My account | Yanki'
      this.checkIsAdmin()
    },
    methods: {
        logout() {
  axios.post('/api/v1/token/logout/')
    .then(response => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      localStorage.removeItem('isAdmin') 
      this.$store.commit('removeToken')
      this.$router.push('/')
      setTimeout(function() {
        location.reload();
      }, 300);

    })
    .catch(error => {
      console.log(error)
    })
    },
checkIsAdmin() {
  const isAdmin = localStorage.getItem('isAdmin')
  if (isAdmin !== null) {
    this.isAdmin = JSON.parse(isAdmin)
  } else {
    axios.get('/api/v1/is_admin/')
      .then(response => {
        this.isAdmin = response.data.is_admin
        localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

    }
  }
  </script>
  
  <style lang="scss" scoped>
  .account-page {
    margin-top: 100px;
    height: 100vh;
  }
  </style>
  