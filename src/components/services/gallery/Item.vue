<template>
<div class="item">
  <img 
    class="item__img" 
    @click="$router.push({ 
      name: 'ServiceGalleryFolder', 
      params: { 
         id: props.folder.id, 
         folder: JSON.stringify(props.folder) 
       } 
     })"
    :src="props.folder.images[0].image">
  <div class="item__bottom">
    <div class="item__bottom-user">
      <Avatar
       :size="26"
       :type="'onlyAvatar'"
       :userName="props.folder.user.name"/>
      <div class="item__bottom-userInfo">
        <div class="item__bottom-username">
          {{ props.folder.user.name }}
        </div>
        <div class="item__bottom-nickname">
          {{ props.folder.user.nickName }}
        </div>
      </div>
    </div>
     
    <div class="item__likes">
      <div class="item__likes-count">
        {{ props.folder.images[0].likes_count }}
      </div>
      <HeartIcon class="item__likes-icon"/>
    </div>
    
  </div>
</div>
</template>


<script setup>
import { reactive } from "vue";
import Avatar from '@/components/account/Avatar.vue'
import { allSchools } from '@/server/fakedata/skill/Schools.js'
import { users } from '@/server/Users.js'

import { HeartIcon, ChatBubbleBottomCenterTextIcon, BookOpenIcon, EyeIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  folder: Object,
});

props.folder.school = props.folder?.school_id
  ? allSchools.find(x => x.id == props.folder.school_id)
  : null

props.folder.user = props.folder?.user_id
  ? users.find(x => x.id == props.folder.user_id)
  : null

</script>


<style scoped lang="scss">
.item {
  &__likes {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-radius: 5px;
    padding: 0 5px;
    height: 30px;
    transition: 0.2s;
    &:hover {
      background-color: white;
    }
    &-count {
      font-size: 12px;
    }
    &-icon {
      height: 20px;
      margin-left: 5px;
    }
  }
  &__img {
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
  }
  &__bottom {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    &-user {
      display: flex;
    }
    &-userInfo {
      display: grid;
      grid-template-rows: auto auto;
      margin-left: 5px;
    }
    &-username {
      font-size: 12px;
      font-weight: 600;
    }
    &-nickname {
      font-size: 12px;
      margin-top: -5px;
      color: #C5C5C5;
    }
  }
}
</style>