<template>
<div class="header">
  <div class="header__left">
    <span @click="$router.push({ 
        name: props.backRouteName,
        params: props.routeParams
      })" 
      class="material-icons-round header__item">arrow_back_ios</span>
  </div>
  <div class="header__center">
    <div class="header__text">
      {{ props.centerText }}
    </div>
  </div>
  <div class="header__right">
    
  </div>
</div>
</template>


<script setup>
const props = defineProps({
  centerText: String,
  backRouteName: String,
  routeParams: Object
});
</script>


<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  height: 45px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 100;
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
  }
  &__text {
    font-weight: 600;
    font-size: 12px;
    overflow: hidden;
    text-align: center;
    height: auto;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    box-orient: vertical;
    padding: 0 10px;
    width: 100%;
  }
  &__item:last-child {
    margin: 0 20px;
  }
}
</style>