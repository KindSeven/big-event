<script setup>
import { ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { userRegisterService } from '@/api/user.js'
import { userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const isRegister = ref(true)
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
const form = ref()
const rules = ref({
  username: [
    { required: true, message: '请输入用户名,', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码,', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入用户名,', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})
// console.log(formModel.value);
const register = async () => {
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  // 切换到登录
  isRegister.value = false
}

const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登陆成功')
  router.push('/')
}

watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <div>登录&注册</div>
  <el-row type="flex" justify="center" class="bg">
    <el-col :span="6">
      <el-form
        v-if="isRegister"
        size="large"
        autocomplete="off"
        :model="formModel"
        ref="form"
        :rules="rules"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            :prefix-icon="Lock"
            type="password"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            placeholder="确认密码"
            :prefix-icon="Lock"
            type="password"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="button"
            auto-insert-space
            @click="register"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isRegister = false"
            >返回→</el-link
          >
        </el-form-item>
      </el-form>

      <el-form
        v-else
        size="large"
        autocomplete="off"
        :model="formModel"
        ref="form"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            placeholder="密码"
            type="password"
            name="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码</el-link>
          </div>
          <el-form-item>
            <el-button
              type="primary"
              class="button"
              auto-insert-space
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form-item>
        <el-link type="info" :underline="false" @click="isRegister = true"
          >注册→</el-link
        >
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.bg {
  background-color: white;
}
.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
