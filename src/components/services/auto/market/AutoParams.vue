<template>
<div class="params">
  <div class="params__item">
    <div class="params__title">
      Год выпуска
    </div>
    <div class="params__inputs">
      <a-input-number 
        @change="$emit('changeParams', state.params)"
        class="params__inputs-item"
        v-model:value="state.params.year[0]" 
        :placeholder="'От'"
        :min="1980" 
        :max="2024"/>
       <a-input-number 
         @change="$emit('changeParams', state.params)"
         class="params__inputs-item"
         v-model:value="state.params.year[1]" 
         :placeholder="'До'"
         :min="1980" 
         :max="2024"/>
    </div>
    <a-slider 
      @change="$emit('changeParams', state.params)"
      v-model:value="state.params.year" 
      range
      :tip-formatter="yearFormatter"
      :min="1980" 
      :max="2024" />
  </div>
        
  <div class="params__item">
    <div class="params__title">
      Пробег (км)
    </div>
    <div class="params__inputs">
      <a-input-number 
        @change="$emit('changeParams', state.params)"
        class="params__inputs-item"
        v-model:value="state.params.mileage[0]" 
        :placeholder="'От'"
        :min="0" 
        :max="1000000"/>
       <a-input-number 
         @change="$emit('changeParams', state.params)"
         class="params__inputs-item"
         v-model:value="state.params.mileage[1]" 
         :placeholder="'До'"
         :min="0" 
         :max="1000000"/>
    </div>
    <a-slider 
      @change="$emit('changeParams', state.params)"
      v-model:value="state.params.mileage" 
      :tip-formatter="mileageFormatter"
      range 
      :step="1000"
      :min="0" 
      :max="1000000" />
  </div>
        
  <div class="params__item">
    <div class="params__title">
      Мощность двигателя (л.с)
    </div>
    <div class="params__inputs">
      <a-input-number 
        @change="$emit('changeParams', state.params)"
        class="params__inputs-item"
        v-model:value="state.params.power[0]" 
        :placeholder="'От'"
        :min="20" 
        :max="2000"/>
       <a-input-number 
         @change="$emit('changeParams', state.params)"
         class="params__inputs-item"
         v-model:value="state.params.power[1]" 
         :placeholder="'До'"
         :min="20" 
         :max="2000"/>
    </div>
    <a-slider 
      @change="$emit('changeParams', state.params)"
      v-model:value="state.params.power" 
      :tip-formatter="powerFormatter"
      range 
      :step="10"
      :min="20" 
      :max="2000" />
  </div>
        
  <div class="params__item">
    <div class="params__title">
      Количество владельцев
    </div>
    <a-select
      @change="$emit('changeParams', state.params)"
      class="params__select"
      v-model:value="state.params.owners" >
      <a-select-option value="one">
        Один
      </a-select-option>
      <a-select-option value="two">
        Два
      </a-select-option>
      <a-select-option value="threeMore">
        Три и более
      </a-select-option>
    </a-select>
  </div>
        
  <div class="params__item">
    <div class="params__title">
      Цена (руб)
    </div>
    <div class="params__inputs">
      <a-input-number 
        @change="$emit('changeParams', state.params)"
        class="params__inputs-item"
        v-model:value="state.params.price[0]" 
        :placeholder="'От'"
        :min="50000" 
        :max="20000000"/>
       <a-input-number 
         @change="$emit('changeParams', state.params)"
         class="params__inputs-item"
         v-model:value="state.params.price[1]" 
         :placeholder="'До'"
         :min="50000" 
         :max="20000000"/>
    </div>
    <a-slider 
      @change="$emit('changeParams', state.params)"
      v-model:value="state.params.price" 
      :tip-formatter="priceFormatter"
      range 
      :step="10000"
      :min="50000" 
      :max="20000000" />
  </div>
  
  <div class="params__item">
    <div class="params__title">
      Объем двигателя (литров)
    </div>
    <div class="params__inputs">
      <a-input-number 
        @change="$emit('changeParams', state.params)"
        class="params__inputs-item"
        v-model:value="state.params.engine_volume[0]" 
        :placeholder="'От'"
        :min="0.5" 
        :max="10"/>
       <a-input-number 
         @change="$emit('changeParams', state.params)"
         class="params__inputs-item"
         v-model:value="state.params.engine_volume[1]" 
         :placeholder="'До'"
         :min="0.5" 
         :max="20"/>
    </div>
    <a-slider 
      @change="$emit('changeParams', state.params)"
      v-model:value="state.params.engine_volume" 
      :tip-formatter="enginevolumeFormatter"
      range 
      :step="0.1"
      :min="0.5" 
      :max="20" />
  </div>
  
  <div class="params__item">
    <div class="params__title">
      Расположение руля
    </div>
    <a-select mode="multiple"
      @change="$emit('changeParams', state.params)"
      class="params__select"
      v-model:value="state.params.handlebar" >
      <a-select-option value="left">
        Слева
      </a-select-option>
      <a-select-option value="right">
        Справа
      </a-select-option>
    </a-select>
  </div>
  
  <div class="params__item">
    <div class="params__title">
      Привод
    </div>
    <a-select mode="multiple"
      @change="$emit('changeParams', state.params)"
      class="params__select"
      v-model:value="state.params.drive" >
      <a-select-option value="front">
        Передний
      </a-select-option>
      <a-select-option value="rear">
        Задний
      </a-select-option>
      <a-select-option value="full">
        Полный
      </a-select-option>
    </a-select>
  </div>
  
  <div class="params__item">
    <div class="params__title">
      Цвет
    </div>
    <a-select mode="multiple"
      @change="$emit('changeParams', state.params)"
      class="params__select"
      v-model:value="state.params.color" >
      <a-select-option value="black">
        Черный
      </a-select-option>
      <a-select-option value="grey">
        Серый
      </a-select-option>
      <a-select-option value="violet">
        Фиолетовый
      </a-select-option>
      <a-select-option value="white">
        Белый
      </a-select-option>
      <a-select-option value="red">
        Красный
      </a-select-option>
      <a-select-option value="pink">
        Розовый
      </a-select-option>
      <a-select-option value="orange">
        Оранжевый
      </a-select-option>
      <a-select-option value="yellow">
        Желтый
      </a-select-option>
      <a-select-option value="green">
        Зеленый
      </a-select-option>
      <a-select-option value="blue">
        Синий
      </a-select-option>
    </a-select>
  </div>
  
  <div class="params__item">
    <div class="params__title">
      Коробка передач
    </div>
    <a-select mode="multiple"
      @change="$emit('changeParams', state.params)"
      class="params__select"
      v-model:value="state.params.kpp" >
      <a-select-option value="automat">
        Автомат
      </a-select-option>
      <a-select-option value="mechanic">
        Механика
      </a-select-option>
      <a-select-option value="robot">
        Робот
      </a-select-option>
    </a-select>
  </div>
  
  <div class="params__item">
    <div class="params__title">
      Тип кузова
    </div>
    <a-select mode="multiple"
      @change="$emit('changeParams', state.params)"
      class="params__select"
      v-model:value="state.params.body" >
      <a-select-option value="sedan">
        Седан
      </a-select-option>
      <a-select-option value="coupe">
        Купе
      </a-select-option>
      <a-select-option value="liftback">
        Лифтбек
      </a-select-option>
      <a-select-option value="jeep">
        Внедорожник
      </a-select-option>
      <a-select-option value="universal">
        Универсал
      </a-select-option>
      <a-select-option value="minivan">
        Минивэн
      </a-select-option>
      <a-select-option value="van">
        Фургон
      </a-select-option>
      <a-select-option value="convertible">
        Электро
      </a-select-option>
    </a-select>
  </div>
  
  <div class="params__item">
    <div class="params__title">
      Тип топлива
    </div>
    <a-select mode="multiple"
      @change="$emit('changeParams', state.params)"
      class="params__select"
      v-model:value="state.params.fuel" >
      <a-select-option value="petrol">
        Бензин
      </a-select-option>
      <a-select-option value="diesel">
        Дизель
      </a-select-option>
      <a-select-option value="gibrid">
        Гибрид
      </a-select-option>
      <a-select-option value="electro">
        Электро
      </a-select-option>
    </a-select>
  </div>
  
  
  <div class="actions">
    <div class="actions__buttons">
      <a-button 
        @click="toggleFloating()"
        type="primary" 
        class="actions__buttons-item actions__buttons-full">
        Готово
      </a-button> 
    </div>
  </div>
