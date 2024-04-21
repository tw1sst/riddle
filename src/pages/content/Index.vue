<template>
<a-tabs v-model:activeKey="activeCategotyp"
  class="page__categories">
  <a-tab-pane 
    class="services__categories-item"
    v-for="category in categories" 
    :key="category.id" 
    :tab="category.name" />
</a-tabs>
    
<div class="page container">
  <div class="page__stories">
    <Stories 
      v-if="state.isShowStories" 
      class="page__stories-opened" 
      @allStoriesEnd="toggleStory"
      @seeMore="openSeeMore"
      @storyStart="storyStart"
      :currentIndex="state.currentIndex"
      :style="{ background: 'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('+ state.selectedStory.url +') no-repeat center 100% / cover' }"
      :stories="state.stories">
      <template #header="{ story }">
        <div class="page__stories-header">
          <Avatar 
           :userName="story.header.authorName"
           :subText="'Вчера в 22:46'"
          />
        </div>
      </template>
      
      <template #default="attrs">
         <default-slide 
           :story="state.selectedStory"
           class="flex-grow">
         </default-slide>
      </template>
    </Stories>

    <div class="page__stories-item">      
      <Avatar 
       :userName="userStore.user.name"
       :type="'onlyAvatar'"
       :size="'62'"
       :border="'circle'"
      />
      <div class="page__stories-title">
        Добавить историю
      </div>
    </div>
    <div 
      v-for="(story, key) in state.stories"
      @click="toggleStory(story, key)"
      class="page__stories-item"> 
      
      <ProgressSteps 
        :steps="10"
        :activeSteps="6" 
        :size="70">
        <img :src="story.url" class="page__stories-cover">
      </ProgressSteps>
    
      <div class="page__stories-title">
        {{ story.title }}
      </div>
    </div>
  </div>

  <div class="page__headblock">
    <h3>Ваши ридлы</h3>
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
import { useRouter } from 'vue-router'
import { Stories } from "vue-insta-stories"
import { allPosts } from '@/server/fakedata/content/Posts.js'

import axios from "axios";
import Post from "@/components/content/Post.vue"
import Avatar from '@/components/account/Avatar.vue'
import DefaultSlide from '@/components/content/stories/DefaultSlide.vue'
import { useUserStore } from '@/stores/UserStore.js'
import ProgressSteps from '@/components/uikit/ProgressSteps.vue'

const userStore = useUserStore()
const router = useRouter()
const state = reactive({
  allNews: [],
  activeCategoty: "0",
  isShowStories: false,
  selectedStory: {},
  stories: [],
  currentIndex: 0,
});

state.allNews = allPosts
allPosts.forEach(post => {
  let newStory = {
    url: post.image,
    title: post.title,
    text: post.content.substring(0, 500),
    duration: 5000,
    isView: false,
    template: "default",
    header: {
      authorName: post.provider
    },
    seeMore: { 
      url: post.link,
      postId: post.id,
      post: post, // убираем когда готово апи
      label: "Открыть запись 👆"
    }
  }
  if (state.stories.length < 6) {
    state.stories.push(newStory)
  }
})

const toggleStory = (story, key) => {
  if (story) {
    storyStart(key)
    state.isShowStories = true
  } else {
    state.selectedStory = {}
    state.isShowStories = false
  }
}

const storyStart = (index) => {
  state.currentIndex = index
  state.stories.forEach(function(story, i) { 
    if (i == index) {
      story.isView = true
      state.selectedStory = story
    }
  })
}

const openSeeMore = (story) => {
  router.push({ name: 'ContentPostPage', 
    params: { 
       id: story.seeMore.postId,
       post: JSON.stringify(story.seeMore.post),
    } 
  })
} 

const categories = [
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
  &__categories {
    width: 100vw;
    height: 46px;
    margin: 0 -20px;
    padding: 0 20px;
    background-color: white;
    position: fixed;
    top: 30px;
    z-index: 1;
  }
  &__stories {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 5px;
    padding: 4px 20px;
    margin: 30px -20px 20px -20px;
    box-sizing: content-box;
    overflow-x: auto;
    &-opened {
      position: absolute;
      height: 100vh;
      width: 100vw;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
    &-header {
      color: white;
      width: 100vw;
      margin: 0 -20px;
      padding: 0 20px;
      z-index: 110;
    }
    &-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &-title {
      font-size: 12px;
      line-height: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -moz-box;
      -moz-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      box-orient: vertical;
      font-weight: 600;
      margin-top: 5px;
      text-align: center;
    }
    &-item {
      width: 62px;
      margin-right: 20px;
      position: relative;
    }
    &-status {
      border: 2px solid violet;
      border-radius: 50%;
      width: 70px;
      height: 70px;
      position: absolute;
      top: -4px;
      left: -4px;
    }
    &-viewed {
      border: 2px solid #C5C5C5;
      border-radius: 50%;
      width: 70px;
      height: 70px;
      position: absolute;
      top: -4px;
      left: -4px;
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