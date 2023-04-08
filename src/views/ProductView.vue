<template>
    <Header />
    <div class="product-page">
      <div class="images-container">
        <div class="extra-images">
  <div class="image-column" v-for="(image, index) in images.slice(1)" :key="index">
    <img :src="config.BACKEND_URL + image" width="100" height="100" @click="changeMainImage(index + 1)" />
  </div>
</div>
        <div class="main-image">
          <div class="image-controls">
            <button @click="changeMainImagePrev" class="prev-image-button">&#8249;</button>
            <img :src="config.BACKEND_URL + currentImage" width="450" height="540" v-if="currentImage" />
            <button @click="changeMainImageNext" class="next-image-button">&#8250;</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </template>


  <script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import axios from 'axios';
  import { BACKEND_URL } from '@/config.js';
  
  export default{
    name: 'ProductView',
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        product: {},
        config: {
          BACKEND_URL: BACKEND_URL
        },
        currentIndex: 0,
      };
    },
    computed: {
      images() {
        if (this.product.extra_images) {
          return [this.product.main_image, ...this.product.extra_images.map(image => image.image)];
        } else {
          return [this.product.main_image];
        }
      },
      currentImage() {
        return this.images[this.currentIndex];
      },
    },
    mounted() {
      this.getProduct();
    },
    methods: {
      async getProduct() {
        const category_slug = this.$route.params.category_slug;
        const product_slug = this.$route.params.product_slug;
        await axios
          .get(`api/v1/products/${category_slug}/${product_slug}`)
          .then(response => {
            this.product = response.data;
            document.title = 'Yanki | ' + this.product.name;
          })
          .catch(error => {
            console.log(error);
          });
      },
      changeMainImage(index) {
        this.currentIndex = index;
      },
      changeMainImagePrev() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        } else {
          this.currentIndex = this.images.length - 1;
        }
      },
      changeMainImageNext() {
        if (this.currentIndex < this.images.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
      },
    },
    watch: {
      currentIndex() {
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
        });
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .images-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  
  .extra-images img{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .image-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  
  .image-column {
    margin-right: 10px;
    margin-bottom: 5px;
  }
  
  .product-page {
    margin-left: 100px;
    margin-top: 100px;
  }

  .image-controls {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.prev-image-button,
.next-image-button {
  margin: 4px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  border: none;
  background: none;
  color: black;
  font-size: 25px;
  cursor: pointer;
}

.prev-image-button {
  left: 0;
}

.next-image-button {
  right: 0;
}
  </style>
  