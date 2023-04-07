<template>
       <Header />
    <div class="page-register">
        <div class="reg-form">
            <div class="title">
                <h1>Вход</h1>
                <form @submit.prevent="submitForm">
                    <div class="email">                   
                        <div class="email-input">
                            <input type="text" class="input" v-model="email"  required placeholder="Ваш e-mail*">
                        </div>
                    </div>
                    <div class="password">                      
                        <div class="password-input">
                            <input type="password" class="input" v-model="password" required placeholder="Ваш пароль*">
                        </div>
                    </div>       
                    <div class="errors" v-if="errors.length">
                        <p v-for="(error, index) in errors" v-bind:key="error">{{ error }}</p>     
                    </div>
                    <div class="button">
                        <div class="btn">
                            <button class="reg-btn">Войти</button>
                        </div>
                    </div>  
                    <hr>
                    <p>Или нажмите <router-link to="/register">здесь,</router-link> чтобы <strong>зарегистрироваться</strong></p>
                </form>
            </div>
        </div>
    </div>
    <Footer />
</template>


<script>
import axios from 'axios'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


export default {
    name: 'LogInView',
    data() {
        return {
            email: '',
            password: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Yanki | LogIn'
    },
    components:{
        Header,
        Footer
    },
    methods: {
        async submitForm() {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            const formData = {
                email: this.email,
                password: this.password
            }
        await axios
            .post("/api/v1/token/login/", formData)
            .then(response => {
                const token = response.data.auth_token
                this.$store.commit('setToken', token)
                
                axios.defaults.headers.common["Authorization"] = "Token " + token
                localStorage.setItem("token", token)
                const toPath = this.$route.query.to || '/'
                this.$router.push(toPath)
            })
            .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }
                            console.log(JSON.stringify(error.response.data))
                        }
                        else if (error.message) {
                            this.errors.push('Что-то пошло не так. Повторите!')
                            console.log(JSON.stringify(error))
                        }
                    
                    })
        }
    }
}
</script>

<style lang="scss" scoped>
.page-register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.reg-form {
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  width: 400px;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}


.email,
.password {
  margin-bottom: 10px;
}


.email label,
.password label {
  font-weight: bold;
}


.email-input,
.password-input {
  display: flex;
  width: 400px;
  height: 50px;
}


.email-input input,
.password-input input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.errors {
  margin-top: 10px;
  color: red;
}

.button {
  margin-top: 20px;
}

.btn {
  display: flex;
  justify-content: center;
}

.reg-btn {
  background-color: #E0BEA2;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
  width: 400px;
  height: 50px;
}

hr {
  margin: 20px 0;
}

</style>