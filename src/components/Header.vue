<template>
  <header class="header" :class="{'header-home': isHomePage,'header-other': !isHomePage, 'is-hidden': !showNavbar }">
  <div class="navbar">
      <div class="navbar-container">
        <div class="navbar-menu">
          <router-link to="/catalog/new" class="navbar-menu-item">NEW</router-link>
          <router-link to="/catalog" class="navbar-menu-item">КАТАЛОГ</router-link>
          <router-link to="/about" class="navbar-menu-item">О НАС</router-link>
        </div>
        <div class="navbar-logo">
          <router-link to="/" class="navbar-menu-item"><img src="@/assets/icons/logo-2.svg" alt="Home"></router-link>
        </div>
        <div class="navbar-language">
          <a href="#" class="navbar-language-item">RU</a>
          <a href="#" class="navbar-language-item">UAH</a>
        </div>
        <div class="navbar-icons">
          <router-link to="/search" class="navbar-icon"><img src="@/assets/icons/magnifier-2.svg"></router-link>
          <router-link to="/wish" class="navbar-icon"><img src="@/assets/icons/wish-2.svg"></router-link>
          <template v-if="$store.state.isAuthenticated">
              <router-link to="/account" class="navbar-icon"><img src="@/assets/icons/user-2.svg"></router-link>
            </template>
            <template v-else>
              <router-link to="/login" class="navbar-icon"><img src="@/assets/icons/user-2.svg"></router-link>
            </template>
            <router-link to="/cart" class="navbar-menu-item"><img src="@/assets/icons/cart-2.svg"></router-link>
            <div v-if="cartTotalLength>0" class="cart-counter">{{ cartTotalLength }}</div>
        </div>
      </div>

  </div>
  </header>
</template>



<script>
import { mapState } from 'vuex';

export default {
data() {
  return {
    showNavbar: true,

  };
},
mounted() {
this.cart = this.$store.state.cart
this.previousScrollPosition = 0;
window.addEventListener("scroll", this.handleScroll);
},
destroyed() {
  window.removeEventListener("scroll", this.handleScroll);
},
methods: {
handleScroll() {
  const currentScrollPosition = window.pageYOffset;
  if (currentScrollPosition > this.previousScrollPosition) {
    this.showNavbar = false;
  } else {
    this.showNavbar = true;
  }
  this.previousScrollPosition = currentScrollPosition;
}
},
computed: {
  ...mapState(['cart']),
  cartTotalLength() {
    let totalLength = 0;
    for (let i = 0; i < this.cart.items.length; i++) {
      totalLength += this.cart.items[i].quantity;
    }
    return totalLength;
  },
  isHomePage() {
      return this.$route.path === '/';
    },
},
};
</script>





<style lang="scss">


.navbar-icons .cart-counter {
position: absolute;
top: -2px;
right: 14px;
width: 21px;
height: 21px;
background-color: #E0BEA2;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
font-size: 11px;
color: black;
font-weight: bold;
z-index: 1;
}

.navbar-icons .cart-icon {
position: relative;
}

.header-other.is-hidden, .header-home.is-hidden {
transform: translateY(-150%);
}
.header-home {
  margin-left: 0;
  margin-right: 0;
  background-size: cover;
  background-position: center;
  position: fixed;
  transition: all 0.3s ease;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  height: 70px;
}
.header-other {
  margin-left: 0;
  margin-right: 0;
  background-size: cover;
  background-position: center;
  position: fixed;
  transition: all 0.3s ease;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.95);
}

.navbar {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 17px;
}

.navbar-container {
display: flex;
align-items: center;
}



.navbar-menu {
display: flex;

}

.navbar-menu-item {
color: black;
font-size: 18px;
text-decoration: none;
margin-right: 30px;
transition: all 0.3s ease;
cursor: pointer;
}

.navbar-menu-item:hover {
color: #E0BEA2;
}

.navbar-logo img {
max-height: 100%;
max-width: 100%;
}

.navbar-logo {
flex-grow: 1;
text-align: center;
margin-right: -60px;
}

.navbar-icon {
color: black;
font-size: 22px;
margin-right: 22px;
text-decoration: none;
cursor: pointer;
}

.navbar-icon:hover {
color: #E0BEA2;
}

.navbar-language {
display: flex;
color: black;
margin-right: 40px;
}

.navbar-language-item {
color: black;
font-size: 18px;
text-decoration: none;
margin-right: 15px;
transition: all 0.3s ease;
}

.navbar-language-item:hover {
color: #E0BEA2;
}
.about-us {
text-decoration: none;
color: black;
}
</style>