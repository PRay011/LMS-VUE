<template>
    <navigationBar></navigationBar>
    <div class="container">
        <div class="box">
           <div class="left">
           </div>
           <div class="right">
                <div class="title">欢迎注册</div>
                <el-input v-model="accout" placeholder="请输入账号" style="" />
                <el-input v-model="password" placeholder="请输入密码" />
                <el-input v-model="confirePassword" placeholder="请再次输入密码" />
                <div style="margin-top: 10px;"></div>
                <div style="margin-top: 90px;"></div>
                <el-button class="login">注册</el-button>
                <el-button class="register" @click="login()">登录</el-button>
           </div>
        </div>
    </div>  
</template>

<script>
    import { defineComponent } from "vue"
    import '../../utils/register.js'
    import navigationBar from '../../components/header.vue'
      
    export default defineComponent({
        name: "register",
        data(){
            return {
              accout:'',
              password:'',
            }
        },
        components: {navigationBar},
        methods: {
            login(){
                this.$router.push('/login')
            }
        },
    })
</script>

  
<style scoped>
@import '../../assets/css/register.css';

:deep .el-input{
    width:60%;
    height:7%;
    margin-top:2%;
    margin-left: 10%;
    font-size:17px;

}
.el-input >>> .el-input__inner {
    width:100px;
} 

.forget{
    margin-left: 10%;
}

:deep .login{
    margin-left: 20%;
    height: 7%;
    width: 20%;
    font-size:15px;
    color:white;
    border:1px solid white;
    background-color:rgb(178, 135, 99);
}

.login:hover{
    color:rgb(178, 135, 99);
    background-color:white;
    border:1px solid rgb(178, 135, 99);
    transition-duration: 0.5s;
}

:deep .register{
    margin-left: 7%;
    height: 7%;
    width: 20%;
    font-size:15px;
    color:rgb(178, 135, 99);
    border:1px solid rgb(178, 135, 99);
    background-color:white;
}

.register:hover{
    color:white;
    background-color:rgb(178, 135, 99);
    border:1px solid white;
    transition-duration: 0.5s;
}

</style>
