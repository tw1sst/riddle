<template>
<div class="avatar">
  <img :src="getAvatar(props.userName)"
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
const props = defineProps({
  userName: Object,
  subText: String,
  imageUrl: String,
  type: String,
  size: String,
  border: String
});

const getAvatar = (name) => {
  return "https://ui-avatars.com/api/?name=" + name + "&size=64&color=7F9CF5&background=EBF4FF"
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
    margin-right: 10px;
    height: 32px;
    width: 32px;
  }
}
</style>