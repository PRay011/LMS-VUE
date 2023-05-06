<template>
    <navigationBar></navigationBar>
    <el-tabs :tab-position="tabPosition" type="border-card" class="pages">
            <el-tab-pane :tab-position="tabPosition" label="用户管理">
                <el-table :data="filterTable_User" style="width: 100%" height="810">
                <el-table-column label="id" prop="id" />
                <el-table-column label="类型" prop="type" />
                <el-table-column label="介绍" prop="introduce" />
                <el-table-column label="密码" prop="password" />
                <el-table-column align="center">
                <template #default="scope">
                    <el-button
                    type="danger"
                    @click="changePassword(scope.$index, scope.row)"
                    >重置密码</el-button
                    >
                </template>
                </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="书籍管理"> 
                <el-table :data="filterTable_Book" style="width: 100%" height="810">
                <el-table-column label="id" prop="id" />
                <el-table-column label="书名" prop="bookname" />
                <el-table-column label="类型" prop="type" />
                <el-table-column label="借书者" prop="lenderid" />
                <el-table-column label="借出时间" prop="date" />
                <el-table-column label="归还时间" prop="return_deadline" />
                <el-table-column
                            prop="status"
                            label="状态"
                            width="100"
                            filter-placement="bottom-end"
                            >
                            <template #default="scope">
                                <el-tag
                                :type="scope.row.status == 0 ?'info': scope.row.status == 1 ? 'success': scope.row.status == 2 ?'danger':''"
                                disable-transitions
                                >{{ scope.row.status }}
                            </el-tag>
                            </template>
                </el-table-column>
                <el-table-column align="center">
                <template #default="scope">
                    <el-button
                    type="danger"
                    @click="returnBook(scope.$index, scope.row)"
                    >删除</el-button
                    >
                </template>
                </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="公告管理">
                <el-table :data="filterTable_Notice" style="width: 40%;" height="810">
                <el-table-column label="id" prop="id" />
                <el-table-column label="书名" prop="content" />
               
                <el-table-column align="center">
                <template #default="scope">
                    <el-button
                    type="danger"
                    @click="deleteNotice(scope.$index, scope.row)"
                    >删除</el-button
                    >
                </template>
                </el-table-column>
                </el-table>
                <el-input
                    v-model="noticeContent"
                    maxlength="100"
                    placeholder="请输入"
                    show-word-limit
                    type="textarea"
                    style="width:40%; margin-left:50%;  float: left;margin-top: -45%;"
                />
                <el-button type="primary" size="large" style="width: 100px; margin-left:84.4%;margin-top: -40%;" @click="sendNotice()">发送</el-button>
            </el-tab-pane>
    </el-tabs>

</template>

