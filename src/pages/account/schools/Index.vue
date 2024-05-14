<template>
<Header />
    
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
    <ProgressSteps 
      :steps="0"
      :activeSteps="0" 
      :size="60">
      <Avatar 
       :userName="userStore.user.name"
       :type="'onlyAvatar'"
       :size="'52'"
       :border="'circle'"
      />
    </ProgressSteps>
    
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
      :size="60">
      <img :src="story.url" class="page__stories-cover">
    </ProgressSteps>
  
    <div class="page__stories-title">
      {{ story.title }}
    </div>
  </div>
</div> 
  
<div class="page"> 
  <div class="page__categories">
    <a-tabs v-model:activeKey="state.activeCategory">
      <a-tab-pane 
        class="services__categories-item"
        v-for="category in categories" 
        :key="category.id" 
        :tab="category.name" />
    </a-tabs>
  </div>
  
  <div class="page__schools">
    <div v-for="school in state.userSchools" class="page__schools-item">
      <SchoolItem :school="school" />
    </div>
  </div>
  
  <br/>
   
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
import { ref, reactive, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { Stories } from "vue-insta-stories"
import Header from "@/components/account/Header.vue"
import { allPosts } from '@/server/fakedata/content/Posts.js'
import { allSchools } from '@/server/fakedata/skill/Schools.js'
import SchoolItem from '@/components/account/schools/School.vue'

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
  activeCategory: 0,
  isShowStories: false,
  selectedStory: {},
  stories: [],
  currentIndex: 0,
  userSchools: []
});

if (userStore.user.schools) {
  state.userSchools = userStore.user.schools
  state.userSchools.forEach(userSchool => {
    let school = allSchools.find(x => x.id == userSchool.id)
    if (school) {
      userSchool = Object.assign(userSchool, school)
    }
  }) 
}

onMounted(() => {
  let body = document.querySelector('body');
  let categoties = document.getElementsByClassName("page__categories")[0]
  let rect = categoties.getBoundingClientRect()
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop - 36
  let schools = document.getElementsByClassName("page__schools")[0]
  
  body.addEventListener('scroll', () => {  
    if ((rect.top + scrollTop) < body.scrollTop) {
      categoties.classList.add('page__categories-sticky')
      schools.classList.add('page__schools-sticky')
      } else {
        categoties.classList.remove('page__categories-sticky')
        schools.classList.remove('page__schools-sticky')
      }
  })
})

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
    id: null,
    name: ""
  },
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
  {
    id: null,
    name: ""
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



// test api coze

var postData = {
  "conversation_id": "123",
  "bot_id": "7367094265379536901",
  "user": "29032201862555",
  "query": "нарисуй обложку курса по JS",
  "stream": false
};

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Authorization: Bearer pat_SsDrICaJa3HR1XHMoQ7DrrHOvoAigfZVBuGnz6mAes67tygNu6g20qNNJGuZnDEA',
  'Accept': '*/*',
  'Host': 'api.coze.com',
  'Connection': 'keep-alive',
}

const getMessage = () => {
axios.post("https://api.coze.com/open_api/v2/chat", postData, {
    headers: headers
  })
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.log(error)
  })
}

// getMessage()

</script> 


<style scoped lang="scss">

.page {
  padding: 0 20px;
  margin-top: -5px;
  &__schools {
    margin: 0 -20px;
    &-sticky {
      margin-top: 45px;
    }
  }
  &__categories {
    width: 105vw;
    height: 46px;
    margin: 0 -30px;
    background-color: white;
    transition: 0.5s;
    &-sticky {
      position: fixed;
      top: 35px; 
    }
  }
  &__stories {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 5px;
    padding: 20px;
    box-sizing: content-box;
    overflow-x: auto;
    background-color: white;
    margin-top: -10px;
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
      width: 56px;
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
}
</style>