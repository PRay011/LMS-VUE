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
                    <el-button @click="search()">
                        <el-icon>
                            <Search/>
                        </el-icon>
                    </el-button>
                </template>
            </el-input>
        </div>
        <div class="bottom">
            <div class="books" style="margin-left: 25%;">
                <div class="book" v-for="book in books" :key="book.id" @click="getBookDetails(book)">
                    <img :src="book.src" class="book-image" onerror="this.src='/1.jpg';this.οnerrοr=null;"/><br>
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
import {defineComponent} from "vue"
import '../../utils/library.js'
import navigationBar from '../../components/header.vue'
import axios from "axios";

export default defineComponent({
    name: "library",
    data() {
        return {
            searchContent: '',
            bookNumber: 100,
            pageNumber: 1,
            bookName: '',
            books: [
                {
                    id: 1,
                    name: '太阳和蜉蝣',
                    src: "../../assets/image/slideshow/1.jpg",
                    ISBN: '9787559725554',
                    introduce: '这是第一本书',
                    owner: '小王'
                },
                {
                    id: 2,
                    name: '安徽少年儿童出版社',
                    src: "../../assets/image/slideshow/2.jpg",
                    ISBN: '978-7-5707-0457-6',
                    introduce: '这是第二本书',
                    owner: '图书馆'
                },
                {
                    id: 3,
                    name: '3',
                    src: "../../assets/image/slideshow/3.jpg",
                    ISBN: '',
                    introduce: '这是第三本书',
                    owner: '图书馆'
                },
                {
                    id: 4,
                    name: '4',
                    src: "../../assets/image/slideshow/4.jpg",
                    ISBN: '',
                    introduce: '这是第四本书',
                    owner: '图书馆'
                },
                {
                    id: 5,
                    name: '5',
                    src: "../../assets/image/slideshow/1.jpg",
                    ISBN: '',
                    introduce: '这是第五本书',
                    owner: '图书馆'
                },
                {
                    id: 6,
                    name: '6',
                    src: "../../assets/image/slideshow/2.jpg",
                    ISBN: '',
                    introduce: '这是第六本书',
                    owner: '图书馆'
                },
                {
                    id: 7,
                    name: '7',
                    src: "../../assets/image/slideshow/3.jpg",
                    ISBN: '',
                    introduce: '这是第七本书',
                    owner: '图书馆'
                },
                {
                    id: 8,
                    name: '8',
                    src: "../../assets/image/slideshow/4.jpg",
                    ISBN: '',
                    introduce: '这是第八本书',
                    owner: '图书馆'
                },
                {
                    id: 9,
                    name: '9',
                    src: "../../assets/image/slideshow/4.jpg",
                    ISBN: '',
                    introduce: '这是第九本书',
                    owner: '图书馆'
                },
            ]
        }
    },
    components: {navigationBar},
    mounted: function () {
        this.ready();
    },
    methods: {
        ready() {
            let that = this;
            let way = JSON.parse(sessionStorage.getItem("way"));
            let bookName = JSON.parse(sessionStorage.getItem("search"));
            that.bookName = bookName;
            let pageNumber = that.pageNumber;
            if (way == 'search') {
                let config = {
                    method: 'get',
                    url: `http://localhost:5000/guest/book/${encodeURIComponent(bookName)}/${pageNumber}`,
                    headers: {},
                };
                axios(config)
                    .then(function (response) {
                        let res = response.data
                        if (res.code === 200) {
                            //赋值给books
                            that.books = [];
                            for (let i = 0; i < res.msg.books.length; i++) {
                                let book = {};
                                book.src = `http://localhost:5000${res.msg.books[i].image}`;
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
            } else if (way == 'scan') {
                let config = {
                    method: 'get',
                    url: `http://localhost:5000/loginUser/scan/${bookName}/${pageNumber}`,
                    headers: {},
                };
                axios(config)
                    .then(function (response) {
                        let res = response.data
                        if (res.code === 200) {
                            //赋值给books
                            that.books = [];
                            for (let i = 0; i < res.msg.books.length; i++) {
                                let book = {};
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
            }

        },

        getBookDetails(book) {
            let that = this;
            console.log(book.id)
            sessionStorage.setItem("book", JSON.stringify(book));
            that.$router.push('/detail')
        },

        search() {
            console.log("search")
            let bookName = this.searchContent;
            sessionStorage.setItem("search", JSON.stringify(bookName));
            sessionStorage.setItem("way", JSON.stringify('search'));
            this.$router.push('/search')
        },

        //获取页数
        handleSizeChange(val) {
            this.pageNumber = val;
            this.ready();
        },
    },
})
</script>


<style scoped>
@import '../../assets/css/library.css';

:deep .el-input {
    width: 40%;
    height: 13%;
    margin-top: 2%;
    margin-left: 30%;
    font-size: 17px;
    border-radius: 0%;
}

:deep .el-menu {
    margin-top: -17%;
}

:deep .el-menu-item {

    height: 45px;
}

.example-pagination-block {
    height: 15%;
    width: 50%;
    margin-top: 5%;
    margin-left: 41%;
    font-size: 20px;
}

:deep .el-pagination {
    width: 20%;
}


</style>