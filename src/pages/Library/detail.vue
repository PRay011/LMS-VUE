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
                <div class="introduce">
                    <el-text>简介:</el-text>
                    <el-text type="primary">  {{ intriduce }}</el-text>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from "vue"
    import '../../utils/detail.js'
    import navigationBar from '../../components/header.vue'
      
    export default defineComponent({
        name: "detail",
        data(){
            return {
              name:'',
              intriduce:'',
              imgSrc:'',
              ISBN:'',
            }
        },
        components: {navigationBar},
        mounted:function(){
            this.whichBook()
        },
        methods: {
            whichBook(){
                let that = this;
                let book = JSON.parse(sessionStorage.getItem("book"));
                that.name = book.name;
                that.intriduce = book.introduce;
                that.imgSrc = book.src; 
                that.ISBN = book.ISBN;
                console.log('detail');
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

</style>
