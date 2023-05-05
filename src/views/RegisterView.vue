<template>
    <div class="page-register">
        <div class="reg-form">
            <div class="title">
                <h1>Регистрация</h1>
                <form @submit.prevent="submitForm">
                    <div class="username">              
                        <div class="username-input">
                            <input type="text" class="input" v-model="username" placeholder="Ваше имя*">
                        </div>
                    </div>
                    <div class="email">                
                        <div class="email-input">
                            <input type="text" class="input" v-model="email" placeholder="Ваш e-mail*">
                        </div>
                    </div>
                    <div class="password">                      
                        <div class="password-input">
                            <input type="password" class="input" v-model="password" placeholder="Ваш пароль*">
                        </div>
                    </div>
                    <div class="password">         
                        <div class="password-input">
                            <input type="password" class="input" v-model="password2" placeholder="Повторите пароль*">
                        </div>
                    </div>              
                    <div class="errors" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>     
                    </div>
                    <div class="button">
                        <div class="btn">
                            <button class="reg-btn">Зарегистрироваться</button>
                        </div>
                    </div>  
                    <hr>
                    <p>Или нажмите <router-link to="/login">здесь,</router-link> чтобы <strong>войти</strong></p>
                </form>
            </div>
        </div>

    </div>

</template>


<script>
import axios from 'axios'



export default {
    name: 'RegisterView',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: []
        }
    },
    mounted() {
        if (this.$store.getters.isAuthenticated) {
            this.$router.push('/')
        }
    },

    methods: {
        submitForm() {
            this.errors = []
            if (this.username === '') {
                this.errors.push('Поле пользователя пустое!')
            }
            if (this.password !== this.password2) {
                this.errors.push('Пароли не совпадают!')  
            }
            if (!this.errors.length) {
                const formData = {
         
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                axios
                    .post("/api/v1/users/", formData)
                    .then(response => {
                        const loginData = {
                            email: formData.email,
                            password: formData.password
                        }
                        axios
                            .post("/api/v1/token/login/", loginData)
                            .then(response => {
                                const token = response.data.auth_token
                                localStorage.setItem('token', token)
                                this.$store.dispatch('login', token)
                                this.$router.push('/')
                                setTimeout(function() {
                                location.reload();
                                }, 10);
                            })
                            .catch(error => {
                                this.errors.push('Невозможно выполнить вход после регистрации.')
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${error.response.data[property]}`)
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

.username,
.email,
.password {
  margin-bottom: 10px;
}

.username label,
.email label,
.password label {
  font-weight: bold;
}

.username-input,
.email-input,
.password-input {
  display: flex;
  width: 400px;
  height: 50px;
}

.username-input input,
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