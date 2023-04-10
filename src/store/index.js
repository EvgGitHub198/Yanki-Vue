import { createStore } from 'vuex'


export default createStore({
 state: {
  //  cart:{
  //    items: [],
  //  },
   isAuthenticated: false,
   token: '',
 },
 getters: {
 },
 mutations: {
  initializeStore(state) {
    // if (localStorage.getItem('cart')) {
    //   state.cart = JSON.parse(localStorage.getItem('cart'))
    // } else {
    //   localStorage.setItem('cart', JSON.stringify(state.cart))
    // }

    if (localStorage.getItem('token')) {
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    } else {
      state.token = ''
      state.isAuthenticated = false
    }
  },

//   addToCart(state, { product, size }) {
//     const itemIndex = state.cart.items.findIndex(item => {
//       return item.product.id === product.id && item.size === size;
//     });
//     if (itemIndex !== -1) {
//       state.cart.items[itemIndex].quantity++;
//     } else {
//       state.cart.items.push({ product: product, size: size, quantity: 1 });
//     }
//     localStorage.setItem('cart', JSON.stringify(state.cart));
//   },

// incrementCartItemQuantity(state, cartItemIndex) {
//   state.cart.items[cartItemIndex].quantity++;
//   localStorage.setItem('cart', JSON.stringify(state.cart));
// },
// decrementCartItemQuantity(state, cartItem) {
//   const cartItemIndex = state.cart.items.findIndex(
//     item => item.product.id === cartItem.product.id && item.size === cartItem.size
//   );
//   if (cartItemIndex > -1) {
//     state.cart.items[cartItemIndex].quantity -= 1;
//     if (state.cart.items[cartItemIndex].quantity === 0) {
//       state.cart.items.splice(cartItemIndex, 1);
//     }
//   }

//   localStorage.setItem('cart', JSON.stringify(state.cart));
// },

//   clearCart(state) {
//     state.cart.items = []
//     localStorage.setItem('cart', JSON.stringify(state.cart))
//   },
//   removeFromCart(state, index) {
//     state.cart.items.splice(index, 1);
//     state.cart = {...state.cart}; 
//     localStorage.setItem('cart', JSON.stringify(state.cart));
//   }
  
  
},
 actions: {
   login({ commit }, token) {
       localStorage.setItem('token', token)
       commit('setToken', token)
   }
},
 modules: {
 }
})
