<template>
    <div class="breadcrumbs" v-if="showBreadcrumbs">
      <span class="crumb-text" v-for="(crumb, index) in crumbs" :key="index">
        <router-link :to="crumb.path">{{ crumb.label }}</router-link>
      </span>
    </div>
  </template>
  
  <script>
  export default {
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
          const matchingRoute = route.matched.find(route => route.path.includes(segment));
  
          if (matchingRoute && matchingRoute.meta && matchingRoute.meta.breadcrumb) {
            path += segment + '/';
            crumbs.push({ label: matchingRoute.meta.breadcrumb, path: path });
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
    },
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
  