<template>


<Header />

<router-view/>

<Footer />
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>   -->

</template>

<script>
import axios from 'axios'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  data() {
    return {

      // cart: {
      //   items: []
      // }
    }
  },
  components: {
    Header,
    Footer,
},

  beforeCreate() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted() {
        // this.cart = this.$store.state.cart
        
    },
  //     computed: {
  //   cartTotalLength() {
  //     let totalLength = 0
  //     for(let i = 0; i < this.cart.items.length; i++){
  //       totalLength += this.cart.items[i].quantity
  //     }
  //     return totalLength
  //   }
  // }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>