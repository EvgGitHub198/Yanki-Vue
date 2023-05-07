<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
      <div class="modal">
        <div class="modal-close" @click="closeModal">&#x2715;</div>
        <slot name="title">
          <h3 class="modal-title">Добавление товара</h3>
        </slot>
        <slot name="body">
          <div class="modal-content">
            <div class="file-upload">

              <label for="product_main_image">
                <img src="@/assets/img/photo.png" alt="Upload">
                <span ref="mainimage">Файл не выбран</span>
              </label>
              <input type="file" id="product_main_image" class="modal-content__input_image" name="product_main_image" ref="productMainImageInput" @change="updateMainImage">
                
              <label for="product_ex_image1">
                <img src="@/assets/img/photo.png" alt="Upload">
                <span ref="filename1">Файл не выбран</span>
              </label>
              <input type="file" class="modal-content__input_image" id="product_ex_image1" name="product_ex_image1" ref="productExImage1Input" @change="updateFileName(1)">  
                


                <label for="product_ex_image2">
                <img src="@/assets/img/photo.png" alt="Upload">
                <span ref="filename2">Файл не выбран</span>
                </label>
                <input type="file" class="modal-content__input_image" id="product_ex_image2" name="product_ex_image2" ref="productExImage2Input" @change="updateFileName(2)">
                
                
                <label for="product_ex_image3">
                <img src="@/assets/img/photo.png" alt="Upload">
                <span ref="filename3">Файл не выбран</span>
                </label>  
                <input type="file" class="modal-content__input_image"  id="product_ex_image3" name="product_ex_image3" ref="productExImage3Input" @change="updateFileName(3)">
                
                
                              
                <label for="product_ex_image4">
                <img src="@/assets/img/photo.png" alt="Upload">
                <span ref="filename4">Файл не выбран</span>
                </label>
                <input type="file" class="modal-content__input_image" id="product_ex_image4" name="product_ex_image4" ref="productExImage4Input" @change="updateFileName(4)">
                
                            
                <label for="product_ex_image5">
                <img src="@/assets/img/photo.png" alt="Upload">
                <span ref="filename5">Файл не выбран</span>
                </label>            
                <input type="file" class="modal-content__input_image" id="product_ex_image5" name="product_ex_image5" ref="productExImage5Input" @change="updateFileName(5)">
  
              </div>
            <input type="text" class="modal-content__input" placeholder="Наименование (Розовое Пальто)" name="name" v-model="productName">
            <input type="text" class="modal-content__input" placeholder="Slug (pink-coat)" name="slug" v-model="productSlug">
            <input type="number" class="modal-content__input" placeholder="Цена" name="price" v-model="productPrice">
          <div>
            <select required class="modal-content__input" name="category"  v-model="categorySlug">
                <option disabled selected value="">Выберите категорию</option>
                <option v-for="category in categories" :value="category.slug">{{ category.name }}</option>
            </select>

        </div>
            <div class="sizes">
                <div class="size" :class="{ 'selected': selectedSizes.includes('XS') }" @click="toggleSize('XS')">XS<input class="quantity-input" type="text" v-model="selectedSizesQuantity.XS"></div>
                <div class="size" :class="{ 'selected': selectedSizes.includes('S') }" @click="toggleSize('S')">S<input class="quantity-input" type="text" v-model="selectedSizesQuantity.S"></div>
                <div class="size" :class="{ 'selected': selectedSizes.includes('M') }" @click="toggleSize('M')">M<input class="quantity-input" type="text" v-model="selectedSizesQuantity.M"></div>
                <div class="size" :class="{ 'selected': selectedSizes.includes('L') }" @click="toggleSize('L')">L<input class="quantity-input" type="text" v-model="selectedSizesQuantity.L"></div>
                <div class="size" :class="{ 'selected': selectedSizes.includes('XL') }" @click="toggleSize('XL')">XL<input class="quantity-input" type="text" v-model="selectedSizesQuantity.XL"></div>
                <div class="size" :class="{ 'selected': selectedSizes.includes('XXL') }" @click="toggleSize('XXL')">XXL<input class="quantity-input" type="text" v-model="selectedSizesQuantity.XXL"></div>
            </div>

            <div class="error" v-if="errors" v-for="error in errors">
              {{ error }}
              <br />
            </div>

            <div class="text">   
                <textarea cols="30" rows="10" placeholder="Описание" class="description" name="description" v-model="productDescription"></textarea>
            </div>
          </div>
        </slot>
        <slot name="footer">
          <div class="modal-footer">
            <button class="modal-footer__button" @click="addProduct">
              ДОБАВИТЬ
            </button>
          </div>
        </slot>
      </div>
    </div>
  </template>


<script>
import axios from 'axios';

