<template>
  <div class="container">
    <div class="block text-center" m="t-4" style="width:100%;height:93%;">
    <!-- 这个地方也需自行修改高度和宽度 -->
    <el-carousel trigger="click" height="800px" style="">
      <el-carousel-item v-for="item in imgList" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item.name }}</h3>
        <!-- <img :src="item.src" style="height:100%;width:100%;" alt="图片丢失了" :title="item.title" /> -->
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="info-container">
    <div class="info">
      <el-text class="info" size="large">图书管理系统</el-text>
    </div>
    <div class="introduction">
      <el-text class="introduction">欢迎进入图书管理系统,点击下方按钮可进行图书扫描,扫描图书后携带的二维码</el-text><br>
      <el-text class="introduction2" style="">可以对该图书进行搜索</el-text>
    </div>
    <button class="scan" @click="scanCode()">Scan</button>
  </div>
  <!-- 引入自定义组件 -->
  <navigationBar style="background-color: rgba(255,255,255,0.6);"></navigationBar>
  </div> 
  <div class="info-addition">
    <el-text class="head" size="large">什么是图书管理系统？</el-text>
    <div style="margin-top: 20px;"></div>
    <el-text class="content">我不到啊我不到啊我不到啊我不到啊我不到啊我不到啊我不到啊我不到啊</el-text>
    <div class="recommend">
      <div class="recommend-title">
        <el-text style="font-size:30px;margin-left: 2%;">推荐书目</el-text>
      </div>
      <div class="recommend-content">
        <div class="book" v-for="book in recommend" :key="book.id" @click="getBookDetails(book)">
          <img :src="book.src" class="book-image"  onerror="this.src='/1.jpg';this.οnerrοr=null;" /><br>
            <div class="book-name">
              <el-text class="book-name">{{ book.name }}</el-text>
            </div>
            <div class="book-owner">
            <el-text class="book-owner">提供方: {{ book.owner }}</el-text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import '../../utils/index.js'
import navigationBar from '../../components/header.vue'
import axios from "axios";

export default defineComponent({
    name: "index",
    
    data(){
        return {
            imgList: [
        {
          name: "book1",
        },
        {
          name: "book2",
        },
        {
          name: "book3",
        },
        {
          name: "book4",
        }
            ],
            recommend:[
              {
                id:1,
                src:"1.jpg",
                introduce:"无",
                ISBN:"1234567890123",
                lenderid:" ",
                name:"test book",
                owner:"sadmin",
                status:1,
                type:"计算机，软件"
              },
              {
                id:2,
                src:"4.jpg",
                introduce:"无",
                ISBN:"1234567890123",
                lenderid:" ",
                name:"test book",
                owner:"sadmin",
                status:1,
                type:"计算机，软件"
              },
              {
                id:3,
                src:"1.jpg",
                introduce:"无",
                ISBN:"1234567890123",
                lenderid:" ",
                name:"test book",
                owner:"sadmin",
                status:1,
                type:"计算机，软件"
              },
              {
                id:1,
                src:"1.jpg",
                introduce:"无",
                ISBN:"1234567890123",
                lenderid:" ",
                name:"test book",
                owner:"sadmin",
                status:1,
                type:"计算机，软件"
              },
              {
                id:2,
                src:"4.jpg",
                introduce:"无",
                ISBN:"1234567890123",
                lenderid:" ",
                name:"test book",
                owner:"sadmin",
                status:1,
                type:"计算机，软件"
              },
              {
                id:3,
                src:"1.jpg",
                introduce:"无",
                ISBN:"1234567890123",
                lenderid:" ",
                name:"test book",
                owner:"sadmin",
                status:1,
                type:"计算机，软件"
              }
            ]
    }
    },
    components: {navigationBar},
    mounted:function(){
        this.ready()
    },
    methods: {
      ready(){
        let that = this;
        //公告放在哪
        //推荐书目
        let config = {
            method: 'get',
            url: 'http://localhost:5000/loginUser/recommendBooks',
            headers: {
            },
          };
        axios(config)
        .then(function (response) {
          let res = response.data
          if (res.code === 200) {
            //赋值给recommend
            that.recommend = [];
            for(let i = 0;i < res.msg.books.length;i++){
              let book = {};
              book.image = res.msg.books[i].image;
              book.introduce = res.msg.books[i].introduce;
              book.ISBN = res.msg.books[i].isbncode;
              book.owner = res.msg.books[i].ownerid;
              book.name = res.msg.books[i].name;
              that.recommend.push(book);
            }
          } else {
            alert(res.msg)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      },

      scanCode() {
        console.log('浏览器信息', navigator.userAgent);
        this.$router.push({
          path: '/scan'
        });
      },

      getBookDetails(book){
        let that = this;
        console.log(book.id)
        sessionStorage.setItem("book", JSON.stringify(book));
        that.$router.push('/detail')
      }
    },
})
</script>

  
<style scoped>
@import '../../assets/css/index.css';
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel{
  --el-carousel-arrow-background: black;
  --el-carousel-arrow-hover-background: black;
}
.el-carousel__item h3 {
  /* color: #475669; */
  color: white;
  opacity: 0.9;
  line-height: 300px;
  font-size: 30px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(3) {
  background-image: url(../../assets/image/slideshow/1.jpg);
  background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
}

.el-carousel__item:nth-child(4) {
  background-image: url(../../assets/image/slideshow/2.jpg);
  background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%
}

.el-carousel__item:nth-child(5) {
  background-image: url(../../assets/image/slideshow/3.jpg);
  background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%
}

.el-carousel__item:nth-child(6) {
  background-image: url(../../assets/image/slideshow/4.jpg);
  background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%
}

</style>