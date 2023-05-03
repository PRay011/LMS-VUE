<template>

<el-menu
:default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="/">主页</el-menu-item>
    <el-menu-item index="/library">图书馆</el-menu-item>
    <!-- <el-menu-item index="3" disabled>信息</el-menu-item> -->
    <el-menu-item index="3" >C2C</el-menu-item>
    <el-menu-item index="4" >信息</el-menu-item>
    <el-menu-item index="5">个人中心</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/login">登录</el-menu-item>
  </el-menu>

</template>

<script>
 import { defineComponent } from "vue"

  export default defineComponent({
      name: "header",
      data(){
          return {
              data:''
          }
      },
      methods: {
        handleSelect(key, keyPath) {
        this.$router.push({
          path: key,
          params: {data: 'query' }
        })
      }
      }
  })
</script>

<style>
    .flex-grow {
        flex-grow: 1;
    }
</style>