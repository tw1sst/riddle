<template>
<div class="card">
  <div class="card__cover">
    <img class="card__cover-img" :src="state.course.cover">
    <div class="card__cover-text">
      🎓 Riddle School
    </div>
  </div>
  
  <div class="card__info">
    <div class="card__title"
      @click="$router.push({ name: 'SkillCoursePage', params: { id: state.course.id, course: JSON.stringify(state.course) } })">
      {{ state.course.name }}
    </div>
    <div class="card__desc">
      {{ state.course.desc }}
    </div>
    <div class="card__rate">
      <a-rate disabled allow-half
        :tooltips="state.course.rate"
        v-model:value="state.course.rate.stars" />
      <span>
        {{ state.course.rate.stars }} 
        <template v-if="props.type == 'full'">
          ({{ state.course.rate.rates }})
        </template>
      </span>
    </div>
    <div class="card__actions" :class="props.type != 'full' ? 'card__actions-one' : ''">
      <template v-if="state.course.paid?.enable">
        <a-button
          @click="$router.push({ name: 'SkillCoursePage', params: { id: state.course.id, course: JSON.stringify(state.course) } })"
          type="primary"
          class="card__actions-item card__actions-fullbtn">
          {{ state.course.paid.price_rub }} ₽
        </a-button>
      </template>
      <template v-else-if="!state.course.paid?.enable">
        <a-button
          @click="$router.push({ name: 'SkillCoursePage', params: { id: state.course.id, course: JSON.stringify(state.course) } })"
          type="primary"
          class="card__actions-item card__actions-fullbtn">
          <template v-if="isCourseStarted">
            Продолжить
          </template>
          <template v-else>
            Бесплатно
          </template>
        </a-button>
      </template>
      
      <a-button
        v-if="props.type == 'full' && !isCourseStarted"
        class="card__actions-item">
        <span class="material-icons-round">favorite_border</span>
    </a-button>
    </div>
  </div>
</div>
</template>


<script setup>
import { reactive } from "vue";
import { useUserStore } from '@/stores/UserStore.js'

const userStore = useUserStore()
const props = defineProps({
  course: Object,
  type: String
});

let isCourseStarted = false
if (userStore.user.startedCourses.find(x => x.id == props.course.id)) isCourseStarted = true

const state = reactive({
  course: {}
});

if (Object.keys(props.course).length !== 0) {
  state.course = props.course 
}
</script>


<style lang="scss" scoped>
.card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  &__cover {
    &-img {
      height: 100px;
      width: 100%;
      object-fit: cover;
    }
    &-text {
      margin-top: -22px;
      padding: 2px 10px;
      width: 100%;
      background-color: black;
      opacity: 0.5;
      color: white;
      font-size: 12px;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 20px 10px;
  }
  &__title {
    font-weight: 600;
  }
  &__desc {
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    box-orient: vertical;
  }
  &__rate {
    margin-top: 5px;
    font-size: 12px;
    & * {
      font-size: 16px;
    }
    & span {
      font-size: 14px;
      margin-left: 5px;
    }
  }
  &__actions {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr auto;
    width: 100%;
    gap: 10px;
    &-one {
      grid-template-columns: 1fr;
    }
    &-item {
      width: 100%;
    }
  }
}
</style>