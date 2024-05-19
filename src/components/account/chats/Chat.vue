<template>
<div 
  class="chat" 
  @click="$router.push({ 
    name: 'ChatRoom', 
    params: { 
      id: props.chat.id,
      chat: JSON.stringify(props.chat)
    } 
  })">
  <div class="chat__head">
    <div class="chat__icon">
      <Avatar 
         :userName="props.chat.user.name"
         :imageUrl="props.chat.user.avatar"
         :type="'onlyAvatar'"
         :size="58"
         :storiesPadding="4"
         :isShowStories="true"
         :border="'circle'"
      />
    </div>
    <div class="chat__info">
      <div class="chat__info-name">
        {{ props.chat.user.name }}
      </div>
      
      <div class="chat__info-desc">
        
      </div>
      <div class="chat__info-status">
        {{ props.chat.messages[0]?.text }}
      </div>
    </div>
  </div>
  
</div>
</template>


<script setup>
import Avatar from '@/components/account/Avatar.vue'
const props = defineProps({
  chat: Object
})
</script>


<style scoped lang="scss">
.chat {
  background-color: white;
  width: 100%;
  transition: 0.3s;
  &:hover {
    background-color: #f4f4f5;
  }
  &__head {
    padding-top: 10px;
    display: grid;
    grid-template-columns: auto 1fr;
  }
  &__icon {
    margin-right: 10px;
    padding-bottom: 10px;
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