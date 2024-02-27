<template>
  <div class="actions">
    <div class="actions__buttons">
      <a-button class="actions__buttons-item">
        <span class="material-icons-round">bookmark_border</span>
      </a-button>
      <a-button class="actions__buttons-item">
        <span class="material-icons-round">chat_bubble_outline</span>
      </a-button>
      <a-button class="actions__buttons-item">
        <span class="material-icons-round">favorite_border</span>
      </a-button>
    </div>
  </div>
</template>


<script setup lang="ts">
defineProps({
  post: Object
})
</script>


<style scoped lang="scss">
.actions {
  position: fixed;
  bottom: 88px;
  width: 100%;
  height: 40px;
  &__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0 20px;
    gap: 10px;
    &-item {
      border: none;
      height: 48px;
      border-radius: 10px;
      width: 48px;
      box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 16px;
      color: #C5C5C5;
      & > span {
        margin-left: 5px;
      }
    }
  }
}
</style>