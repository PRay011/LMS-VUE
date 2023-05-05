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
    <!-- <el-menu-item index="4" >信息</el-menu-item> -->
    <el-menu-item index="/selfCenter">个人中心</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item v-if="login" @click="logout()" >登出</el-menu-item>
    <el-menu-item index="/login" v-else>登录</el-menu-item>
  </el-menu>

</template>

<script>
 import { defineComponent } from "vue"

  export default defineComponent({
      name: "header",
      data(){
          return {
              data:'',
              login:false,
          }
      },
      mounted:function(){
          this.whetherLogin()
      },
      methods: {
        handleSelect(key, keyPath) {
        this.$router.push({
          path: key,
          params: {data: 'query' }
        })
        },
        whetherLogin(){
          if(JSON.parse(sessionStorage.getItem("user"))!=null){
            this.login = JSON.parse(sessionStorage.getItem("user"));
          }
          else{
            this.login=false
          }
          console.log(this.login)
        },
        logout(){
          sessionStorage.setItem("user", JSON.stringify('false'));
          this.login=false
        }
      }
  })
</script>

<style>
    .flex-grow {
        flex-grow: 1;
    }
</style>