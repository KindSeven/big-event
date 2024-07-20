import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const userInfo = ref({})

    const setToken = (newToken) => {
      token.value = newToken
    }

    const removeToken = () => {
      token.value = ''
    }

    const getUserInfo = async () => {
      const res = await userGetInfoService()
      userInfo.value = res.data.data
      // console.log(res.data.data)
    }

    const setUser = (obj) => {
      userInfo.value = obj
    }
    return {
      token,
      userInfo,
      setToken,
      removeToken,
      getUserInfo,
      setUser
    }
  },
  {
    persist: true
  }
)
