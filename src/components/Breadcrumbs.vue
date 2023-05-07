<template>
  <div class="breadcrumbs" v-if="showBreadcrumbs">
    <span class="crumb-text" v-for="(crumb, index) in crumbs" :key="index">
      <router-link :to="crumb.path">{{ crumb.label }}</router-link>
    </span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      category_name: '',
    };
  },
  computed: {
    showBreadcrumbs() {
      return this.$route.name !== 'home';
    },
    crumbs() {
      const route = this.$route;
      const routeParts = route.path.split('/').filter(part => part !== '');
      const crumbs = [];

      // Add breadcrumb for home page
      if (route.name !== 'home') {
        crumbs.push({ label: 'Главная', path: '/' });
      }

      // Add breadcrumb for each route segment
      let path = '/';
      for (let i = 0; i < routeParts.length; i++) {
        const segment = routeParts[i];
        const matchingRoute = route.matched.find(route => {
          const routePath = route.path.replace(/:\w+/, ''); 
          return routePath.includes(segment);
        });

        if (matchingRoute && matchingRoute.meta && matchingRoute.meta.breadcrumb) {
          path += segment + '/';
          crumbs.push({ label: matchingRoute.meta.breadcrumb, path: path });
        } else if (this.category_name && i === routeParts.length - 2) {
          continue;
        } else if (this.category_name && i === routeParts.length - 1) {
          const categorySlug = this.$route.params.category_slug;
          crumbs.push({ label: this.category_name, path: `/catalog/${categorySlug}` });
        } else {
          path += segment + '/';
          crumbs.push({ label: this.capitalize(segment), path: path });
        }
      }

      return crumbs;
    },
  },
  methods: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async getCategoryName(categorySlug) {
      try {
        const response = await axios.get(`/api/v1/products/${categorySlug}`);
        return response.data.name;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async fetchCategoryName() {
      const categorySlug = this.$route.params.category_slug;
      this.category_name = await this.getCategoryName(categorySlug);
    },
  },
  created() {
    if (this.$route.name === 'category') {
      this.fetchCategoryName();
    } else if (this.$route.name === 'product') {
      const categorySlug = this.$route.params.category_slug;
      this.fetchCategoryName(categorySlug);
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.name === 'category') {
        this.fetchCategoryName();
      } else if (to.name === 'product') {
        const categorySlug = to.params.category_slug;
        this.fetchCategoryName(categorySlug);
      } else {
        this.category_name = '';
      }
    },
  }
};
</script>



<style>
.breadcrumbs span:not(:last-child)::after {
content: '>';
color: #E0BEA2;
font-weight: bold;
margin: 5px 10px;
white-space: normal;
}

.breadcrumbs a {
color: black;
text-decoration: none;
}
.breadcrumbs a:hover {
color: #E0BEA2;
transition: all 0.3s ease;
}
.breadcrumbs {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-left: 7%;
  margin-top: 90px;
  z-index: 9999;
}

</style>
