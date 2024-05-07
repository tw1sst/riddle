<template>
<div 
  class="school" 
  @click="$router.push({ 
    name: 'SkillSchoolPage', 
    params: { 
      id: props.school.id, 
      school: JSON.stringify(props.school) 
    } 
  })">
  <div class="school__head">
    <div class="school__icon">
      <img :src="props.school.icon">
    </div>
    <div class="school__info">
      <div class="school__info-name">
        {{ props.school.name }}
      </div>
      <div class="school__info-desc">
        {{ props.school.desc }}
      </div>
      <div class="school__info-status">
        Подписчик
      </div>
    </div>
  </div>
  
</div>
</template>


<script setup>
const props = defineProps({
  school: Object
})
</script>


<style scoped lang="scss">
.school {
  background-color: white;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 1px;
  transition: 0.3s;
  &:hover {
    background-color: #f4f4f5;
  }
  &__head {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  &__icon {
    margin-right: 10px;
    & img {
      background-color: #efeff3;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  &__info {
    &-name {
      font-weight: 500;
    }
    &-desc {
      font-size: 14px;
      color: #C5C5C5;
      word-break: break-all;
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
    &-status {
      font-size: 14px;
      color: #C5C5C5;
      font-weight: 600;
    }
  }
}
</style>