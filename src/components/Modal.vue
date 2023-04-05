<template>
   
      <div class="modal-overlay" @click.self="$emit('close')">
       
          <slot />
          
        </div>
        
    
</template>
  
  <style lang="scss" scoped>
 
  .modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 0;
    left: 0;
    
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-content {
    position: relative;
    width: 80%;
    max-width: 600px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  
  </style>
  