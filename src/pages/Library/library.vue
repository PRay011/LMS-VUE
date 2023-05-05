<template>
    <navigationBar></navigationBar>
    <div class="container">
        <div class="head-image">
        </div>
        <div class="head-content">
            <div class="title">
                图书管理系统
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
        </div>
        <div class="bottom">
            <div class="navigation">
                <el-col :span="20">
                <h5 class="category-title">图书分类</h5>
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="menuSelect"
                >
                    <el-menu-item index="文学">
                        <el-icon><Reading /></el-icon>
                        <span>文学</span>
                    </el-menu-item>
                    <el-menu-item index="经济">
                        <el-icon><Reading /></el-icon>
                        <span>经济</span>
                    </el-menu-item>
                    <el-menu-item index="历史、地理">
                        <el-icon><Reading /></el-icon>
                        <span>历史、地理</span>
                    </el-menu-item>
                    <el-menu-item index="工业技术">
                        <el-icon><Reading /></el-icon>
                        <span>工业技术</span>
                    </el-menu-item>
                    <el-menu-item index="艺术">
                        <el-icon><Reading /></el-icon>
                        <span>艺术</span>
                    </el-menu-item>
                    <el-menu-item index="哲学、宗教">
                        <el-icon><Reading /></el-icon>
                        <span>哲学、宗教</span>
                    </el-menu-item>
                    <el-menu-item index="文化、科学、教育、体育">
                        <el-icon><Reading /></el-icon>
                        <span>文化、科学、教育、体育</span>
                    </el-menu-item>
                    <el-menu-item index="政治、法律">
                        <el-icon><Reading /></el-icon>
                        <span>政治、法律</span>
                    </el-menu-item>
                    <el-menu-item index="语言、文字">
                        <el-icon><Reading /></el-icon>
                        <span>语言、文字</span>
                    </el-menu-item>
                    <el-menu-item index="社会科学总论">
                        <el-icon><Reading /></el-icon>
                        <span>社会科学总论</span>
                    </el-menu-item>
                    <el-menu-item index="医药、卫生">
                        <el-icon><Reading /></el-icon>
                        <span>医药、卫生</span>
                    </el-menu-item>
                    <el-menu-item index="数理科学和化学">
                        <el-icon><Reading /></el-icon>
                        <span>数理科学和化学</span>
                    </el-menu-item>
                    <el-menu-item index="生物科学">
                        <el-icon><Reading /></el-icon>
                        <span>生物科学</span>
                    </el-menu-item>
                    <el-menu-item index="军事">
                        <el-icon><Reading /></el-icon>
                        <span>军事</span>
                    </el-menu-item>
                    <el-menu-item index="天文学、地球科学">
                        <el-icon><Reading /></el-icon>
                        <span>天文学、地球科学</span>
                    </el-menu-item>
                    <el-menu-item index="环境科学、安全科学">
                        <el-icon><Reading /></el-icon>
                        <span>环境科学、安全科学</span>
                    </el-menu-item>
                    <el-menu-item index="马克思主义、列宁主义、毛泽东思想、邓小平理论" style="height:60px; line-height: 20px; ">
                        <el-icon><Reading /></el-icon>
                        <span>马克思主义、列宁主义、<br>
                            毛泽东思想、邓小平理论</span>
                    </el-menu-item>
                    <el-menu-item index="交通运输">
                        <el-icon><Reading /></el-icon>
                        <span>交通运输</span>
                    </el-menu-item>
                    <el-menu-item index="自然科学总论">
                        <el-icon><Reading /></el-icon>
                        <span>自然科学总论</span>
                    </el-menu-item>
                    <el-menu-item index="农业科学">
                        <el-icon><Reading /></el-icon>
                        <span>农业科学</span>
                    </el-menu-item>
                </el-menu>
                </el-col>
            </div>
            <div class="books">
                <div class="book" v-for="book in books" :key="book.id" @click="getBookDetails(book)">
