<template>
     <h1 class="title">My account</h1>
<button @click="logout()" class="btn-logout">Выйти</button>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AccountView',

    mounted() {
        document.title = 'My account | Yanki'
    },
    methods: {
        logout() {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")
            this.$store.commit('removeToken')
            this.$router.push('/')
        },

    }
}
</script>

<style lang="scss" scoped>

</style>
