<template>

111

</template>


<script setup>
import { reactive } from "vue";

const state = reactive({
  monthDays: 31,
  persons: []
});

state.persons = [
  {
    id: 1,
    name: "Пахомова",
    post630: [3,6,10,13,17,21,24,27,30],
    post730: false,
    postTelegraph: false,
  },
  {
    id: 2,
    name: "Тахмезов",
    post630: [4,7,11,14,18,22,25,28,31],
    post730: false,
    postTelegraph: false,
  },
  {
    id: 3,
    name: "Клейменов",
    post630: true,
    post730: true,
    postTelegraph: false,
  },
  {
    id: 4,
    name: "Павленков",
    post630: true,
    post730: true,
    postTelegraph: [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31],
  },
  {
    id: 5,
    name: "Понимаш",
    post630: true,
    post730: true,
    postTelegraph: [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30],
  },
  {
    id: 6,
    name: "Комиссаров",
    post630: false,
    post730: [1,6,10,14,18,22,27],
    postTelegraph: false,
  },
  {
    id: 7,
    name: "Ламанова",
    post630: false,
    post730: [3,7,11,16,20,24,28],
    postTelegraph: false,
  },
]


for (let day = 1; day <= state.monthDays; day++) { 

  state.persons.forEach(person => {
    //если человек на телеграфе в текущий день
    if (person.postTelegraph) {
      if (contains(person.postTelegraph, day)) {
        console.log("число " + day)
        console.log("человек на телеграфе " + person.name )
        console.log("----------")
        return;
      }
    }
    
    // если человек ходит на 630
    if (person.post630) {
      // если он на 630 в текущий день
      if (contains(person.post630, day)) {
        return;
      } else {
        // проверяем есть ли он на 730 в этот день
        if (contains(person.post730, day)) {
          return;
        } else {
          
        }
      }
    }
    
   if (person.post730) {
      // если он на 730 в текущий день
      if (contains(person.post730, day)) {
        return;
      } else {
        // проверяем есть ли он на 630 в этот день
        if (contains(person.post630, day)) {
          return;
        } else {
          
        }
      }
    }
  })
}

console.log("1111")

console.log(state.persons)

function contains(arr,elem) {
   return arr.indexOf(elem) != -1;
}



</script>


<style lang="scss" scoped>

</style>