<template>
<div class="avatar">
  <ProgressSteps 
    v-if="props.isShowStories"
    :steps="10"
    :activeSteps="6" 
    :padding="props.storiesPadding"
    :size="props.size || '32'">
    <img :src="getAvatar(props.userName)"
    :style="{
      'height': props.size + 'px',
      'width': props.size + 'px',
      'border-radius': props.border == 'circle' ? '50%' : ''
    }"
    class="avatar__img">
  </ProgressSteps>
  
  <img :src="getAvatar(props.userName)"
    v-else
    :style="{
      'height': props.size + 'px',
      'width': props.size + 'px',
      'border-radius': props.border == 'circle' ? '50%' : ''
    }"
    class="avatar__img">
   
  <div v-if="props.type != 'onlyAvatar'" class="avatar__info">
    <div class="avatar__name">
      {{ props.userName }}
    </div>
    <div class="avatar__date">
      {{ props.subText }}
    </div>
  </div>
</div>
</template>


<script setup>
import ProgressSteps from '@/components/uikit/ProgressSteps.vue'
const props = defineProps({
  userName: Object,
  subText: String,
  imageUrl: String,
  type: String,
  size: String,
  border: String,
  storiesPadding: Number,
  isShowStories: Boolean
});

const getAvatar = (name) => {
  if (props.imageUrl) {
    return props.imageUrl
  } else {
    return "https://ui-avatars.com/api/?name=" + name + "&size=64&color=7F9CF5&background=EBF4FF"
  }
}
</script>


<style scoped lang="scss">
.avatar {
  display: flex;
  align-items: center;
  &__name {
    font-weight: 600;
    overflow: hidden;
    word-break: break-word;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    box-orient: vertical;
    line-height: 20px;
  }
  &__date {
    font-size: 12px;
    color: #C5C5C5;
  }
  &__img {
    border-radius: 5px;
    height: 32px;
    widtg: 32px;
    object-fit: cover;
  }
  &__info {
    margin-left: 10px;
  }
}
</style>