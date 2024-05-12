<template>
<HeaderFunc 
  :centerText="state.school.name"
  :hideText="true"
  :backRouteName="'UserSchools'" />

<div class="school">
  <div class="school__cover">
    <img class="school__cover-img" :src="state.school.cover">
  </div>
  
  <div class="school__head">
    <div class="school__head-avatar">
      <img class="school__header-img" :src="state.school.icon">
    </div>
    
    <div class="school__head-right">
      <GlobeAltIcon class="school__head-item" />
      <BuildingStorefrontIcon class="school__head-item" />
      <ChatBubbleLeftRightIcon class="school__head-item" />
      <BellIcon class="school__head-item" />
      
      <div class="school__head-love">
         <HeartIcon class="school__head-item"/>
         234
      </div>
    </div>
  </div>
  
  <div class="school__info">
    <div class="school__info-name">
      <h3>{{ state.school.name }}</h3>
      <span class="school__info-username">@{{ state.school.username }}</span>
    </div>
    <div class="school__info-sub">
      <a-button type="primary">
        Подписаться
      </a-button>
      <a-button type="text">
        1 326 подписчиков 
      </a-button>
    </div>
    <p class="school__info-desc">
      {{ state.school.desc }} 
    </p>
  </div>
  
  <a-tabs v-model:activeKey="state.activeSchoolTab"
    class="school__tabs">
    <a-tab-pane 
      class="school__tabs-item"
      v-for="item in schoolTabs" 
      :key="item.id" 
      :tab="item.name" />
  </a-tabs>
  
  <div class="school__content">
    <div class="school__content-block" v-if="state.activeSchoolTab == 'courses'">
      <a-input 
        show-count 
        :maxlength="50"
        :bordered="false"
        class="school__search" 
        v-model:value="state.search" 
        placeholder="Найдите нужный курс">
        <template #prefix>
          <MagnifyingGlassIcon class="school__search-icon" />
        </template>
      </a-input>
      
      <div class="school__courses">
        <CourseCard v-for="course in state.schoolCourses" :course="course" />
      </div>
    </div>
    
    <div class="school__content-block" v-if="state.activeSchoolTab == 'content'">
      <a-input 
        show-count 
        :maxlength="50"
        :bordered="false"
        class="school__search" 
        v-model:value="state.search" 
        placeholder="Найдите нужный ридл">
        <template #prefix>
          <MagnifyingGlassIcon class="school__search-icon" />
        </template>
      </a-input>
      
      <div class="school__posts">
        <div v-for="post in state.schoolPosts" class="school__posts-item">
          <Post :post="post" />
        </div>
      </div>
    </div>
 
  </div>
  
</div>
</template>


<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from '@/stores/UserStore.js'

import { allSchools } from '@/server/fakedata/skill/Schools.js'
import { allCourses } from '@/server/fakedata/skill/Courses.js'
import { allPosts } from '@/server/fakedata/content/Posts.js'
import Avatar from '@/components/account/Avatar.vue'
import CourseCard from '@/components/skill/CourseCard.vue'
import HeaderFunc from '@/components/account/HeaderFunc.vue'
import Post from "@/components/content/Post.vue"
import { GlobeAltIcon, ChatBubbleLeftRightIcon, BuildingStorefrontIcon, BellIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const userStore = useUserStore()
const route = useRoute()
const state = reactive({
  id: null,
  school: {},
  activeSchoolTab: "courses",
  schoolCourses: [],
  schoolPosts: []
});

state.school = allSchools.find(x => x.id == route.params.id)
state.id = state.school.id

if (route.params?.school) {
  state.school = JSON.parse(route.params.school)
  state.id = route.params.id
}

state.schoolCourses = allCourses.filter(x => x.school_id == state.school.id)

state.schoolPosts = allPosts.filter(x => x.school_id == state.school.id)

const schoolTabs = [
  {
    id: "null",
    name: ""
  },
  {
    id: "courses",
    name: "Курсы"
  },
  {
    id: "content",
    name: "Ридлы"
  },
  {
    id: "market",
    name: "Маркет"
  },
  {
    id: "chat",
    name: "Общение"
  },
  {
    id: "reviews",
    name: "Отзывы"
  },
  {
    id: "null",
    name: ""
  },
]
</script>


<style lang="scss" scoped>
.school {
  margin-top: -48px;
  padding-bottom: 20px;
  &__search {
    background-color: white;
    &-icon {
      height: 20px;
      margin-right: 5px;
    }
  }
  &__tabs {
    margin: 0 -10px;
    &-item {
      padding: 0 20px;
    }
  }
  &__content {
    margin-top: -16px;
    &-block {
      padding: 20px;
    }
  }
  &__courses {
    display: grid;
    gap: 10px;
    margin: 20px -10px;
    grid-template-columns: 1fr 1fr;
    border-radius: 0 0 10px 10px;
  }
  &__posts {
    margin: 20px -10px;
    display: grid;
    grid-direction: rows;
    gap: 10px;
  }
  &__cover {
    position: relative;
    display: inline-flex;
    z-index: 5;
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 1;
      background: linear-gradient(to bottom, rgba(239, 239, 243, 0) 0%, rgba(239, 239, 243, 0.4) 70%, rgba(239, 239, 243, 1) 100%);
      transition: opacity .3s;
      will-change: opacity;
    }
    &-img {
      height: 150px;
      object-fit: cover;
      width: 100%;
      object-position: center center;
    }
  }
  &__head {
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 0 20px;
    margin-top: -40px;
    z-index: 10;
    position: relative;
    &-avatar {
      width: 72px;
      height: 72px;
      border-radius: 10px;
      margin-right: 10px;
      overflow: hidden;
    }
    &-right {
      display: grid;
      grid-template-columns: auto auto auto auto 1fr;
      gap: 10px;
      align-items: end;
    }
    &-love {
      width: 100%;
      color: #C5C5C5;
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: flex-end;
    }
    &-item {
      width: 22px;
      height: 22px;
      color: #C5C5C5;
      margin-right: 10px;
    }
  }
  &__info {
    padding: 20px;
    &-name {
      display: flex;
      align-items: center;
    }
    &-username {
      font-size: 14px;
      margin-left: 10px;
      color: #C5C5C5;
    }
    &-sub {
      margin: 10px 0 20px 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    &-desc {
      color: #C5C5C5;
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
</style>