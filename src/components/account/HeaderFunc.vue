<template>
<div id="header" class="header" :class="state.scrollTop > 16 ? 'header__blur' : ''">
  <div class="header__left">
    <ChevronLeftIcon 
      @click="$router.push({ 
        name: props.backRouteName,
        params: props.routeParams
      })" 
      class="header__item"/>
  </div>
  <div class="header__center">
    <div class="header__text">
      {{ props.centerText }}
    </div>
  </div>
  <div class="header__right">
    <template v-if="props.actions"
    v-for="action in props.actions">
      <QrCodeIcon v-if="action.icon == 'QrCodeIcon'" class="header__item" /> 
      <ShareIcon v-if="action.icon == 'ShareIcon'" class="header__item" /> 
      <BookmarkIcon v-if="action.icon == 'BookmarkIcon'" class="header__item" /> 
    </template>
    
  </div>
</div>
</template>


<script setup>
import { onMounted, reactive } from "vue";
import { ChevronLeftIcon, BookmarkIcon, ShareIcon, QrCodeIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
  centerText: String,
  backRouteName: String,
  routeParams: Object,
  actions: Array
});

const state = reactive({
  scrollTop: 0
});

onMounted(() => {
  let body = document.querySelector('body');
  body.addEventListener('scroll', () => {  
    state.scrollTop = body.scrollTop
  })
})
</script>


<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  height: 48px;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #efeff3;
  z-index: 100;
  transition: 0.3s;
  & > div {
    display: flex;
    align-items: center;
    text-align: center;
  }
  &__text {
    font-weight: 600;
    font-size: 14px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    box-orient: vertical;
    padding: 0 10px;
  }
  &__left {
    min-width: 80px;
  }
  &__right {
    min-width: 80px;
  }
  &__item {
    height: 22px;
    color: blue;
    &:last-child {
      margin: 0 20px;
    }
  }
  &__blur {
    background: rgba(255, 255, 255, 0.8);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 0 0 #c8c7cb;
  }
}
</style>