export default {
  name: "CreateProduct",

    data() {
    return {
        show: false,
        productName: '',
        productSlug: '',
        productPrice: '',
        categorySlug: '',
        productDescription: '',
        selectedSizes: [],
        selectedSizesQuantity: {},
        categories: [],
        errors: null,
       
    }
    },
  mounted(){
    axios
        .get('api/v1/categories')
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

  },
  methods: {
    updateMainImage() {
        const input = this.$refs[`productMainImageInput`];
      const fileNameSpan = this.$refs[`mainimage`];
      if (input.files.length > 0) {
        fileNameSpan.textContent = input.files[0].name;
        console.log('File name:', fileNameSpan.textContent);
      } else {
        fileNameSpan.textContent = 'Файл не выбран';
        console.log('File not selected');
      }

      },

    updateFileName(index) {
      const input = this.$refs[`productExImage${index}Input`];
      const fileNameSpan = this.$refs[`filename${index}`];

      console.log('input:', input);
      console.log('fileNameSpan:', fileNameSpan);

      if (input.files.length > 0) {
        fileNameSpan.textContent = input.files[0].name;
        console.log('File name:', fileNameSpan.textContent);
      } else {
        fileNameSpan.textContent = 'Файл не выбран';
        console.log('File not selected');
      }
    },

    closeModal() {
      this.show = false
    },

    addProduct() {
    const sizes = Object.keys(this.selectedSizesQuantity)
    .filter(size => this.selectedSizesQuantity[size] !== 0) // фильтруем размеры с нулевым количеством
    .map(size => ({
      size,
      quantity: this.selectedSizesQuantity[size]
    }));

    const data = new FormData();
    data.append('main_image', this.$refs.productMainImageInput.files[0]);
    data.append('name', this.productName);
    data.append('slug', this.productSlug);
    data.append('price', this.productPrice);
    data.append('category', this.categorySlug);
    sizes.forEach((size, index) => {
        data.append(`sizes[${index}]size`, size.size);
        data.append(`sizes[${index}]quantity`, size.quantity);
    });
    data.append('description', this.productDescription);
    
    const extraImageRefs = [
    this.$refs.productExImage1Input,
    this.$refs.productExImage2Input,
    this.$refs.productExImage3Input,
    this.$refs.productExImage4Input,
    this.$refs.productExImage5Input,
    ];

    const extraImages = [];
    extraImageRefs.forEach(ref => {
    if (ref.files.length > 0) {
        extraImages.push(ref.files[0]);
    }
    });

    for (let i = 0; i < extraImages.length; i++) {
    data.append(`extra_images[${i}]image`, extraImages[i]);
    }


  axios.post('api/v1/admin/products/', data)
    .then(response => {
        console.log(response.data);
        this.show = false;
        })
        .catch(error => {
        console.log(error);
        // this.errors = Object.values(error.response.data).map(el=>el[0]);
        this.errors = Object.entries(error.response.data).map(el=>el[0] + ' - ' + el[1])
        });
    },


    toggleSize(size) {
    if (this.selectedSizesQuantity) {
        const currentQuantity = this.selectedSizesQuantity[size] || 0;
        this.selectedSizesQuantity[size] = currentQuantity ? 0 : 1;
        const index = this.selectedSizes.indexOf(size);
        if (index > -1) {
        this.selectedSizes.splice(index, 1);
        } else {
        this.selectedSizes.push(size);
        }
        }
    },

  }
}
</script>


<style lang="scss" scoped>

.file-upload {
  justify-content: space-between;
  display: flex;
}

.file-upload img {
  width: 100px;
  height: 85x;
  cursor: pointer;
}


.file-upload input[type="file"] {
  display: none;
}

label {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.size {
  width: 65px;
  height: 30px;
  border: none;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  background-color: lightgray

}

.selected {
  background-color: #E0BEA2;
  color: white;
  font-weight: bold;
}
.sizes{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.modal-shadow {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
    z-index: 9999;
}

.modal {
    background: #fff;
    padding: 15px;
    min-width: 600px;
    min-height: 310px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &-close {
        border-radius: 50%;
        color: black;
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 12px;
        right: 15px;
        width: 20px;
        height: 20px;
        cursor: pointer;

    }
    &-title {
        color: black;
    }

    &-content {
        margin-bottom: 15px
    }
    &-content__input {
        min-width: 450px;
        min-height: 40px;
        margin-bottom: 20px;
        

    }
    &-content__input_image{
        margin-bottom: 10px;
      
 
    }

    &-footer {
        &__button {
            background-color: #E0BEA2;
            color: #fff;
            border: none;
            text-align: center;
            padding: 8px;
            font-size: 15px;
            font-weight: bold;
            min-height: 40px;
            min-width: 550px;
            cursor: pointer;
            
        }
    }
}
.error {
  color: red;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 14px;
}
.description{
    width: 550px;
    height: 150px;
    margin-top: 10px;

}
.file-upload{
    margin-bottom: 15px;
}
.quantity-input{
    width: 25px;
    height: 15px;
    margin-left: 1.5px;
    border-radius: 10px;
    border: none;
}
</style>