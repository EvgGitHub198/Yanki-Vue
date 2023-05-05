<template>
  <div class="reset-page">
      <div class="reg-form">
          <div class="title">
              <h1>Сброс пароля</h1>
              <form @submit.prevent="submitForm">
                  <div class="email">                   
                      <div class="email-input">
                          <input type="text" class="input" v-model="email"  required placeholder="Ваш e-mail*">
                      </div>
                  </div>
                  <div class="errors" v-if="errors.length">
                      <p v-for="(error, index) in errors" v-bind:key="index">{{ error }}</p>     
                  </div>
                  <div class="button">
                      <div class="btn">
                          <button class="reg-btn">Сбросить</button>
                      </div>
                  </div>  
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ResetPassword",
  data() {
      return {
          email: '',
          errors: []
      }
  },
  mounted() {
      document.title = 'Yanki | Reset password'
  },
  methods: {
      async submitForm() {
          const formData = {
              email: this.email,
          }

          try {
              const response = await axios.post('/api/v1/reset_password/', formData)
              this.$router.push('/login')
          } catch (error) {
              if (error) {
                  this.errors.push('Несуществующая почта!')
                  console.log(JSON.stringify(error))
              }
          }
      }
  }
}
</script>


<style lang="scss" scoped>
.reset-page {
    min-height: 100vh;
    display: flex;
  justify-content: center;
  align-items: center;
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