import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import LogInView from '../views/LogInView.vue'
import RegisterView from '../views/RegisterView.vue'
import AccountView from '../views/AccountView.vue'
import CategoryView from '../views/CategoryView.vue'
import ProductView from '../views/ProductView.vue'
import AboutView from '../views/AboutView.vue'
import CartView from '../views/CartView.vue'
import WishListView from '../views/WishListView.vue'
import SearchView from '../views/SearchView.vue'
import SuccessView from '../views/SuccessView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import ReturnRulesView from '../views/ReturnRulesView.vue'
import ContactView from '../views/ContactsView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      breadcrumb: 'Главная',
    },
    
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogView,
    meta: {
      breadcrumb: 'Каталог',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView,
    meta: {
      breadcrumb: 'Вход',
    },
  },
  
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      breadcrumb: 'Регистрация',
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordView,
    meta: {
      breadcrumb: 'Восстановление пароля',
    },
  },
  {
    path: '/return-rules',
    name: 'return-rules',
    component: ReturnRulesView,
    meta: {
      breadcrumb: 'Обмен и возврат',
    },
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactView,
    meta: {
      breadcrumb: 'Контакты',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      breadcrumb: 'О нас',
    },
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: {
      breadcrumb: 'Корзина',
    },
  },
  {
    path: '/cart/success',
    name: 'success',
    component: SuccessView,
  },
  {
    path: '/wish',
    name: 'wish',
    component: WishListView,
    meta: {
      breadcrumb: 'Избранное',
    },
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta: {
      breadcrumb: 'Поиск',
    },
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
    meta: {
      requireLogin: true,
      breadcrumb: 'Личный кабинет',
    }
  },
  {
    path: '/catalog/:category_slug',
    name: 'category',
    component: CategoryView,
    meta: {
      breadcrumb: 'Каталог',
    }
    
  },
  {
    path: '/catalog/:category_slug/:product_slug',
    name: 'product',
    component: ProductView,
    meta: {
      breadcrumb: 'Каталог',
    }
  }



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  next();
});


export default router