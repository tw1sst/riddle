<template>
<div class="market">
  <div class="container">
    <h2>🚘 Маркет авто</h2>
    
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="auto" tab="Транспорт">
        <a-segmented block style="margin: 0;" v-model:value="state.searchType" :options="state.searchTypes">
          <template #label="{ payload }">
            {{ payload.title }}
          </template>
        </a-segmented>
    
        <BrandSelect />
    
        <template v-if="allAutos">
          <h2>Популярное</h2>
          <a-carousel arrows dots-class="slick-dots" class="market__slider" autoplay>
            <div v-for="auto in allAutos" class="market__slider-item">
              <AutoCard  
                :auto="auto" 
                @click="$router.push({ name: 'AutoMarketItem', params: { id: auto, item: JSON.stringify(auto) } })" />
            </div>
          </a-carousel>
          <br/>
          <h2>Для вас</h2>
          <div class="market__maingrid">
            <AutoCard 
              v-for="auto in allAutos" 
              :auto="auto"
              @click="$router.push({ name: 'AutoMarketItem', params: { id: auto.id, item: JSON.stringify(auto) } })"/>
          </div>
          <br/>
          
          <div class="market__fullitems">
             <AutoCardFull
              class="autos__maingrid-item"
              :auto="allAutos[0]"
              @click="$router.push({ name: 'AutoMarketItem', params: { id: allAutos[0], item: JSON.stringify(allAutos[0]) } })"/>
          </div>
            
        </template>
      </a-tab-pane>
      <a-tab-pane key="numbers" tab="Запчасти" force-render>
      </a-tab-pane>
      
    <a-tab-pane key="tuning" tab="Тюнинг">Тюнинг</a-tab-pane>
      <a-tab-pane key="osago" tab="ОСАГО"> Осаго </a-tab-pane>
      <a-tab-pane key="credits" tab="Кредиты"> Кредиты </a-tab-pane>
    </a-tabs>
      
     <a-result
       v-if="allAutos?.length == 0"
       status="info"
       title="Предметов не найдено!"
       sub-title="Извините, предметов для отображения не найдено. Попробуйте обновить страницу, или вернитесь позже."
  >
      <template #extra>
        <a-button @click="getMarketItems" type="primary">Обновить</a-button>
        <a-button @click="$router.push({ name: 'AccountHome' })">Вернуться домой</a-button>
      </template>
    </a-result>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

import AutoCard from '@/components/services/auto/market/AutoCard.vue'
import AutoCardFull from '@/components/services/auto/market/AutoCardFull.vue'
import BrandSelect from '@/components/services/auto/market/BrandSelect.vue'

import { allAutos } from '@/server/fakedata/auto/Autos.js'
const activeKey = ref("auto");

const state = reactive({
  marketItems: [],
  searchType: {},
  searchTypes: [
    {
      value: "auto",
      payload: {
        title: "Легковые"
      }
    },
    {
      value: "moto",
      payload: {
        title: "Мото"
      }
    },
    {
      value: "comtrans",
      payload: {
        title: "Комтранс"
      }
    }
  ],
});

state.searchType = state.searchTypes[0].value

const getMarketItems = () => {
  axios
    .get("https://coincharts.ru/api/items")
    .then((res) => {
      if (res.data.length) state.marketItems = res.data
    })
    .catch((error) => {
      console.log(error)
  })
}

const filterByTag = (tag) => {
  let newItems = []
  state.marketItems.forEach((item) => {
  if (item?.tags && item.tags.indexOf(tag) != -1) {
      newItems.push(item)
    }
  }) 
  return newItems
}
// getMarketItems();
</script>


<style scoped lang="scss">
.container {
  padding: 10px 20px 40px 20px;
  position: relative;
}
.market {
  &__maingrid {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    margin: 0 -10px;
  }
  &__fullitems {
    padding: 0 10px;
  }
  &__slider {
    margin: 0 -20px 0 -20px;
    :deep(.slick-dots) {
      position: relative;
      height: auto;
    }
    :deep(.slick-arrow) {
      display: none !important;
    }
    &-item {
      padding: 0 10px;
    }
  }
}
</style>