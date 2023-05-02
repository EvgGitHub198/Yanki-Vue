<template>
    <div class="loading-container" v-if="loading">
      <div class="overlay"></div>
      <div class="loading">
        <img src="@/assets/icons/loading.gif" alt="Loading...">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loading',
    props: {
      loading: {
        type: Boolean,
        required: true,
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.603) /* светло-серый цвет с прозрачностью 0.5 */
    
  }
  
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;

  }
  
  .loading img {
    width: 50px;
    height: 50px;
  }
  </style>