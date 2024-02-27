<template>
<div class="page container">
  <a-carousel arrows dots-class="slick-dots" class="page__slider" autoplay>
    <div v-for="slide in mainSliderItems" 
      class="page__slider-item">
      <img :src="slide.cover" class="page__slider-cover">
      <div class="page__slider-emoji">
        {{ slide.emoji }}
      </div>
      <div class="page__slider-content">
        <div class="page__slider-title">
          {{ slide.title }}
        </div>
        <div class="page__slider-subtext">
          {{ slide.subtext }}
        </div>
        <div class="page__slider-button">
          <a-button  
            type="primary">
            {{ slide.buttonText }}
        </a-button>
        </div>
      </div>
    </div>
  </a-carousel><br/>
 
  <div class="page__headblock">
    <h3>Популярные теги</h3>
    <a href="#">Смотреть все</a>
  </div>
  <div class="page__tags">
    <a-button
      v-for="tag in tags" 
      @click="state.activeCategoty = tag.id"
      :class="state.activeCategoty == tag.id ? 'page__tags-active' : ''"
      class="page__tags-item">
        {{ tag.name }}
    </a-button>
  </div><br/>

  <div class="page__headblock">
    <h3>Ваша лента</h3>
    <a href="#">Смотреть все</a>
  </div>
  <div class="page__posts">
    <div v-for="post in state.allNews" class="page__posts-item">
      <Post :post="post" />
    </div>
  </div>

</div>
</template>


<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import Post from "@/components/content/Post.vue"
import { allPosts } from '@/server/fakedata/content/Posts.js'

const tags = [
  {
    id: 0,
    name: "🔍 Все"
  },
  {
    id: 1,
    name: "💻 Разработка"
  },
  {
    id: 2,
    name: "🇬🇧 Языки"
  },
  {
    id: 3,
    name: "🎨 Дизайн"
  },
  {
    id: 4,
    name: "👥 Маркетинг"
  },
  {
    id: 5,
    name: "💵 Финансы"
  },
  {
    id: 6,
    name: "💼 Бизнес"
  },
]

const mainSliderItems = [
  {
    title: "Умная лента",
    subtext: "Умная лента по вашим интересам на основе AI",
    cover: "https://static.vecteezy.com/system/resources/previews/034/440/425/non_2x/light-blue-red-blurred-backdrop-vector.jpg",
    buttonText: "Перейти к ленте",
    buttonRedirect: "AutoMarket",
    emoji: "🚀"
  },
  {
    title: "Умная лента",
    subtext: "Умная лента по вашим интересам на основе AI",
    cover: "https://framerusercontent.com/images/AQJgmakK2cb0EcVoMZe1ZmFF0Q.jpg",
    buttonText: "Перейти к ленте",
    buttonRedirect: "AutoMarket",
    emoji: "🦾"
  }
]

const state = reactive({
  allNews: [],
  activeCategoty: "0"
});

state.allNews = allPosts

const getNews = () => {
  axios
    .get("https://moneybell.ru/api/news")
    .then((res) => {
      if (res.data.length) {
        state.allNews = res.data
        console.log(res.data)
      }
    })
    .catch((error) => {
      console.log(error)
  })
}
// getNews()

</script> 


<style scoped lang="scss">

.container {
  padding: 20px;
}
.page {
  &__headblock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & a {
     font-size: 12px;
    }
  }
  &__tags {
    gap: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    box-sizing: content-box;
    overflow-x: auto;
    width: 100%;
    padding: 0 20px;
    margin: 10px -20px 0 -20px;
    &-active {
     border: 1px solid #3f95fe;
     color: #3f95fe;
    }
    &-item {
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
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
      height: 180px;
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
      width: 250px;
      height: 100%;
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
    &-button {
      position: absolute;
      bottom: 20px;
    }
  }
  &__posts {
    margin-top: 10px;
    &-item {
      margin: 0 -10px 10px -10px;
    }
  }
  &__categories {
    margin: 10px 0;
  }
}
</style>