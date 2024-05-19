<template>
<div class="avatar">
  <ProgressSteps 
    :steps="steps"
    :activeSteps="activeSteps" 
    :padding="props.storiesPadding || '4'"
    :size="props.size || '32'">
    <img :src="getAvatar(props.userName)"
    class="avatar__img">
  </ProgressSteps>
   
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
  storiesPadding: Number,
  disabledStories: Boolean
});

const getAvatar = (name) => props.imageUrl ? props.imageUrl : `https://ui-avatars.com/api/?name=${name}&size=64&color=7F9CF5&background=EBF4FF`;

let steps = 1
let activeSteps = 1
if (props.disabledStories) {
  steps = 0
  activeSteps = 0
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
    height: 100%;
    width: 100%;
    object-fit: cover;
    overflow: hidden;
    background-position: center;
  }
  &__info {
    margin-left: 10px;
  }
}
</style>