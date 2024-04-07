<template>
<div>
  <div @click="toggleFloating" 
    v-if="props.isShowFloating"
    class="floating__bg"></div>
    
  <div v-if="state.isShow"
     class="floating" 
     :class="props.isShowFloating ? '' : 'floating__close'"> 
    
    <div class="floating__header">
      <div class="floating__separator">
        <div class="floating__separator-block">
        </div>
      </div>
      <h3>{{ title }}</h3>
      <span 
        @click="toggleFloating"
        class="material-icons-round">close</span>
    </div>
    <div class="floating__content">
      <slot />
    </div>
  </div>
</div>
</template>


<script setup>
import { reactive, watch } from "vue";
const $emit = defineEmits()
const props = defineProps({
  isShowFloating: Boolean,
  title: String
})
const state = reactive({
  isShow: false,
})

watch(
  () => props,
  (props, prevState) => {
    state.isShow = true
  },
  { deep: true }
)

const toggleFloating = () => {
  $emit('toggleFloating')
}
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
    background-color: red;
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
  &__separator {
    z-index: 202;
    position: absolute;
    top: -15px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    &-block {
      width: 50px;
      height: 5px;
      background-color: white;
      border-radius: 10px;
      opacity: 0.7;
    }
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