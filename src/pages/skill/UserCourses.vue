<template>
<div class="courses">
  <HeaderFunc :centerText="'Ваши курсы'" :backRouteName="'SkillHome'" />

  <h2>Ваши курсы</h2> 
  <div class="courses__list">
    <div 
      v-for="course in userStore.user.startedCourses" 
      @click="$router.push({ name: 'SkillCourseUserPanel', params: {
        id: course.id
      }})"
      class="courses__item">
      <div class="courses__item-cover">
        <img :src="course.cover">
      </div>
      <div class="courses__item-info">
        <div class="courses__item-name">
          {{ course.name }}
        </div>
        <div class="courses__item-desc">
          {{ course.desc }}
        </div>
      </div>
      
    </div>
  </div>
</div>
</template>


<script setup>
import { useUserStore } from '@/stores/UserStore.js'
import HeaderFunc from '@/components/account/HeaderFunc.vue'

const userStore = useUserStore()

</script>


<style lang="scss" scoped>
.courses {
  padding: 20px;
  &__list {
    margin-top: 20px;
  }
  &__item {
    display: flex;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    &-cover {
      margin-right: 10px;
      & img {
        width: 100px;
        border-radius: 10px;
      }
    }
    &-name {
      font-weight: 600;
    }
    &-desc {
      font-size: 12px;
      color: #C5C5C5;
    }
  }
}
</style>