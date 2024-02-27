<template>
<div class="services">
  <div class="services__header">
    <a-input class="services__search" v-model:value="state.search" placeholder="Поиск..">
      <template #suffix>
        <span class="material-icons-round">search</span>
      </template>
    </a-input><br/>
    
    <div class="services__categories">
      <a-button
        v-for="category in categories" 
        class="services__categories-item">
          {{ category.name }}
      </a-button>
    </div> 
  </div>
  
  <div class="services__block">
    <h2>🚀 Сервисы и DApps</h2><br/>
  
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
        </div>
      </div>
    </a-carousel><br/>
  
    <template v-for="category in categories">
      <template v-if="category?.apps">
        <div class="services__headblock">
          <h3>{{ category.name }}</h3>
          <a href="#">Смотреть все</a>
        </div>
        <div class="services__grid">
          <div v-for="item in category.apps" 
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
        </div><br/>
      </template>
    </template>
    
    
  </div>
</div>
</template>


<script setup>
import {reactive } from "vue";

const state = reactive({
  activeType: "1",
  search: ""
});

const categories = [
  {
    id: 0,
    name: "🔥 HOT",
    apps: [
      {
        id: 2,
        title: "Свайп",
        icon: "swipe_vertical",
        routeName: "ServiceNewsSwipe"
      },
      {
        id: 4,
        title: "Skill",
        icon: "school",
        routeName: "SkillHome"
      },
      {
        id: 5,
        title: "Wallet",
        icon: "wallet",
        routeName: "ServiceWallet"
      }
    ]
  },
  {
    id: 1,
    name: "⭐ Избранное",
    apps: [
      {
        id: 4,
        title: "Skill",
        icon: "school",
        routeName: "SkillHome",
      },
      {
        id: 5,
        title: "Wallet",
        icon: "wallet",
        routeName: "ServiceWallet",
      },
    ]
  },
  {
    id: 2,
    name: "🚀 Riddle",
    apps: [
      {
        id: 1,
        title: "Лента",
        icon: "feed",
        routeName: "ContentHome",
      },
      {
        id: 2,
        title: "Свайп",
        icon: "swipe_vertical",
        routeName: "ServiceNewsSwipe",
      },
      {
        id: 3,
        title: "Motors",
        icon: "directions_car",
        routeName: "AutoMarket",
      },
      {
        id: 4,
        title: "Skill",
        icon: "school",
        routeName: "SkillHome",
      },
      {
        id: 5,
        title: "Wallet",
        icon: "wallet",
        routeName: "ServiceWallet",
      },
    ]
  },
  {
    id: 3,
    name: "🎲 Game"
  },
  {
    id: 4,
    name: "BSC"
  },
  {
    id: 5,
    name: "ETH"
  },
  {
    id: 6,
    name: "Solana"
  },
]

const mainSliderItems = [
  {
    title: "Умная лента",
    subtext: "Умная лента по вашим интересам на основе AI, которая подстраивается под вас",
    cover: "https://framerusercontent.com/images/AQJgmakK2cb0EcVoMZe1ZmFF0Q.jpg",
    emoji: "📚"
  },
  {
    title: "Свайп-Лента",
    subtext: "Читайте новости в новом удобном формате, просто свайпая их вправо и влево",
    cover: "https://static.vecteezy.com/system/resources/previews/034/440/425/non_2x/light-blue-red-blurred-backdrop-vector.jpg",
    emoji: ""
  },
  {
    title: "Riddle Motors",
    subtext: "Покупайте и продавайте авто с выгодой у проверенных пользователей",
    cover: "https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-49273.jpg",
    emoji: "🚘"
  },
  {
    title: "Riddle Skill",
    subtext: "Найдите школу по интересам или создайте свою и настройте процесс обучения",
    cover: "https://static.vecteezy.com/system/resources/previews/002/537/004/original/light-pink-blue-abstract-blurred-background-colorful-abstract-illustration-with-gradient-background-for-ui-designers-vector.jpg",
    emoji: "🎓"
  },
]

const services = [
  {
    id: 1,
    title: "Лента",
    icon: "feed",
    routeName: "ContentHome",
  },
  {
    id: 2,
    title: "Свайп",
    icon: "swipe_vertical",
    routeName: "ServiceNewsSwipe",
  },
  {
    id: 3,
    title: "Motors",
    icon: "directions_car",
    routeName: "AutoMarket",
  },
  {
    id: 4,
    title: "Skill",
    icon: "school",
    routeName: "SkillHome",
  },
  {
    id: 5,
    title: "Wallet",
    icon: "wallet",
    routeName: "ServiceWallet",
  },
  {
    id: 3,
    title: "Motors",
    icon: "directions_car",
    routeName: "AutoMarket",
  },
  {
    id: 4,
    title: "Skill",
    icon: "school",
    routeName: "SkillHome",
  },
  {
    id: 5,
    title: "Wallet",
    icon: "wallet",
    routeName: "ServiceWallet",
  },
]
</script> 


<style lang="scss" scoped>
.services {
  padding: 10px 20px;
  &__headblock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & a {
     font-size: 12px;
    }
  }
  &__header {
    position: fixed;
    width: 100%;
    background-color: white;
    z-index: 10;
    top: 0;
    left: 0;
    padding: 10px 20px 10px 20px;
  }
  &__categories {
    gap: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    box-sizing: content-box;
    overflow-x: auto;
    width: 100%;
    padding: 0 20px;
    margin: 10px -20px 0 -20px;
    &-item {
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 120px;
      font-size: 12px;
      height: 28px;
    }
  }
  &__slider {
    margin: 0 -20px;
    :deep(.slick-dots) {
      display: none !important;
    }
    :deep(.slick-arrow) {
      display: none !important;
    }
    &-item {
      height: 140px;
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
      font-size: 90px;
      position: absolute;
      right: 0;
      top: 0px;
      z-index: 1;
    }
    &-content {
      position: absolute;
      font-size: 12px;
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
    margin-top: 20px;
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
    margin: 20px -20px 0 -20px;
    background-color: white;
    width: 100vw;
    padding: 20px;
  }
  
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;
    padding: 0 20px;
    margin: 10px -20px 0 -20px;
    box-sizing: content-box;
    overflow-x: auto;
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-direction: column;
    }
    &-icon {
      font-size: 16px;
      background-color: #f6f6f6;
      padding: 12px;
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