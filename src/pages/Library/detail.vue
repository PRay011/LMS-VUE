<template>
    <navigationBar></navigationBar>
    <div class="container">
        <div class="head-image">
        </div>
        <div class="head-content">
            <div class="title">
                图书管理系统
            </div>
        </div>
        <div class="bottom">
            <div class="book-image">
                <img :src="imgSrc" class="image"  onerror="this.src='/1.jpg';this.οnerrοr=null;" />
            </div>
            <div class="book-name">
                <el-text class="name">{{ name }}</el-text>
            </div>
            <div class="book-info">
                <div> 
                    <el-text>ISBN:</el-text>
                    <el-text type="primary">  {{ ISBN }}</el-text>
                </div>
                <div style="margin-top: -3%;"> 
                    <el-text>拥有者:</el-text>
                    <el-text type="primary">  {{ owner }}</el-text>
                </div>
                <div class="introduce">
                    <el-text>简介:</el-text>
                    <el-text type="primary">  {{ introduce }}</el-text>
                </div>
            </div>
            <el-button color="#626aef" :dark="isDark" plain style="margin-left: 29%;" @click="openChat()">在线交流</el-button>
            <div class="buttons">
                <el-button type="primary" size="large" style="width:6%">在线阅读</el-button>
                <el-button type="success" size="large" style="margin-left: 2%; width:6%" @click="borrow()">借书</el-button>
            </div>
        </div>
    </div>
    <el-drawer v-model="chatStatus" title="I am the title" :direction="direction" :size="'80%'"  style="width:1000px;margin-top: 5%;margin-left: 25%;">
    <template #header>
      <h4>聊天界面</h4>
    </template>
    <div class="chat-top">
        <el-scrollbar height="100%">
            <div v-for="item in chatRecords" :key="item.id" class="item">
                <div class="item-left" v-if="item.speakerid == owner">
                    <span class="left-name">{{ item.speakerid }}:</span>
                    <span class="left-content">{{ item.message }}</span>
                </div>
                <div class="item-right" v-if="item.speakerid != owner">
                    <span class="right-name">:{{ item.speakerid }}</span>
                    <span class="right-content">{{ item.message }}</span>
                </div>
            </div>
        </el-scrollbar>
    </div>
    <div class="chat-bottom">
        <el-input
            v-model="message_new"
            :rows="6"
            type="textarea"
            placeholder="请输入"
        />
        <el-button type="primary" size="large" class="send" @click="sendMessage()">发送</el-button>
        
    </div>
  </el-drawer>
</template>

<script>
    import { defineComponent } from "vue"
    import '../../utils/detail.js'
    import navigationBar from '../../components/header.vue'
    import axios from "axios";
      
    export default defineComponent({
        name: "detail",
        data(){
            return {
              direction:'ttb',
              chatStatus:false,
              id:'',
              name:'',
              introduce:'',
              imgSrc:'',
              ISBN:'',
              owner:'',
              message_new:'',
              chatRecords:[
              {
                date:"2023-05-04 23:18:16",
                id:2,
                message:"hello",
                receiverid:"pr",
                speakerid:"小王"
              },
              {
                date:"2023-05-04 23:18:16",
                id:2,
                message:"hello",
                receiverid:"小王",
                speakerid:"pr"
              },
              {
                date:"2023-05-04 23:18:16",
                id:2,
                message:"hello",
                receiverid:"pr",
                speakerid:"小王"
              },
              {
                date:"2023-05-04 23:18:16",
                id:2,
                message:"hello",
                receiverid:"小王",
                speakerid:"pr"
              },
              {
                date:"2023-05-04 23:18:16",
                id:2,
                message:"hello",
                receiverid:"pr",
                speakerid:"小王"
              },
              {
                date:"2023-05-04 23:18:16",
                id:2,
                message:"hello",
                receiverid:"小王",
                speakerid:"pr"
              },
              {
                date:"2023-05-04 23:18:16",
                id:2,
                message:"hello",
                receiverid:"pr",
                speakerid:"小王"
              },
              {
                date:"2023-05-04 23:18:16",
                id:2,
                message:"hello",
                receiverid:"小王",
                speakerid:"pr"
              },
              {
                date:"2023-05-04 23:18:16",
                id:2,
                message:"hello",
                receiverid:"pr",
                speakerid:"小王"
              },
              {
                date:"2023-05-04 23:18:16",
                id:2,
                message:"hello",
                receiverid:"小王",
                speakerid:"pr"
              },
              ]
            }
        },
        components: {navigationBar},
        mounted:function(){
            this.whichBook()
            this.getMessage()
        },
        methods: {
            whichBook(){
                let that = this;
                let book = JSON.parse(sessionStorage.getItem("book"));
                that.name = book.name;
                that.introduce = book.introduce;
                that.imgSrc = book.src; 
                that.ISBN = book.ISBN;
                that.owner = book.owner;
                that.id = book.id;
                console.log('detail');
            },

            borrow(){
                let that = this;
                let name = that.owner;
                if(name === 'sadmin'){
                    let data={
                        bookid: that.id,
                        bookname: that.name,
                    };
                    let config = {
                        method: 'post',
                        url: `http://localhost:5000/loginUser/list`,
                        headers: {
                                'Content-Type': 'application/json'
                            },
                        data: data
                    };
                    axios(config)
                    .then(function (response) {
                    let res = response.data
                    if (res.code === 200) {
                        alert('借书成功')
                    } else {
                        alert(res.msg)
                    }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                else{
                    let data={
                        bookid: that.id,
                        bookname: that.name,
                    };
                    let config = {
                        method: 'post',
                        url: `http://localhost:5000/loginUser/books/sendRequire`,
                        headers: {
                                'Content-Type': 'application/json'
                            },
                        data: data
                    };
                    axios(config)
                    .then(function (response) {
                    let res = response.data
                    if (res.code === 200) {
                        alert('借书成功')
                    } else {
                        alert(res.msg)
                    }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
               
            },

            openChat(){
                let login = JSON.parse(sessionStorage.getItem("user"));
                if(login){
                    this.chatStatus = true;
                    this.getMessage()
                }
                else{
                    alert('请先登录');
                    this.$router.push('/login')
                }
            },

            getMessage(){
                let that = this;
                let chatPerson = that.owner;
                let config = {
                    method: 'get',
                    url: `http://localhost:5000/loginUser/chat/${chatPerson}`,
                    headers: {
                    },
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                      //赋值给books
                    that.chatRecords = [];
                    for(let i = res.msg.length-1;i >= 0;i--){
                        let chat = {};
                        chat.id = res.msg[i].id;
                        chat.date = res.msg[i].date;
                        chat.message = res.msg[i].msg;
                        chat.receiverid = res.msg[i].receiverid;
                        chat.speakerid = res.msg[i].speakerid; 
                        that.chatRecords.push(chat);
                    }
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            sendMessage(){
                let that = this;
                let message = that.message_new;
                let receiverid = that.owner;
                let data = {
                    receiverid: receiverid,
                    msg: message
                }
                let config = {
                    method: 'post',
                    url: `http://localhost:5000/loginUser/chat`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data:data
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                    that.message_new='';
                    that.getMessage()
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
    })
</script>

  
<style scoped>
@import '../../assets/css/detail.css';

:deep .el-text{
    font-size:17px;
    margin-left: 3%;
}

:deep .el-drawer__container {
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100;
    width: 100px;
}

</style>
