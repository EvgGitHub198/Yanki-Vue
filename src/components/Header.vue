<template>
    <header class="header">
    <div class="navbar">
        <div class="navbar-container">
          <div class="navbar-menu">
            <a href="#" class="navbar-menu-item">NEW</a>
            <router-link to="catalog" class="navbar-menu-item">КАТАЛОГ</router-link>
            <a href="#" class="navbar-menu-item">О НАС</a>
          </div>
          <div class="navbar-logo">
            <router-link to="/" class="navbar-menu-item"><img src="@/assets/icons/logo.svg" alt="Home" /> </router-link>
          </div>
          <div class="navbar-language">
            <a href="#" class="navbar-language-item">RU</a>
            <a href="#" class="navbar-language-item">UAH</a>
          </div>
          <div class="navbar-icons">
            <a href="#" class="navbar-icon">
              <img src="@/assets/icons/magnifier.svg">
            </a>
            <a href="#" class="navbar-icon">
              <img src="@/assets/icons/wish.svg">
            </a>
            <template v-if="$store.state.isAuthenticated">
                <router-link to="/account" class="navbar-icon"><img src="@/assets/icons/user.svg"></router-link>
              </template>

              <template v-else>
                <router-link to="/login" class="navbar-icon"><img src="@/assets/icons/user.svg"></router-link>
              </template>
            <a href="#" class="navbar-icon">
              <img src="@/assets/icons/cart.svg">
            </a>
          </div>
        </div>

    </div>
    </header>
</template>


<script>


</script>



<style lang="scss">
.header { 
  
  background-size: cover;
  background-position: center;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  
}

.navbar {
  width: 100%;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar-logo img {
  height: 50px;
}

.navbar-menu {
  display: flex;
}

.navbar-menu-item {
  color: #333;
  font-size: 18px;
  text-decoration: none;
  margin-right: 30px;
  transition: all 0.3s ease;
}

.navbar-menu-item:hover {
  color: #e31b6d;
}

.navbar-icons {
  display: flex;
  align-items: center;
}

.navbar-icon {
  color: #333;
  font-size: 22px;
  margin-right: 15px;
  text-decoration: none;
}

.navbar-icon:hover {
  color: #e31b6d;
}

.navbar-language {
  display: flex;
  align-items: center;
  margin-left: 30px;
  color: white;
}

.navbar-language-item {
  color: #333;
  font-size: 18px;
  text-decoration: none;
  margin-right: 15px;
  transition: all 0.3s ease;
}

.navbar-language-item:hover {
  color: #e31b6d;
}

</style>