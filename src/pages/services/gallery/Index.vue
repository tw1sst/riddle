<template>
<HeaderFunc 
  :centerText="''" 
  :actions="headerActions"
  :backRouteName="'Vision'" 
>
<div class="gallery__header">
  <a-segmented 
    v-model:value="value" 
    :options="data" />
</div>
</HeaderFunc>


<div class="gallery">   
  <div class="gallery__list">
    <Item v-for="folder in folders.concat(folders).concat(folders)" 
      class="gallery__item" 
      :folder="folder"/>
  </div>
</div>

</template>


<script setup>
import HeaderFunc from '@/components/account/HeaderFunc.vue'
import { reactive, ref } from "vue";
import { useUserStore } from '@/stores/UserStore.js'
import { FunnelIcon } from '@heroicons/vue/24/outline'
import Item from '@/components/services/gallery/Item.vue'
import { folders } from '@/server/GalleryItems.js'
import { allSchools } from '@/server/fakedata/skill/Schools.js'

const userStore = useUserStore()
const state = reactive({
  
});

const data = reactive(['Обзор', 'Подписки', 'Топ']);
const value = ref(data[0]);

const headerActions = [
  {
    icon: FunnelIcon,
    actionName: "",
    routeName: "",
    params: {}
  },
]
</script>


<style lang="scss" scoped>
.gallery {
  padding: 10px;
  &__header {
    padding: 10px;
  }
  &__list {
    column-count: 2;
    grid-gap: 10px;
  }
  &__item {
    display: inline-block;
    width: 100%;
    margin-bottom: 15px;
  }
}

</style>