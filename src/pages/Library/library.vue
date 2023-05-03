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
                    <el-button  >
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
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                >
                    <el-menu-item index="1">
                        <el-icon><Reading /></el-icon>
                        <span>文学</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon><Reading /></el-icon>
                        <span>经济</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon><Reading /></el-icon>
                        <span>历史、地理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon><Reading /></el-icon>
                        <span>工业技术</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <el-icon><Reading /></el-icon>
                        <span>艺术</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <el-icon><Reading /></el-icon>
                        <span>哲学、宗教</span>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <el-icon><Reading /></el-icon>
                        <span>文化、科学、教育、体育</span>
                    </el-menu-item>
                    <el-menu-item index="8">
                        <el-icon><Reading /></el-icon>
                        <span>政治、法律</span>
                    </el-menu-item>
                    <el-menu-item index="9">
                        <el-icon><Reading /></el-icon>
                        <span>语言、文字</span>
                    </el-menu-item>
                    <el-menu-item index="10">
                        <el-icon><Reading /></el-icon>
                        <span>社会科学总论</span>
                    </el-menu-item>
                    <el-menu-item index="11">
                        <el-icon><Reading /></el-icon>
                        <span>医药、卫生</span>
                    </el-menu-item>
                    <el-menu-item index="12">
                        <el-icon><Reading /></el-icon>
                        <span>数理科学和化学</span>
                    </el-menu-item>
                    <el-menu-item index="13">
                        <el-icon><Reading /></el-icon>
                        <span>生物科学</span>
                    </el-menu-item>
                    <el-menu-item index="14">
                        <el-icon><Reading /></el-icon>
                        <span>军事</span>
                    </el-menu-item>
                    <el-menu-item index="15">
                        <el-icon><Reading /></el-icon>
                        <span>天文学、地球科学</span>
                    </el-menu-item>
                    <el-menu-item index="16">
                        <el-icon><Reading /></el-icon>
                        <span>环境科学、安全科学</span>
                    </el-menu-item>
                    <el-menu-item index="17" style="height:60px; line-height: 20px; ">
                        <el-icon><Reading /></el-icon>
                        <span>马克思主义、列宁主义、<br>
                            毛泽东思想、邓小平理论</span>
                    </el-menu-item>
                    <el-menu-item index="18">
                        <el-icon><Reading /></el-icon>
                        <span>交通运输</span>
                    </el-menu-item>
                    <el-menu-item index="19">
                        <el-icon><Reading /></el-icon>
                        <span>自然科学总论</span>
                    </el-menu-item>
                    <el-menu-item index="20">
                        <el-icon><Reading /></el-icon>
                        <span>农业科学</span>
                    </el-menu-item>
                </el-menu>
                </el-col>
            </div>
            <div class="books">
                <div class="book" v-for="book in books" :key="book.id">
                    <img :src="book.src" class="book-img"  onerror="this.src='../../../public/1.jpg';this.οnerrοr=null;" /><br>
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
              books:[
                {
                    id: 1,
                    name: '1',
                    src: "../../assets/image/slideshow/1.jpg",
                    introduce: '这是第一本书'
                },
                {
                    id: 2,
                    name: '2',
                    src: "../../assets/image/slideshow/2.jpg",
                    introduce: '这是第二本书'
                },
                {
                    id: 3,
                    name: '3',
                    src: "../../assets/image/slideshow/3.jpg",
                    introduce: '这是第三本书'
                },
                {
                    id: 4,
                    name: '4',
                    src: "../../assets/image/slideshow/4.jpg",
                    introduce: '这是第四本书'
                },
                {
                    id: 1,
                    name: '1',
                    src: "../../assets/image/slideshow/1.jpg",
                    introduce: '这是第一本书'
                },
                {
                    id: 2,
                    name: '2',
                    src: "../../assets/image/slideshow/2.jpg",
                    introduce: '这是第二本书'
                },
                {
                    id: 3,
                    name: '3',
                    src: "../../assets/image/slideshow/3.jpg",
                    introduce: '这是第三本书'
                },
                {
                    id: 4,
                    name: '4',
                    src: "../../assets/image/slideshow/4.jpg",
                    introduce: '这是第四本书'
                },
                {
                    id: 4,
                    name: '4',
                    src: "../../assets/image/slideshow/4.jpg",
                    introduce: '这是第四本书'
                },
            ]
          }
      },
      components: {navigationBar},
      methods: {
          
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