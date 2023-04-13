import { createStore } from 'vuex'


export default createStore({
state: {
 cart: { items: []
   },
 isAuthenticated: false,
 token: '',
 wishes: JSON.parse(localStorage.getItem('wishes')) || [],
},
getters: {
  wishes: state => state.wishes
},
mutations: {
initializeStore(state) {
 const cart = JSON.parse(localStorage.getItem('cart'));
 if (cart) {
   state.cart = cart;
 }
  if (localStorage.getItem('token')) {
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
  } else {
      state.token = ''
      state.isAuthenticated = false
  }
},
 setToken(state, token) {
   state.token = token
   state.isAuthenticated = true
 },
 removeToken(state) {
     state.token = ''
     state.isAuthenticated = false
 },
 clearCart(state) {
   state.cart = { items: [] }
   localStorage.setItem('cart', JSON.stringify(state.cart))
 },
 updateCart(state, cartItems) {
   state.cart.items = cartItems;
   localStorage.setItem('cart', JSON.stringify(state.cart))
 },
 removeItem(state, index) {
   state.cart.items.splice(index, 1);
   localStorage.setItem('cart', JSON.stringify(state.cart));
 },
 incrementItem(state, index) {
   state.cart.items[index].quantity++;
   localStorage.setItem('cart', JSON.stringify(state.cart));
 },
 decrementItem(state, index) {
   state.cart.items[index].quantity--;
   localStorage.setItem('cart', JSON.stringify(state.cart));
 },
 addToWishList(state, wishItem) {
  state.wishes.push(wishItem);
  localStorage.setItem('wishes', JSON.stringify(state.wishes));
},
removeFromWishList(state, index) {
  state.wishes.splice(index, 1);
  localStorage.setItem('wishes', JSON.stringify(state.wishes));
}

},
actions: {
 login({ commit }, token) {
     localStorage.setItem('token', token)
     commit('setToken', token)
 },

},
modules: {
}
})
