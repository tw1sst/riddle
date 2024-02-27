<template>
<div class="card">
  <div class="card__info">
    <div class="card__title">
       {{ auto.title }}
    </div>
    <div class="card__price">
      {{ auto?.price_rub.toLocaleString()
      + " ₽" || "Цена не указана"}} 
    </div>
  </div>
    
  <a-carousel arrows dots-class="slick-dots" class="card__images">
    <img 
      v-for="image in auto.images"
      class="card__images-image" 
      :src="image">
  </a-carousel>
        
  <div class="card__info">
    <div class="card__grid">
      <div class="card__grid-item">
        <div>{{ auto.year }} год</div>
        <div>{{ auto.mileage.toLocaleString() }} км.</div>
      </div>
      
      <div class="card__grid-item">
        <div>{{ auto.engine_volume.toFixed(1) }} л.</div>
        <div>{{ auto.power }} л.с.</div>
      </div>
    </div>
 </div>
 
 <div class="card__bottom">
   <div class="card__bottom-left">
      <span>{{ auto.post_country }}, {{ auto.post_city }}</span>
   </div>
   
   <div class="card__bottom-right">
     <span class="material-icons-round card__bottom-item">more_horiz</span>
     <span class="material-icons-round card__bottom-item">favorite_border</span>
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
  margin: 0 -20px;
  &__title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &__images {
    :deep(.slick-dots) {
      position: relative;
      height: auto;
    }
    :deep(.slick-arrow) {
      display: none !important;
    }
    &-image {
      overflow: hidden;
      object-fit: cover;
      max-height: 200px;
      width: 100%;
    }
  }
  &__info {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
  }
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    &-item {
      display: flex;
      flex-direction: column;
    }
  }
  &__price {
    font-size: 18px;
    font-weight: 700;
  }
  &__bottom {
    padding: 10px 20px;
    border-top: 1px solid #f4f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left {
      color: #C5C5C5;
      display: flex;
      align-items: center;
    }
    &-right {
      display: flex;
      align-items: center;
    }
    &-item {
      margin-left: 10px;
    }
  }
}
</style>