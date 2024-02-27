<template>
<div class="brand__search">
  <div class="brand__search-item"
     @click="toggleFloating()">
     <div v-if="state.selectedBrand?.title">
       {{ state.selectedBrand.title }}
       <template v-if="state.selectedModels.length" >: 
         <template v-for="(model, key) in state.selectedModels">{{ model.title }}<template v-if="(key + 1) !== state.selectedModels.length">, </template>
         </template>
      </template>
    </div>
    <div v-else>
      Марка, модель
    </div>
    <span class="material-icons-round">drive_eta</span>
  </div>
  <div @click="toggleParamsSelect()" class="brand__search-item">
    <div>Параметры</div>
    <span class="material-icons-round">tune</span>
  </div>
  
  <a-segmented block style="margin: 0;" v-model:value="state.searchCondition" :options="state.searchConditions">
  <template #label="{ payload }">
    {{ payload.title }}
  </template>
</a-segmented>
  
  <a-button 
    @click="$router.push({ name: 'AutoSearchResult' })"
    size="large" 
    class="brand__search-button" 
    block 
    type="primary">
    Показать {{ allAutos.length }} авто
  </a-button>
</div>

<FloatingPanel 
  v-if="state.isShowFloating"
  title="Выберите марку"
  @toggleFloating="toggleFloating"
  :isShowFloating="state.isShowFloating">
  <a-input placeholder="Поиск марки..">
    <template #suffix>
      <span class="material-icons-round">search</span>
    </template>
  </a-input>

  <ul class="brand__select">
    <template v-for="brand in AutoBrands">
      <li class="brand__select-item" 
        @click="toggleModelSelect(brand)">
        <div class="brand__select-logo">
          <img :src="brand.logoPath">
        </div>
      
        <div class="brand__select-title">
          {{ brand.title }}
        </div>
      </li>
    </template>
  </ul> 
</FloatingPanel>

<FloatingPanel 
  v-if="state.isShowModelSelect"
  title="Выберите модель"
  @toggleFloating="toggleModelSelect"
  :isShowFloating="state.isShowModelSelect">
  <a-input placeholder="Поиск модели..">
    <template #suffix>
      <span class="material-icons-round">search</span>
    </template>
  </a-input>
    
  <a-checkbox-group v-model:value="state.selectedModels" style="width: 100%">
    <ul class="brand__select">
      <li class="brand__select-model" 
        v-for="model in state.selectedBrand.models"> 
        <label :for="model.id" class="brand__select-title">
          {{ model.title }}
        </label>
        <a-checkbox
          :id="model.id"
          :value="model"
        />
      </li>
    </ul> 
  </a-checkbox-group>
</FloatingPanel>

<FloatingPanel 
  v-if="state.isShowParamsSelect"
  title="Выберите параметры"
  @toggleFloating="toggleParamsSelect"
  :isShowFloating="state.isShowParamsSelect">    
    <AutoParams 
      @changeParams="changeParams" 
      @toggleFloating="toggleParamsSelect"
      :params="state.params">
    </AutoParams>
</FloatingPanel>
</template>


<script setup lang="ts">
import FloatingPanel from '@/components/uikit/FloatingPanel.vue'
import { AutoBrands } from '@/server/fakedata/auto/AutoBrands.js'
import { allAutos } from '@/server/fakedata/auto/Autos.js'
import AutoParams from "@/components/services/auto/market/AutoParams.vue"

import { reactive } from "vue";
import axios from "axios";

const state = reactive({
  isShowFloating: false,
  isShowModelSelect: false,
  isShowParamsSelect: false,
  selectedBrand: {},
  searchCondition: {},
  selectedModels: [],
  searchConditions: [
    {
      value: "all",
      payload: {
        title: "Все"
      }
    },
    {
      value: "new",
      payload: {
        title: "Новые"
      }
    },
    {
      value: "mileage",
      payload: {
        title: "С пробегом"
      }
    }
  ],
  params: {}
});

state.searchCondition = state.searchConditions[0].value

const toggleFloating = () => {
  state.isShowModelSelect = false
  state.isShowFloating = !state.isShowFloating
}

const toggleModelSelect = (brand: object) => {
  if (brand) { 
    if (brand.id != state.selectedBrand.id) {
      state.selectedModels = []
    }
    state.selectedBrand = brand
  }
  
  if (state.isShowFloating) state.isShowFloating = false
  else state.isShowFloating = true
  
  state.isShowModelSelect = !state.isShowModelSelect
}

const toggleParamsSelect = () => {
  state.isShowParamsSelect = !state.isShowParamsSelect
}

const changeParams = (params) => {
  state.params = params
}
</script>


<style scoped lang="scss">
.brand {
  &__search {
    background-color: #fff;
    border-radius: 10px;
    margin: 20px 0;
    padding: 0 20px;
    &-button {
      margin: 20px 0;
    }
    &-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0px;
      &:first-child {
        border-bottom: 1px solid #f4f5f5;
      }
    }
  }
  &__select {
    width: 100%;
    margin-top: 20px;
    &-item {
      display: flex;
      padding: 5px 0;
      align-items: center;
      border-bottom: 1px solid #f4f5f5;
    }
    &-model {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f4f5f5;
    }
    &-logo {
      width: 34px;
      height: 34px;
      margin-right: 20px;
    }
  }
}
</style>