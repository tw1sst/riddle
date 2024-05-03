<template>
<div>
  <div @click="togglePopup" 
    v-if="props.isShowPopup"
    class="popup__bg"></div>
    
  <slot v-if="!state.isShow" />
  
  <div v-else class="popup__container">
    <div class="popup__item">
      <slot />
    </div>
   
    <div class="popup" > 
      {{ props.isShowPopup }}
      {{ state.isShow }}
    </div>
  </div>
</div>
</template>


<script setup>
import { reactive, watch } from "vue";
const $emit = defineEmits()
const props = defineProps({
  isShowPopup: Boolean,
})
const state = reactive({
  isShow: false,
})

watch(
  () => props,
  (props, prevState) => {
    state.isShow = !state.isShow
  },
  { deep: true }
)

const togglePopup = () => {
  $emit('togglePopup')
}
</script>


<style scoped lang="scss">
.popup {
  z-index: 200;
  width: 200px;
  height: 300px;
  border-radius: 10px;
  background-color: white;
  position: absolute;
  margin-top: 50px;
  margin-left: 4px;
  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
  &__bg {
    background: rgba(0, 0, 0, 0.2);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    width: 100vw;
    height: 100vh;
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  &__item {
    z-index: 210;
    position: relative;
    background-color: white;
    box-shadow: 0 0 0 4px white;
    margin: 0;
    border-radius: 5px;
  }
}
</style>