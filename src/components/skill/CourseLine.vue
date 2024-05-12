<template>
<div class="course">
  <div class="course__cover">
    <img class="course__cover-img" :src="state.course.cover">
  </div>
  
  <div class="course__info">
    <div class="course__info-name">
      {{ state.course.name }}
    </div>
    <div class="course__info-desc">
      {{ state.course.desc }}
    </div>
    
    <div class="course__price" v-if="state.course.paid?.enable">
      <div>₽ {{ state.course.paid.price_rub }}</div>
    </div>
    
    <div v-else-if="!state.course.paid?.enable" class="course__price">
      <template v-if="isCourseStarted">
        <span class="material-icons-round">navigate_next</span>
        Продолжить
      </template>
      <template v-else>
        <span class="material-icons-round">money_off</span>
        Бесплатно
      </template>
    </div> 
  </div>
 
</div>
</template>


<script setup>
import { reactive } from "vue";
import { useUserStore } from '@/stores/UserStore.js'
import { HeartIcon } from '@heroicons/vue/24/outline'
import { allSchools } from '@/server/fakedata/skill/Schools.js'

const userStore = useUserStore()
const props = defineProps({
  course: Object,
  type: String,
});

let isCourseStarted = false
if (userStore.user.startedCourses.find(x => x.id == props.course.id)) isCourseStarted = true

const state = reactive({
  course: {},
  courseSchool: {}
});

if (Object.keys(props.course).length !== 0) {
  state.course = props.course 
}

state.courseSchool = allSchools.find(x => x.id == state.course?.school_id)


</script>


<style lang="scss" scoped>
.course {
  background-color: white;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  &__cover {
    &-img {
      width: 80px;
      height: 70px;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  &__info {
    &-name {
      font-weight: 600;
    }
    &-desc {
      margin-top: 5px;
      color: #C5C5C5;
      font-size: 14px;
    }
  }
  &__price {
    margin-top: 5px;
    display: flex;
    align-items: center;
    color: violet;
  }
  
}
</style>