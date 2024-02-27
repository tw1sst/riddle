<template>
<div class="autos">
  <div class="autos__header">
    <div class="autos__header-left">
      <span @click="$router.push({ name: 'AutoMarket' })" class="material-icons-round autos__header-item">arrow_back_ios</span>
    </div>
    <div class="autos__header-center">
      <div>3 предложения</div>
      <div class="autos__header-subtext">
        20 000 ₽ - 3 628 000 ₽
      </div>
    </div>
    <div class="autos__header-right">
      <span class="material-icons-round autos__header-item">more_horiz</span>
      <span class="material-icons-round autos__header-item">swap_vert</span>
    </div>
  </div>
  
  <div class="container">
    <h3>Результаты поиска</h3>
    <BrandSelect />
    
    <div class="autos__maingrid">
      <AutoCardFull
        class="autos__maingrid-item"
        v-for="auto in allAutos" 
        :auto="auto"
        @click="$router.push({ name: 'AutoMarketItem', params: { id: auto.id, item: JSON.stringify(auto) } })"/>
    </div>
  </div>
</div>
</template>


<script setup>
import BrandSelect from '@/components/services/auto/market/BrandSelect.vue'
import AutoCardFull from '@/components/services/auto/market/AutoCardFull.vue'
import { allAutos } from '@/server/fakedata/auto/Autos.js'
</script>


<style lang="scss" scoped>
.container {
  padding: 0 20px;
}
.autos {
  padding: 20px 0 80px 0;
  &__header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    position: fixed;
    width: 100%;
    top: 0;
    background-color: white;
    z-index: 100;
    &-center {
      font-weight: 600;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &-subtext {
      font-size: 12px;
      color: #C5C5C5;
    }
    & > div {
      display: flex;
      align-items: center;
      text-align: center;
    }
    &-item:last-child {
      margin: 0 20px;
      height: 20px;
    }
  }
  &__maingrid {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    &-item {
      margin-bottom: 10px;
    }
  }
}
</style>