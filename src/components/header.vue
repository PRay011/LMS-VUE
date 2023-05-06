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
    <el-menu-item index="/userManagement" v-if="type==1">用户管理</el-menu-item>
    <el-menu-item index="/managerManagement" v-if="type==0">管理员管理</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item v-if="login" @click="logout()">登出</el-menu-item>
    <el-menu-item index="/login" v-else>登录</el-menu-item>
  </el-menu>
</template>

<script>
 import { defineComponent } from "vue"
 import axios from "axios";

  export default defineComponent({
      name: "header",
      data(){
          return {
              data:'',
              login: false,
              type: 2,
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
            this.type = JSON.parse(sessionStorage.getItem("user"));
            this.login = true
          }
          else{
            this.login= false;
            this.type = 2;
          }
        },
        logout(){
          let that = this;
          let config = {
            method: 'delete',
            url: `http://localhost:5000/loginUser/session`,
            headers: {
            },
            };
            axios(config)
            .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                  alert('退出登陆成功');
                  sessionStorage.setItem("user", JSON.stringify(null));
                  that.login=false;
                  that.$router.push('/')
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                console.log(error);
                });
          
        }
      }
  })
</script>

<style>
    .flex-grow {
        flex-grow: 1;
    }
</style>