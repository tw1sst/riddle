<template>
<HeaderFunc 
  :centerText="state.school.name"
  :hideText="true"
  :backRouteName="'ContentHome'" />

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
    <h3>{{ state.school.name }}</h3>
    <p class="school__info-desc">
      {{ state.school.desc }} 
    </p>
  </div>
  
  
  
</div>
</template>


<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from '@/stores/UserStore.js'

import { allSchools } from '@/server/fakedata/skill/Schools.js'
import Avatar from '@/components/account/Avatar.vue'
import HeaderFunc from '@/components/account/HeaderFunc.vue'
import { GlobeAltIcon, ChatBubbleLeftRightIcon, BuildingStorefrontIcon, BellIcon, HeartIcon } from '@heroicons/vue/24/outline'

const userStore = useUserStore()
const route = useRoute()
const state = reactive({
  id: null,
  school: {},
});

state.school = allSchools.find(x => x.id == route.params.id)
state.id = state.school.id

if (route.params?.school) {
  state.school = JSON.parse(route.params.school)
  state.id = route.params.id
}
</script>


<style lang="scss" scoped>
.school {
  height: 1000px;
  margin-top: -48px;
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
    &-img {
      
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
    &-desc {
      color: #C5C5C5;
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
</style>