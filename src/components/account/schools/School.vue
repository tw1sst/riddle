<template>
<div class="school">
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
        Ученик
      </div>
    </div>
  </div>
  
  <div class="school__progress">
    <div class="school__progress-item">
      Курсов: 0/5
    </div>
    <div class="school__progress-item">
      Уроков: 0/20
    </div>
    <div class="school__progress-item">
      Карточек: 0/25
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
    display: flex;
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
    }
    &-status {
      font-size: 14px;
      color: #C5C5C5;
      font-weight: 600;
    }
  }
  &__progress {
    margin-top: 5px;
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 10px;
    width: 100%;
    &-item {
      border-radius: 5px;
      background-color: #efeff3;
      padding: 4px 10px;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>