<script>
      import {computed, defineComponent } from "vue"
      import navigationBar from '../../components/header.vue'
      import axios from "axios";
    export default defineComponent({
    name: "userManagement",

    data() {
        return {
            tabPosition:'left',
            filterTable_User:'',
            filterTable_Book:'',
            filterTable_Notice:'',
            search:'',
            noticeContent:'',
            User:[
                {
                    id: 1,
                    type: '1',
                    password: '1111111',
                    introduce: '1',
                },
                {
                    id: 2,
                    type: '2',
                    password: '22222',
                    introduce: '2',
                },
                {
                    id: 3,
                    type: '3',
                    password: '33333333',
                    introduce: '3',
                },
                {
                    id: 4,
                    type: '44',
                    password: '44444444',
                    introduce: '4',
                }
            ],
            Book:[
                {
                    id:'1',
                    bookname:'1',
                    type:'1',
                    lenderid:'1',
                    date:'1',
                    return_deadline:'1-1',
                    status:'1'
                },
                {
                    id:'2',
                    bookname:'2',
                    type:'2',
                    lenderid:'2',
                    date:'2',
                    return_deadline:'2-1',
                    status:'2'
                },
                {
                    id:'3',
                    bookname:'3',
                    type:'3',
                    lenderid:'3',
                    date:'3',
                    return_deadline:'3-1',
                    status:'0'
                },
                {
                    id:'4',
                    bookname:'4',
                    type:'4',
                    lenderid:'4',
                    date:'4',
                    return_deadline:'4-1',
                    status:'2'
                },
            ],
            Notice:[
                {
                    id:1,
                    content:'qwqewfwefihgserfhsdvfyutw'
                },
                {
                    id:2,
                    content:'sedbhfvwsyuvbuihgserfhsdvfyutw'
                },
                {
                    id:3,
                    content:'ifglhguiergvbiyurebgblrjkgbhj'
                },
                {
                    id:4,
                    content:'lhcyuwefvbencou9iswgcvkbwe'
                }
            ]
        }
    },
    components: {navigationBar},
    mounted: function () {
        this.ready()
    },
    methods: {
        ready(){
            this.getUser();
            this.getBook();
            this.getNotice();
        },

        //用户信息
        getUser(){
                let that = this;
                let config = {
                    method: 'get',
                    url: `http://localhost:5000/admin/accountList`,
                    headers: {
                    },
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                    //赋值给books
                    that.User = [];
                    for(let i = 0;i < res.msg.length;i++){
                        let user = {};
                        user.id = res.msg[i].id;
                        user.introduce = res.msg[i].introduce;
                        user.password = res.msg[i].password;
                        user.type = res.msg[i].type;
                        that.User.push(user);
                    }
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
                if(that.User){
                    that.filterTable_User = computed(() =>
                    that.User.filter(
                    (data) =>
                    !that.search.value ||
                    data.name.toLowerCase().includes(that.search.value.toLowerCase())
                )
                )
                };
        },
        //修改用户密码
        changePassword(index, row){
             let that = this;
             let config = {
                    method: 'put',
                    url: `http://localhost:5000/admin/accountList/${row.id}`,
                    headers: {
                    },
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                  that.getUser()
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        //书籍信息
         getBook(){
                let that = this;
                let config = {
                    method: 'get',
                    url: `http://localhost:5000/admin/lists`,
                    headers: {
                    },
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                    //赋值给books
                    that.Book = [];
                    for(let i = 0;i < res.msg.length;i++){
                        let book = {};
                        book.id = res.msg[i].id;
                        book.bookname = res.msg[i].bookname;
                        book.type = res.msg[i].type;
                        book.lenderid = res.msg[i].lenderid;
                        book.date = res.msg[i].date;
                        book.return_deadline = res.msg[i].return_deadline;
                        book.status = res.msg[i].status;
                        that.Book.push(book);
                    }
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
                if(that.Book){
                    that.filterTable_Book = computed(() =>
                    that.Book.filter(
                    (data) =>
                    !that.search.value ||
                    data.name.toLowerCase().includes(that.search.value.toLowerCase())
                )
                )
                };
        },
        //还书
        returnBook(index, row){
             let that = this;
             console.log(row.id)
             let config = {
                    method: 'delete',
                    url: `http://localhost:5000/admin/list/${row.id}`,
                    headers: {
                    },
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                  that.getBook()
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

         //书籍信息
        getNotice(){
                let that = this;
                let config = {
                    method: 'get',
                    url: `http://localhost:5000/guest/notice`,
                    headers: {
                    },
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                    console.log(res)
                    //赋值给books
                    that.Notice = [];
                    for(let i = 0;i < res.msg.length;i++){
                        let notice = {};
                        notice.id = res.msg[i].id;
                        notice.content = res.msg[i].content;
                        that.Notice.push(notice);
                    }
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
                if(that.Notice){
                    that.filterTable_Notice = computed(() =>
                    that.Notice.filter(
                    (data) =>
                    !that.search.value ||
                    data.name.toLowerCase().includes(that.search.value.toLowerCase())
                )
                )
                };
        },
        //删公告
        deleteNotice(index, row){
             let that = this;
             console.log(row.id)
             let config = {
                    method: 'delete',
                    url: `http://localhost:5000/admin/notice/${row.id}`,
                    headers: {
                    },
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                  that.getNotice()
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //发公告
        sendNotice(){
            let that = this;
            let data ={
                content : that.noticeContent
            }
            let config = {
                    method: 'post',
                    url: `http://localhost:5000/admin/notice`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                  that.getNotice()
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
@import '../../assets/css/management.css';


</style>