</div>
</template>


<script setup>
import { reactive } from "vue";
import { message } from 'ant-design-vue';

const $emit = defineEmits()
const props = defineProps({
  params: Object
});

const state = reactive({
  params: {
    year: [],
    mileage: [],
    power: [],
    owners: "",
    price: [],
    engine_volume: [],
    handlebar: "",
    drive: "",
    color: "",
    kpp: "",
    body: "",
    fuel: ""
  }
});

if (Object.keys(props.params).length !== 0) {
  state.params = props.params 
}

const toggleFloating = () => {
    $emit('toggleFloating')
    message.success('Парметры успешно сохранены');
};

const yearFormatter = (value) => {
    return `${value} год`;
};
const mileageFormatter = (value) => {
  return `${value} км`;
};
const powerFormatter = (value) => {
  return `${value} л.с`;
};
const priceFormatter = (value) => {
  return `${value} руб.`;
};
const enginevolumeFormatter = (value) => {
  return `${value} л.`;
};
</script>


<style lang="scss" scoped>
.params {
  padding-bottom: 80px;
  &__item {
    border-bottom: 1px solid #f4f5f5;
  }
  &__title {
    padding: 10px 0;
    font-weight: 600;
  }
  &__inputs {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    &-item {
      width: 100%;
    }
  }
  &__select {
    width: 100%;
    padding-bottom: 10px;
  }
}

.actions {
  position: fixed;
  bottom: 40px;
  left: 0;
  width: 100%;
  height: 40px;
  &__buttons {
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
    }
  }
}
</style>