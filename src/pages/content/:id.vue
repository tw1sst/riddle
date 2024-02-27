<template>
<div v-if="state.post?.title" class="post">
  <div class="post__header">
    <div class="post__header-left">
      <span @click="$router.push({ name: 'ContentHome' })" class="material-icons-round post__header-item">arrow_back_ios</span>
    </div>
    <div class="post__header-center">
      <div class="post__header-text">
        {{ state.post.title }}
      </div>
    </div>
    <div class="post__header-right">
      <span class="material-icons-round post__header-item">ios_share</span>
       <span class="material-icons-round post__header-item">bookmark_border</span>
    </div>
  </div>
    
  <Post :post="state.post" :type="'full'"/>
</div>

<ActionsBar :post="state.post" />
</template>


<script setup>
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
  margin-bottom: 60px;
  padding-bottom: 20px;
  &__header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    position: fixed;
    width: 100%;
    top: 0;
    background-color: white;
    z-index: 100;
    & > div {
      display: flex;
      align-items: center;
      text-align: center;
    }
    &-text {
      font-weight: 600;
      font-size: 12px;
      overflow: hidden;
      text-align: center;
      height: 40px;
      text-overflow: ellipsis;
      display: -moz-box;
      -moz-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      box-orient: vertical;
      padding: 0 10px;
    }
    &-item:last-child {
      margin: 0 20px;
      height: 20px;
    }
  }
}
</style>