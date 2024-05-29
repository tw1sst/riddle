<template>
<div class="folder">
  <HeaderFunc 
  :centerText="state.folder.name"
  :hideText="true"
  :backRouteName="'ServiceGallery'" />
  
  <div class="folder__image">
    <img :src="state.selectedImage.image" />
  </div>
  
  <div class="folder__images">
    <div 
      v-for="image in state.folder.images" 
      :class="image?.id == state.selectedImage?.id ? 'folder__images-selected' : ''"
      @click="state.selectedImage = image"
      class="folder__images-item">
      <img :src="image.image">
    </div>
  </div>
  
  
  <div class="folder__author">
    <Avatar
       :size="36"
       :userName="state.folder.user.name"
       :subText="dateFormat(state.folder.created_at)"
    />
    <div class="folder__author-actions">
      <EllipsisHorizontalIcon class="folder__author-icon"/>
      <HeartIcon class="folder__author-icon"/>
      <PaperClipIcon class="folder__author-icon"/>
    </div>
  </div>
  
  <div class="folder__actions">
    <a-segmented 
      class="folder__actions-access"
      :size="'middle'"
      v-model:value="accessValue" 
      :options="access" />
    <div class="folder__actions-right">
      <a-button class="folder__button">
        <template #icon>
          <ArrowPathRoundedSquareIcon class="folder__button-icon" />
        </template>
        Повтор
      </a-button>
      <a-button class="folder__button">
        <template #icon>
          <PaintBrushIcon class="folder__button-icon" />
        </template>
      </a-button>
    </div>
  </div>
  
</div>
</template>


<script setup>
import HeaderFunc from '@/components/account/HeaderFunc.vue'
import Avatar from '@/components/account/Avatar.vue'
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { folders } from '@/server/GalleryItems.js'
import { allSchools } from '@/server/fakedata/skill/Schools.js'
import { users } from '@/server/Users.js'
import { PaintBrushIcon, ArrowPathRoundedSquareIcon, EllipsisHorizontalIcon, PaperClipIcon, HeartIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const state = reactive({
  folder: {},
  selectedImage: {}
})

state.folder = route.params?.folder
  ? JSON.parse(route.params.folder)
  : folders.find(x => x.id == route.params.id)

state.selectedImage = state.folder.images[0]


state.folder.school = state.folder?.school_id
  ? allSchools.find(x => x.id == state.folder.school_id)
  : null

state.folder.user = state.folder?.user_id
  ? users.find(x => x.id == state.folder.user_id)
  : null
  
const access = reactive([
  'Общий', 'Приватный'
])
const accessValue = ref(access[0])
  
const dateFormat = (date) => {
  let nDate = new Date(date)
  return nDate.toLocaleString()
}

</script>


<style scoped lang="scss">
.folder {
  margin-top: -48px;
  min-height: 1000px;
  &__images {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    align-items: center;
    &-item {
      border-radius: 5px;
      overflow: hidden;
      opacity: 0.5;
      transition: 0.1s;
    }
    &-selected {
      opacity: 1;
    }
  }
  &__author {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    &-actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      align-items: center;
    }
    &-icon {
      height: 26px;
    }
  }
  &__actions {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    &-right {
      display: flex;
    }
  }
  &__button {
    display: flex;
    align-items: center;
    margin-left: 5px;
    &-icon {
      height: 22px;
      margin: 5px;
    }
  }
}
</style>