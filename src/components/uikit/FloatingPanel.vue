<template>
<div>
  <div @click="toggleFloating" 
    v-if="props.isShowFloating"
    class="floating__bg"></div>
    
  <div v-if="state.isShow"
     class="floating" 
     :style="{ 
       'height': props.size ? props.size + '%' : 'auto'
     }"
     :class="props.isShowFloating ? '' : 'floating__close'"> 
    
    <div class="floating__header">
      <div class="floating__separator">
        <div class="floating__separator-block">
        </div>
      </div>
      <h4>{{ title }}</h4>
      <div @click="toggleFloating" class="floating__header-close">
        <span>Закрыть</span>
      </div>
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
  title: String,
  size: String
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
  background-color: #efeff3;
  border-radius: 20px 20px 0 0;
  z-index: 200;
  position: fixed;
  bottom: 0;
  left: 0; 
  box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
  &__header {
    position: fixed;
    top: 0;
    padding: 10px 20px;
    background: #fff;
    z-index: 310;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-radius: 20px 20px 0 0;
    &-close {
      display: flex;
      align-items: center;
      color: blue;
      font-size: 14px;
      & span:not(:last-child) {
        margin-right: 5px;
      }
    }
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
    overflow: auto;
    z-index: 200;
    margin-top: 44px;
    height: 100%;
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