<template>
    <navigationBar></navigationBar>
    <div class="container">
        <div class="head-image">
        </div>
        <div class="head-content">
            <div class="title" style="margin-left: 45%;">
                搜索详情
            </div>
            <el-input v-model="searchContent" placeholder="请输入搜索内容">
                <template #append>
                    <el-button  @click="search()">
                        <el-icon>
                             <Search />
                        </el-icon>
                   </el-button>
                </template>
            </el-input>
            <el-text style="color:white;margin-left: 10px;font-size:20px">{{bookName}}</el-text>
        </div>
        <div class="bottom">
            <div class="books" style="margin-left: 25%;">
                <div class="book" v-for="book in books" :key="book.id" @click="getBookDetails(book)">
                    <img :src="book.src" class="book-image"  onerror="this.src='/1.jpg';this.οnerrοr=null;" /><br>
                    <div class="book-name">
                        <el-text class="book-name">{{ book.name }}</el-text>
                    </div>
                </div>
                <div class="example-pagination-block">
                    <el-pagination background layout="prev, pager, next" :total="bookNumber" :page-size="9"/>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
  import { defineComponent } from "vue"
  import '../../utils/library.js'
  import navigationBar from '../../components/header.vue'

  export default defineComponent({
      name: "library",
      data(){
          return {
              searchContent:'',
              bookNumber:9,
              bookName:'',
              books:[
                {
                    id: 1,
                    name: '太阳和蜉蝣',
                    src: "../../assets/image/slideshow/1.jpg",
                    ISBN:'9787559725554',
                    introduce: '这是第一本书'
                },
                {
                    id: 2,
                    name: '安徽少年儿童出版社',
                    src: "../../assets/image/slideshow/2.jpg",
                    ISBN:'978-7-5707-0457-6',
                    introduce: '这是第二本书'
                },
                {
                    id: 3,
                    name: '3',
                    src: "../../assets/image/slideshow/3.jpg",
                    ISBN:'',
                    introduce: '这是第三本书'
                },
                {
                    id: 4,
                    name: '4',
                    src: "../../assets/image/slideshow/4.jpg",
                    ISBN:'',
                    introduce: '这是第四本书'
                },
                {
                    id: 5,
                    name: '5',
                    src: "../../assets/image/slideshow/1.jpg",
                    ISBN:'',
                    introduce: '这是第五本书'
                },
                {
                    id: 6,
                    name: '6',
                    src: "../../assets/image/slideshow/2.jpg",
                    ISBN:'',
                    introduce: '这是第六本书'
                },
                {
                    id: 7,
                    name: '7',
                    src: "../../assets/image/slideshow/3.jpg",
                    ISBN:'',
                    introduce: '这是第七本书'
                },
                {
                    id: 8,
                    name: '8',
                    src: "../../assets/image/slideshow/4.jpg",
                    ISBN:'',
                    introduce: '这是第八本书'
                },
                {
                    id: 9,
                    name: '9',
                    src: "../../assets/image/slideshow/4.jpg",
                    ISBN:'',
                    introduce: '这是第九本书'
                },
            ]
          }
      },
      components: {navigationBar},
      mounted:function(){
        this.ready();
      },
      methods: {
        ready(){
            let that = this;
            let bookName = JSON.parse(sessionStorage.getItem("search"));
            this.bookName = bookName;
            console.log(bookName)
        },
        getBookDetails(book){
            let that = this;
            console.log(book.id)
            sessionStorage.setItem("book", JSON.stringify(book));
            that.$router.push('/detail')
        },
        search(){
            console.log("search")
            let bookName = this.searchContent;
            sessionStorage.setItem("search", JSON.stringify(bookName));
            this.$router.push('/search')
        }
      },
  })
</script>

  
<style scoped>
@import '../../assets/css/library.css';

:deep .el-input{
    width:40%;
    height:13%;
    margin-top:2%;
    margin-left: 30%;
    font-size:17px;
    border-radius: 0%;
}

:deep .el-menu{
    margin-top: -17%;
}

:deep .el-menu-item{
    
    height: 45px;
}

.example-pagination-block{
    height: 15%;
    width:50%;
    margin-top:5%;
    margin-left: 41%;
    font-size: 20px;
}

:deep .el-pagination{
    width:20%;
}


</style>