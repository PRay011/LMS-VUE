<template>
    <navigationBar></navigationBar>
    <div class="container">
        <div class="box">
            <div class="left">
            </div>
            <div class="right">
                <div class="title">欢迎注册</div>
<<<<<<< HEAD
                <el-input v-model="account" placeholder="请输入账号" style="" />
                <el-input v-model="password" placeholder="请输入密码" />
                <el-input v-model="confirmPassword" placeholder="请再次输入密码" />
=======
                <el-input v-model="account" placeholder="请输入账号" style=""/>
                <el-input v-model="password" placeholder="请输入密码"/>
                <el-input v-model="confirmPassword" placeholder="请再次输入密码"/>
>>>>>>> 0df1a967c2c35002301b4ba11d4802336445bb7b
                <div style="margin-top: 15px;"></div>
                <el-radio-group v-model="category" style="margin-left: 10%;">
                    <el-radio :label="2" size="large">学生</el-radio>
                    <el-radio :label="3" size="large">老师</el-radio>
                </el-radio-group>
                <div style="margin-top: 65px;"></div>
                <el-button class="login" @click="register()">注册</el-button>
                <el-button class="register" @click="toLogin()">登录</el-button>
<<<<<<< HEAD
           </div>
=======
            </div>
>>>>>>> 0df1a967c2c35002301b4ba11d4802336445bb7b
        </div>
    </div>
</template>

<script>
<<<<<<< HEAD
    import { defineComponent } from "vue"
    import '../../utils/register.js'
    import navigationBar from '../../components/header.vue'
      
    export default defineComponent({
        name: "register",
        data(){
            return {
              account:'',
              password:'',
              confirmPassword:'',
              category:2,
            }
        },
        components: {navigationBar},
        methods: {
            toLogin(){
                this.$router.push('/login')
            },
            register(){
                
                sessionStorage.setItem("user", JSON.stringify('true'));
                console.log(this.category)
                this.$router.push('/')
            }
        },
    })
=======
import {defineComponent} from "vue"
import '../../utils/register.js'
import navigationBar from '../../components/header.vue'
import axios from "axios";

export default defineComponent({
    name: "register",
    data() {
        return {
            account: '',
            password: '',
            confirmPassword: '',
            category: 2,
        }
    },
    components: {navigationBar},
    methods: {
        register() {
            let that = this
            if (that.account === null || that.password === null || that.confirmPassword === null) {
                alert("输入不能为空")
            } else if (that.password !== that.confirmPassword) {
                alert("两次密码不相等")
            } else {
                let data = {
                    userid: that.account,
                    password: that.password,
                    userType: 2
                };
                let config = {
                    method: 'post',
                    url: 'http://localhost:5000/guest/account',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                axios(config)
                    .then(function (response) {
                        let res = response.data
                        if (res.code === 200) {
                            that.$router.push('/')
                        } else {
                            alert(res.msg)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        toLogin() {
            this.$router.push('/login')
        }
    },
})
>>>>>>> 0df1a967c2c35002301b4ba11d4802336445bb7b
</script>


<style scoped>
@import '../../assets/css/register.css';

:deep .el-input {
    width: 60%;
    height: 7%;
    margin-top: 2%;
    margin-left: 10%;
    font-size: 17px;

}

.el-input >>> .el-input__inner {
    width: 100px;
}

.forget {
    margin-left: 10%;
}

:deep .login {
    margin-left: 20%;
    height: 7%;
    width: 20%;
    font-size: 15px;
    color: white;
    border: 1px solid white;
    background-color: rgb(178, 135, 99);
}

.login:hover {
    color: rgb(178, 135, 99);
    background-color: white;
    border: 1px solid rgb(178, 135, 99);
    transition-duration: 0.5s;
}

:deep .register {
    margin-left: 7%;
    height: 7%;
    width: 20%;
    font-size: 15px;
    color: rgb(178, 135, 99);
    border: 1px solid rgb(178, 135, 99);
    background-color: white;
}

.register:hover {
    color: white;
    background-color: rgb(178, 135, 99);
    border: 1px solid white;
    transition-duration: 0.5s;
}

</style>
