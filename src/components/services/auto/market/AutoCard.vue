<template>
<div class="card">
  <img 
    class="card__image" 
    :src="auto.images[0]">
        
  <div class="card__bottom">
    <div class="card__bottom-price">
      {{ auto?.price_rub.toLocaleString()
      + " ₽" || "Цена не указана"}} 
    </div>
    <div class="card__title">
       {{ auto.title }}
    </div>
    <div class="card__bottom-info">
      {{ auto.year }}, {{ auto.mileage.toLocaleString() }} км
    </div>
  </div>
</div>
</template>


<script setup>
defineProps({
  auto: Object
})
</script>


<style scoped lang="scss">
.card {
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  &__title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &__image {
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    object-fit: cover;
    max-height: 200px;
    width: 100%;
  }
  &__bottom {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    &-price {
      font-size: 16px;
      font-weight: 600;
    }
    &-info {
      font-size: 12px;
      color: grey;
    }
  }
}
</style>