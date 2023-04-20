<template>
    <div  v-if="show" class="modal-shadow" @click.self="closeModal">
      <div class="modal">
        <div class="modal-close" @click="closeModal">&#x2715;</div>
        <slot name="title">
          <h3 class="modal-title">Редактирование категории</h3>
        </slot>
        <slot name="body">
          <div class="modal-content">
            <input type="file" multiple class="modal-content__input_image" name="category_image" ref="categoryImageInput">
            <input type="text" class="modal-content__input" placeholder="Наименование (Пальто)" name="name" v-model="categoryName">
            <input type="text" class="modal-content__input" placeholder="Slug (Coats)" name="slug" v-model="categorySlug">
          </div>
        </slot>
        <slot name="footer">
          <div class="modal-footer">
            <button class="modal-footer__button" @click="editCategory">
              ИЗМЕНИТЬ
            </button>
          </div>
        </slot>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "PutCategoryModal",
  
    props: {
      categoryData: {
        type: Object,
        required: true
      }
    },
  
    data: function () {
      return {
        show: false,
        categoryName: '',
        categorySlug: '',
      }
    },
  
    methods: {
      closeModal: function () {
        this.show = false
      },
      editCategory: async function () {
        const formData = new FormData();
        formData.append('name', this.categoryName);
        formData.append('slug', this.categorySlug);
        const categoryImageInput = this.$refs.categoryImageInput;
        if (categoryImageInput) {
          formData.append('category_image', categoryImageInput.files[0]);
        }
        try {
          const response = await axios.put(`/api/v1/admin/categories/${this.categoryData.id}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          });
          console.log('Категория успешно изменена!');
          console.log(response.data);
        } catch (error) {
          console.error('Ошибка при изменении категории:', error);
        }
      }
    }
  }
  </script>



<style lang="scss" scoped>
.modal-shadow {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
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
        margin-bottom: 20px
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
</style>