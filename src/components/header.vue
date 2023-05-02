<template>

<el-menu
:default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="/">主页</el-menu-item>
    <el-sub-menu index="2" >
      <template #title>图书馆</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>C2C</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <!-- <el-menu-item index="3" disabled>信息</el-menu-item> -->
    <el-menu-item index="3" >信息</el-menu-item>
    <el-menu-item index="4">个人中心</el-menu-item>
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