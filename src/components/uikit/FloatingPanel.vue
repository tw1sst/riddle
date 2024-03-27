<template>
<div @click="$emit('toggleFloating')" class="floating__bg"></div>

<div v-if="isShowFloating" class="floating" :class="isShowFloating ? '' : 'floating__close'"> 
  <div class="floating__header">
    <h3>{{ title }}</h3>
    <span 
      @click="$emit('toggleFloating')"
      class="material-icons-round">close</span>
  </div>
      
  <div class="floating__content">
    <slot />
  </div>
</div>

</template>


<script setup lang="ts">
defineProps({
  isShowFloating: Boolean,
  title: String
})
</script>


<style scoped lang="scss">
.floating {
  -webkit-animation-name: slideInTop;
  animation-name: slideInTop;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  &__close {
    -webkit-animation-name: slideInBottom;
    animation-name: slideInBottom;
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
}
@-webkit-keyframes slideInTop {
  0% {
	  -webkit-transform: translateY(100%);
	  transform: translateY(100%);
	  visibility: visible;
  }
  100% {
	  -webkit-transform: translateY(0);
	  transform: translateY(0);
  }
}
@keyframes slideInTop {
  0% {
	  -webkit-transform: translateY(100%);
	  transform: translateY(100%);
	  visibility: visible;
  }
  100% {
	  -webkit-transform: translateY(0);
	  transform: translateY(0);
  }
} 

@-webkit-keyframes slideInBottom {
  0% {
  	-webkit-transform: translateY(0);
  	transform: translateY(0);
  	visibility: visible;
  }
  100% {
  	-webkit-transform: translateY(100%);
  	transform: translateY(100%);
  	display: none;
  }
}
@keyframes slideInBottom {
  0% {
  	-webkit-transform: translateY(0);
  	transform: translateY(0);
  	visibility: visible;
  }
  100% {
  	-webkit-transform: translateY(100%);
  	transform: translateY(100%);
  }
} 


.floating {
  width: 100%;
  height: auto;
  max-height: 80vh;
  background-color: white;
  border-radius: 20px 20px 0 0;
  z-index: 200;
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: auto;
  box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
  &__header {
    heigth: 10px;
    position: fixed;
    top: 0;
    padding: 10px 20px;
    background-color: #fff;
    z-index: 201;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-radius: 20px 20px 0 0;
  }
  &__content {
    padding: 60px 20px 20px 20px;
  }
  &__bg {
    width: 100vw;
    height: 100vh;
    background-color: black;
    z-index: 150;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.5;
  }
}
</style>