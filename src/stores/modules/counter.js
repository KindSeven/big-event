import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const addCount=(newToken)=>{
    count.value = newToken
  }

  return { count,addCount }
})
