<template>
<div class="services">
  <div class="services__header">
    <a-input 
      class="services__search" 
      v-model:value="state.search" 
      placeholder="Найдите DApp или введите ссылку">
      <template #prefix>
        <span class="services__header-searchIcon material-icons-round">search</span>
      </template>
    </a-input><br/>
    
    <a-tabs v-model:activeKey="activeKey"
      class="services__categories">
      <a-tab-pane 
        class="services__categories-item"
        v-for="category in categories" 
        :key="category.id" 
        :tab="category.name" />
    </a-tabs>
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
    <div class="services__blocks">
      <div v-for="chank in _.chunk(category.apps, 3)" class="services__blocks-chank">
        <div v-for="item in chank" 
           @click="$router.push({ name: item.routeName })"
          class="services__blocks-item">
          
          <img :src="item.iconImg" 
            v-if="item.type == 'external'"
            class="services__blocks-img">
          <div v-else class="services__blocks-icon"><span class="material-icons-round">{{ item.icon }}</span>
          </div>
            
          <div class="services__blocks-info">
            <div class="services__blocks-title">
              {{ item.title }}
            </div>
            <div class="services__blocks-desc">
              {{ item.desc }}
            </div>
          </div>
          <div class="services__blocks-arrow">
            <span class="material-icons-round">arrow_forward_ios</span>
          </div>
        </div>
      </div>
      
    </div><br/>
  </template>
</template>

  </div>
</div>

<FloatingPanel 
  v-if="state.isShowExternalApp"
  :title="state.selectedExternalApp.title"
  @toggleFloating="toggleExternalApp"
  :isShowFloating="state.selectedExternalApp">    
   <iframe 
     class="services__externalApp-iframe"
     :src="state.selectedExternalApp.link">
   </iframe>
</FloatingPanel>
</template>


<script setup>
import FloatingPanel from '@/components/uikit/FloatingPanel.vue'
import { categories } from '@/server/fakedata/services/Categories.js'
import { reactive } from "vue";
import _ from 'lodash';

const state = reactive({
  activeType: "1",
  search: "",
  isShowExternalApp: false,
  selectedExternalApp: {}
});

const openExternalApp = (app) => {
  state.selectedExternalApp = app
  toggleExternalApp()
}

const toggleExternalApp = () => {
  state.isShowExternalApp = !state.isShowExternalApp
}

const mainSliderItems = [
  {
    title: "",
    subtext: "",
    cover: "https://public.bnbstatic.com/image/cms/content/body/202312/0bf19c6f3327904faa78af7f0821a8d6.png",
    emoji: ""
  },
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

</script> 


<style lang="scss" scoped>
.services {
  padding: 10px 20px;
  &__externalApp {
    &-iframe {
      height: 500px;
    }
  }
  &__blocks {
    gap: 10px;
    display: grid;
    grid-template-columns: repeat(5, 80%);
    gap: 10px;
    padding: 0 20px;
    margin: 10px -20px 0 -20px;
    box-sizing: content-box;
    overflow-x: auto;
    &-chank {
      border-radius: 10px;
      width: 100%;
      overflow: hidden;
    }
    &-item {
      background-color: white;
      display: grid;
      grid-template-columns: auto 1fr auto;
      padding: 10px;
      border-bottom: 1px solid white;
      &:last-child {
        border-radius: 0 0 10px 10px;
        border-bottom: 1px solid #f4f5f5;
      }
    }
    &-arrow {
      display: flex;
      align-items: center;
      color: #C5C5C5;
      & span {
        font-size: 16px;
      }
    }
    &-img {
      height: 48px;
      width: 48px;
      border-radius: 10px;
      object-fit: cover;
    }
    &-icon {
      font-size: 16px;
      background-color: white;
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
      font-weight: 600;
      margin-left: 10px;
    }
    &-desc {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -moz-box;
      -moz-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      box-orient: vertical;
      margin-left: 10px;
      color: #C5C5C5;
      line-height: 16px;
    }
  }
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
    padding: 10px 20px 0 20px;
    &-searchIcon {
      color: #e6e6e6;
    }
  }
  &__categories {
    width: 100vw;
    height: 46px;
    margin: 0 -20px;
    padding: 0 20px;
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
      height: 160px;
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
    width: 100vw;
    padding: 20px;
  }
}
</style>