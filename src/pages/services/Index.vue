<template>
<div class="services">  
  <div class="services__block">
  <h2>🚀 Riddle Verse</h2><br/>
  
  <a-input class="services__search" v-model:value="state.search" placeholder="Поиск..">
    <template #suffix>
      <span class="material-icons-round">search</span>
    </template>
  </a-input><br/><br/>
    
  <div class="services__type">
    <div :class="state.activeType == 1 ? 'services__type-active' : ''"
      @click="state.activeType = 1"
      class="services__type-item">
      🔍 Обзор
    </div>
    <div :class="state.activeType == 2 ? 'services__type-active' : ''"
      @click="state.activeType = 2"
      class="services__type-item">
      💙 Избранное
    </div>
  </div><br/>
  
  <a-carousel arrows dots-class="slick-dots" class="services__slider" autoplay>
    <div v-for="slide in mainSliderItems" 
      class="services__slider-item">
      <img :src="slide.cover" class="services__slider-cover">
      <div class="services__slider-emoji">
        {{ slide.emoji }}
      </div>
      <div class="services__slider-content">
        <div class="services__slider-title">
          {{ slide.title }}
        </div>
        <div class="services__slider-subtext">
          {{ slide.subtext }}
        </div>
        <div class="services__slider-button">
          <a-button  
            type="primary">
            {{ slide.buttonText }}
        </a-button>
        </div>
      </div>
    </div>
  </a-carousel><br/>
  
    <h3>Все сервисы</h3>
    
    <div class="services__grid">
      <div v-for="item in services" 
        @click="$router.push({ name: item.routeName })"
        class="services__grid-item">
        <div class="services__grid-icon">
          <span class="material-icons-round">
            {{ item.icon }}
          </span>
        </div>
        <div class="services__grid-title">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script setup>
import {reactive } from "vue";

const state = reactive({
  activeType: "1",
  search: ""
});

const mainSliderItems = [
  {
    title: "Умная лента",
    subtext: "Умная лента по вашим интересам на основе AI, которая подстраивается под вас",
    cover: "https://framerusercontent.com/images/AQJgmakK2cb0EcVoMZe1ZmFF0Q.jpg",
    buttonText: "Перейти к ленте",
    buttonRedirect: "ContentHome",
    emoji: "📚"
  },
  {
    title: "Свайп-Лента",
    subtext: "Читайте новости в новом удобном формате, просто свайпая их вправо и влево",
    cover: "https://static.vecteezy.com/system/resources/previews/034/440/425/non_2x/light-blue-red-blurred-backdrop-vector.jpg",
    buttonText: "Начать свайпать",
    buttonRedirect: "ServiceNewsSwipe",
    emoji: "👆"
  },
  {
    title: "Riddle Motors",
    subtext: "Покупайте и продавайте авто с выгодой у проверенных пользователей",
    cover: "https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-49273.jpg",
    buttonText: "Перейти к маркету",
    buttonRedirect: "AutoMarket",
    emoji: "🚘"
  },
  {
    title: "Riddle Skill",
    subtext: "Найдите школу по интересам или создайте свою и настройте процесс обучения",
    cover: "https://static.vecteezy.com/system/resources/previews/002/537/004/original/light-pink-blue-abstract-blurred-background-colorful-abstract-illustration-with-gradient-background-for-ui-designers-vector.jpg",
    buttonText: "Найти школу",
    buttonRedirect: "SkillHome",
    emoji: "🎓"
  },
]

const services = [
  {
    id: 1,
    title: "Лента новостей",
    icon: "feed",
    routeName: "ContentHome",
  },
  {
    id: 2,
    title: "Свайп новостей",
    icon: "swipe_vertical",
    routeName: "ServiceNewsSwipe",
  },
  {
    id: 3,
    title: "Riddle Motors",
    icon: "directions_car",
    routeName: "AutoMarket",
  },
  {
    id: 4,
    title: "Riddle Skill (обучение)",
    icon: "school",
    routeName: "SkillHome",
  },
  {
    id: 5,
    title: "Riddle Wallet",
    icon: "wallet",
    routeName: "ServiceWallet",
  },
]
</script> 


<style lang="scss" scoped>
.services {
  padding: 10px 20px;
  &__slider {
    margin: 0 -20px;
    :deep(.slick-dots) {
      display: none !important;
    }
    :deep(.slick-arrow) {
      display: none !important;
    }
    &-item {
      height: 200px;
      overflow: hidden;
      position: relative;
      padding: 0 20px;
      border-radius: 10px;
    }
    &-cover {
      top: 0;
      left: 0;
      border-radius: 10px;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    &-emoji {
      font-size: 100px;
      position: absolute;
      right: 0;
      top: 0px;
      z-index: 1;
    }
    &-content {
      position: absolute;
      top: 0;
      padding: 10px 20px 20px 20px;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-title {
      font-size: 24px;
      color: white;
      font-weight: 700;
      margin-bottom: 10px;
    }
    &-subtext {
      color: white;
      margin-bottom: 20px;
    }
  }
  &__type {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    &-item {
     padding-bottom: 10px;
     border-bottom: 1px solid #e6e6e6;
     font-size: 12px;
     transition: 0.3s;
    }
    &-active {
      color: #3E68F8;
      border-bottom: 2px solid #3E68F8;
    }
  } 
  &__block {
    margin: -20px -20px 40px -20px;
    background-color: white;
    width: 100vw;
    padding: 20px;
  }
  
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    margin-top: 10px;
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-direction: column;
    }
    &-icon {
      font-size: 18px;
      background-color: #f6f6f6;
      padding: 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #EFABFF;
    }
    &-title {
      font-size: 12px;
      color: black;
      margin-top: 5px;
    }
  }
}
</style>