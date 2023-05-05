<template>
  <div>
    <Loading :loading="loading" />
    <Header />
    <Breadcrumbs />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Loading from '@/components/Loading.vue';
import Breadcrumbs from './components/Breadcrumbs.vue';


export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Loading,
    Breadcrumbs
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    startLoading() {
      this.loading = true;
    },
    stopLoading() {
      this.loading = false;
    }
  },
  created() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
    axios.interceptors.request.use((config) => {
      this.startLoading();
      return config;
    }, (error) => {
      this.stopLoading();
      return Promise.reject(error);
    });

    // Установка флага loading при получении ответа
    axios.interceptors.response.use((response) => {
      this.stopLoading();
      return response;
    }, (error) => {
      this.stopLoading();
      return Promise.reject(error);
    });
  }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading img {
  width: 50px;
  height: 50px;
}

</style>