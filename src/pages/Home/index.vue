<template>
    <navigationBar></navigationBar>
    <div class="block text-center" m="t-4" style="width:60%;margin-left: 20%;">
    <span class="demonstration">Switch when indicator is clicked</span>
    <el-carousel trigger="click" height="200px">
      <el-carousel-item v-for="item in imgList" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item.name }}</h3>
        <!-- <img :src="item.src" style="height:100%;width:100%;" alt="图片丢失了" :title="item.title" /> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import '../../utils/index.js'
import navigationBar from '../../components/header.vue'

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
        data:''
    }
    },
    components: {navigationBar},
    methods: {
        
    },
})
</script>

  
<style scoped>
/* @import '../../assets/css/Login.css'; */
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  /* color: #475669; */
  color: white;
  opacity: 0.9;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(3) {
  background-image: url(../../assets/image/slideshow/1.jpg);
  background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%
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