<!--                      onerror="this.src='/1.jpg';this.οnerrοr=null;" -->
                    <img :src="book.src" class="book-image"/><br>
                    <div class="book-name">
                        <el-text class="book-name">{{ book.name }}</el-text>
                    </div>
                    <div class="book-owner">
                        <el-text class="book-owner">提供方: {{ book.owner }}</el-text>
                    </div>
                </div>
                <div class="example-pagination-block">
                    <el-pagination @current-change="handleSizeChange" background layout="prev, pager, next" :total="bookNumber" :page-size="9"/>
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
              bookNumber:100,
              pageNumber:1,
              bookType:'文学',
              books:[
                {
                    id: 1,
                    name: '太阳和蜉蝣',
                    src: "./src/assets/image/slideshow/2.jpg",
                    ISBN:'9787559725554',
                    introduce: '这是第一本书',
                    owner: '小王'
                },
                {
                    id: 2,
                    name: '安徽少年儿童出版社',
                    src: "../../assets/image/slideshow/2.jpg",
                    ISBN:'978-7-5707-0457-6',
                    introduce: '这是第二本书',
                    owner: '图书馆'
                },
                {
                    id: 3,
                    name: '3',
                    src: "../../assets/image/slideshow/3.jpg",
                    ISBN:'',
                    introduce: '这是第三本书',
                    owner: '图书馆'
                },
                {
                    id: 4,
                    name: '4',
                    src: "../../assets/image/slideshow/4.jpg",
                    ISBN:'',
                    introduce: '这是第四本书',
                    owner: '图书馆'
                },
                {
                    id: 5,
                    name: '5',
                    src: "../../assets/image/slideshow/1.jpg",
                    ISBN:'',
                    introduce: '这是第五本书',
                    owner: '图书馆'
                },
                {
                    id: 6,
                    name: '6',
                    src: "../../assets/image/slideshow/2.jpg",
                    ISBN:'',
                    introduce: '这是第六本书',
                    owner: '图书馆'
                },
                {
                    id: 7,
                    name: '7',
                    src: "../../assets/image/slideshow/3.jpg",
                    ISBN:'',
                    introduce: '这是第七本书',
                    owner: '图书馆'
                },
                {
                    id: 8,
                    name: '8',
                    src: "../../assets/image/slideshow/4.jpg",
                    ISBN:'',
                    introduce: '这是第八本书',
                    owner: '图书馆'
                },
                {
                    id: 9,
                    name: '9',
                    src: "../../assets/image/slideshow/4.jpg",
                    ISBN:'',
                    introduce: '这是第九本书',
                    owner: '图书馆'
                },
            ]
          }
      },
      components: {navigationBar},
      mounted:function(){
        // this.ready();
      },
      methods: {
        ready(){
        let that = this;
        let bookType = that.bookType;
        let pageNumber = that.pageNumber;
        let config = {
            method: 'get',
            url: `http://localhost:5000/guest/books/${encodeURIComponent(bookType)}/${pageNumber}`,
            headers: {
            },
        };
        axios(config)
        .then(function (response) {
          let res = response.data
          if (res.code === 200) {
            //赋值给books
            that.books = [];
            let book = {};
            for(let i = 0;i < res.msg.books.length;i++){
              book.image = res.msg.books[i].image;
              book.introduce = res.msg.books[i].introduce;
              book.ISBN = res.msg.books[i].isbncode;
              book.owner = res.msg.books[i].ownerid;
              book.name = res.msg.books[i].name;
              book.id = res.msg.books[i].id;
              that.books.push(book);
            }
            //赋值给bookNumber
            that.bookNumber = res.msg.num;
          } else {
            alert(res.msg)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
            sessionStorage.setItem("way", JSON.stringify('search'));
            this.$router.push('/search')
        },

        //获取页数
        handleSizeChange(val){
            this.pageNumber=val;
            ready();
        },

        menuSelect(index){
            this.bookType = index;
            ready();
        },
            
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