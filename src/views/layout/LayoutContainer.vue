<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  CaretBottom,
  SwitchButton
} from '@element-plus/icons-vue'
import router from '@/router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
onMounted(() => {
  userStore.getUserInfo()
  console.log(userStore.userInfo)
})

const onCommand = async (command) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('确定要退出吗', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    userStore.setUser({})
    userStore.removeToken()
    router.push('/login')
  } else {
    router.push(`/user/${command}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <!-- <h1>大事件</h1> -->
      <el-menu
        text-color="#fff"
        active-text-color="#ffd04b"
        background-color="#232323"
      >
        <el-menu-item>
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item>
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item>
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item>
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item>
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div>
          黑马程序员:
          <strong>
            {{ userStore.userInfo.username || userStore.userInfo.nickname }}
          </strong>
        </div>
        <el-dropdown placement="bottom-end" @command="onCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.userInfo.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="User" command="profile"
                >基础信息</el-dropdown-item
              >
              <el-dropdown-item :icon="EditPen" command="password"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item :icon="Crop" command="avatar"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item :icon="SwitchButton" command="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>by 王xy </el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
}
.el-header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown__box {
    display: flex;
    align-items: center;
    .el-icon {
      color: #999;
      margin-left: 10px;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }
}
</style>
