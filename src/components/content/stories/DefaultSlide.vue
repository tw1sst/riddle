<template>
  <div class="story">
    <div class="story__title">
      {{ props.story.title }}
    </div>
    
    <div class="story__text">
      {{ props.story.text }}..
    </div>
  </div>
</template>


<script setup>
const props = defineProps({
  story: {
    type: Object,
  }
})
</script>


<style lang="scss" scoped>
.story {
  color: white;
  padding: 80px 0;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 40px;
  &__title {
    padding: 0 20px;
    font-size: 20px;
    font-weight: 600;
  }
  &__text {
    padding: 0 20px;
  }
}
</style>