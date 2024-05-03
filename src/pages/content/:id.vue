<template>
<div v-if="state.post?.title" class="post">
  <HeaderFunc :centerText="state.post.title" :backRouteName="'ContentHome'" />
  
  <div class="post__component">
    <Post :post="state.post" 
    :type="'full'"/>
  </div>
</div>
</template>


<script setup>
import { ChevronLeftIcon, BookmarkIcon, ShareIcon } from '@heroicons/vue/24/outline'
import HeaderFunc from '@/components/account/HeaderFunc.vue'
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Post from "@/components/content/Post.vue"
import ActionsBar from "@/components/content/ActionsBar.vue"

const route = useRoute()
const state = reactive({
  id: null,
  post: {},
});

if (route.params?.post) {
  state.post = JSON.parse(route.params.post)
  state.id   = route.params.id
}
</script>


<style scoped lang="scss">
.post {
  padding-bottom: 20px;
  &__component {
    margin-top: -12px;
  }
}
</style>