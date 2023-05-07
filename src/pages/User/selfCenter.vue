<template>
    <navigationBar></navigationBar>
    <div class="container">
        <div style="margin-top:1%"></div>
        <el-text class="title">图书管理系统</el-text>
        <div class="top">
            <div style="margin-top:2%"></div>
            <img src="/4.jpg" class="head-image"/>
            <div class="name">{{name}}</div>
            <div class="introduce">
            <el-input
            v-model="introduce"
            maxlength="20"
            placeholder="编辑个性签名"
            type="text"
            input-style="color:white"
            @blur="changeIntroduce()"
            /></div>
            <el-button type="primary" size="large" style="margin-left: 92%;margin-top: -2%;  background-color: rgba(64,158,255,0.6);" @click="changePassword()">修改密码</el-button>
        </div>
        <div class="bottom">
            <el-tabs type="border-card" class="pages">
            <el-tab-pane label="借书记录">
                <el-table :data="filterTable_Borrow" style="width: 100%" height="500">
                <el-table-column label="拥有者" prop="owner" />
                <el-table-column label="类型" prop="category" />
                <el-table-column label="书名" prop="bookName" />
                <el-table-column label="借书日期" prop="startDate" />
                <el-table-column label="还书期限" prop="endDate" />
                <el-table-column
                prop="tag"
                label="Tag"
                width="100"
                filter-placement="bottom-end"
                >
                <template #default="scope">
                    <el-tag
                    :type="scope.row.tag == 0 ?'success': scope.row.tag == 1 ? 'info': scope.row.tag == 2 ?'danger':''"
                    disable-transitions
                    >{{ scope.row.tag }}
                </el-tag>
                </template>
                </el-table-column>
                <el-table-column align="right">
                <template #default="scope">
                    <el-button
                    type="danger"
                    @click="postpone(scope.$index, scope.row)"
                    >延期</el-button
                    >
                </template>
                </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="我的书籍"> 
                <el-table :data="filterTable_Mine" style="width: 100%"  height="500">
                <el-table-column label="图片" prop="owner"  width="150">
                    <template #default="scope">
                        <img  :src="scope.row.image" width="60" height="60" class="head_pic"/>
                    </template>
                </el-table-column>
                <el-table-column label="书名" prop="bookName" width="150" />
                <el-table-column label="ISBN" prop="ISBN" width="150" />
                <el-table-column label="类型" prop="category" />
                <el-table-column label="简介" prop="introduce" width="250" />
                <el-table-column label="借出用户" prop="user" />
                <el-table-column
                prop="tag"
                label="Tag"
                width="100"
                filter-placement="bottom-end"
                >
                <template #default="scope">
                    <el-tag
                    :type="scope.row.tag == 0 ?'success': scope.row.tag == 1 ? 'info': scope.row.tag == 2 ?'danger':''"
                    disable-transitions
                    >{{ scope.row.tag }}
                </el-tag>
                </template>
                </el-table-column>
                <el-table-column align="right">
                    <template #header>
                        <el-button type="primary" @click="addNew()">新增</el-button>
                    </template>
                <template #default="scope">
                    <el-button
                    type="default"
                    @click="bookEdit(scope.$index, scope.row)"
                    >修改</el-button
                    >
                    <el-button
                    type="success"
                    @click="bookComfirm(scope.$index, scope.row)"
                    >确认</el-button
                    >
                    <el-button
                    type="danger"
                    @click="bookDelete(scope.$index, scope.row)"
                    >删除</el-button
                    >
                </template>
                </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="信箱">
                <el-tabs :tab-position="tabPosition" class="mailBox">
                    <el-tab-pane label="收件箱">
                        <el-table :data="filterTable_inBox" style="width: 100%" height="500">
                            <el-table-column label="申请人" prop="user" />
                            <el-table-column label="书名" prop="bookName" />
                            <el-table-column
                            prop="tag"
                            label="Tag"
                            width="100"
                            filter-placement="bottom-end"
                            >
                            <template #default="scope">
                                <el-tag
                                :type="scope.row.tag == 0 ?'info': scope.row.tag == 1 ? 'success': scope.row.tag == -1 ?'danger':''"
                                disable-transitions
                                >{{ scope.row.tag }}
                            </el-tag>
                            </template>
                            </el-table-column>
                            <el-table-column align="right">
                            <template #default="scope">
                                <el-button
                                type="success"
                                @click="bookAgree(scope.$index, scope.row)"
                                >同意</el-button
                                >
                                <el-button
                                type="danger"
                                @click="bookReject(scope.$index, scope.row)"
                                >拒绝</el-button
                                >
                            </template>
                            </el-table-column>
                            </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="申请表">
                        <el-table :data="filterTable_outBox" style="width: 100%" height="500">
                            <el-table-column label="拥有者" prop="owner" />
                            <el-table-column label="书名" prop="name" />
                            <el-table-column
                            prop="tag"
                            label="Tag"
                            width="100"
                            filter-placement="bottom-end"
                            >
                            <template #default="scope">
                                <el-tag
                                :type="scope.row.tag == 0 ?'info': scope.row.tag == 1 ? 'success': scope.row.tag == -1 ?'danger':''"
                                disable-transitions
                                >{{ scope.row.tag }}
                            </el-tag>
                            </template>
                            </el-table-column>
                            <el-table-column align="right">
                            <template #default="scope">
                                <el-button
                                type="default"
                                @click="chat(scope.$index, scope.row)"
                                >交流</el-button
                                >
                            </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs> 
            </el-tab-pane>
        </el-tabs>
        </div>
    </div>
    <!-- 修改书籍数据 -->
    <el-drawer
            ref="drawerRef"
            v-model="left_drawer"
            title="I have a nested form inside!"
            :before-close="handleClose"
            direction="ltr"
            class="demo-drawer"
    >
        <div class="demo-drawer__content">
            <el-form :model="editForm">
                <div class="alert-box-item">
                    <input @change="uploadFile($event)" type="file" class="selectImageButton">
                    <img :src=valueUrl v-if="valueUrl" class="uploadImageBox">
                </div>
                <el-form-item label="书名" :label-width="formLabelWidth">
                    <el-input v-model="editForm.bookName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="ISBN" :label-width="formLabelWidth">
                    <el-input v-model="editForm.ISBN" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="种类" :label-width="formLabelWidth">
                    <el-input v-model="editForm.category" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth">
                    <el-input v-model="editForm.introduce" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <el-button @click="cancelEdit" size="large">取消</el-button>
                <el-button type="primary" :loading="loading" size="large" @click="comfirmEdit">{{
                    loading ? 'Submitting ...' : '确认'
                    }}
                </el-button>
            </div>
        </div>
    </el-drawer>

    <!-- 添加书籍数据 -->
    <el-drawer
            ref="drawerRef"
            v-model="right_drawer"
            title="I have a nested form inside!"
            :before-close="handleClose"
            direction="rtl"
            class="demo-drawer"
    >
        <div class="demo-drawer__content">
            <el-form :model="addForm">
                <!--                <el-form-item label="" :label-width="formLabelWidth">-->
                <!--                    &lt;!&ndash; <el-input v-model="editForm.image" height="300" name="image" type="file"/> &ndash;&gt;-->
                <!--                    -->
                <!--                    <el-button type="primary" style="margin-top: 59%;margin-left: 10%;" @click="uploadAdd()">选择图片</el-button>-->
                <!--                </el-form-item>-->
                <div class="alert-box-item">
                    <input @change="uploadAdd($event)" type="file" class="selectImageButton">
                    <img :src="addForm.image" width="200" height="300" class="head_pic"/>
                </div>
                <el-form-item label="书名" :label-width="formLabelWidth">
                    <el-input v-model="addForm.bookName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="ISBN" :label-width="formLabelWidth">
                    <el-input v-model="addForm.ISBN" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="种类" :label-width="formLabelWidth">
                    <el-input v-model="addForm.category" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth">
                    <el-input v-model="addForm.introduce" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <el-button @click="cancelAdd" size="large">取消</el-button>
                <el-button type="primary" :loading="loading" size="large" @click="comfirmAdd">{{
                    loading ? 'Submitting ...' : '确认'
                    }}
                </el-button>
            </div>
        </div>
    </el-drawer>

    <!-- 修改密码 -->
    <el-drawer
    ref="drawerRef"
    v-model="top_drawer"
    title="修改密码"
    :before-close="handleClose"
    direction="ttb"
    class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <el-form :model="passwords">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input v-model="passwords.password_old" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="passwords.password_new" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer" >
        <el-button @click="cancelPassword" size="large">取消</el-button>
        <el-button type="primary" :loading="loading" size="large" @click="comfirmPassword">{{
          loading ? 'Submitting ...' : '确认'
        }}</el-button>
      </div>
    </div>
    </el-drawer>
</template>
<script>
      import {computed, defineComponent } from "vue"
      import '../../utils/selfCenter.js'
      import navigationBar from '../../components/header.vue'
      import axios from "axios";

      export default defineComponent({
          name: "selfCenter",
          
          data(){
              return {
                    name:'你',
                    introduce:'这是一个自我介绍',
                    password:'',
                    tabPosition : 'left',
                    left_drawer:false,
                    right_drawer:false,
                    top_drawer:false,
                    formLabelWidth:'80px',
                    editForm:{
                            id: '',
                            bookName: '',
                            ISBN: '',
                            category: '',
                            introduce: '',
                            image: '',
                    },
                    addForm:{
                            bookName: '',
                            ISBN: '',
                            category: '',
                            introduce: '',
                            image: '',
                    },
                    passwords:{
                        password_old:'',
                        password_new:'',
                    },
                    borrowRecords: [
                        {
                            id:1,
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '科幻',
                            bookName: '人工智障',
                            owner: 'Tom',
                            tag: 0,
                        },
                        {
                            id:2,
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '母猪的产后护理',
                            bookName: '从小学习C++',
                            owner: 'John',
                            tag: 1,
                        },
                        {
                            id:3,
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '乡村爱情',
                            bookName: '浪漫地球',
                            owner: 'Morgan',
                            tag: 2,
                        },
                        {
                            id:4,
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '悬疑',
                            bookName: '憨豆先生',
                            owner: 'Jessy',
                            tag: 0,
                        },
                        {
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '科幻',
                            bookName: '人工智障',
                            owner: 'Tom',
                            tag: 0,
                        },
                        {
                            id:5,
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '母猪的产后护理',
                            bookName: '从小学习C++',
                            owner: 'John',
                            tag: 1,
                        },
                        {
                            id:6,
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '乡村爱情',
                            bookName: '浪漫地球',
                            owner: 'Morgan',
                            tag: 2,
                        },
                        {
                            id:7,
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '悬疑',
                            bookName: '憨豆先生',
                            owner: 'Jessy',
                            tag: 0,
                        },
                        {
                            id:8,
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '科幻',
                            bookName: '人工智障',
                            owner: 'Tom',
                            tag: 0,
                        },
                        {
                            id:9,
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '母猪的产后护理',
                            bookName: '从小学习C++',
                            owner: 'John',
                            tag: 1,
                        },
                        {
                            id:10,
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '乡村爱情',
                            bookName: '浪漫地球',
                            owner: 'Morgan',
                            tag: 2,
                        },
                        {
                            id:11,
                            startDate: '2023-05-03',
                            endDate: '2023-05-04',
                            category: '悬疑',
                            bookName: '憨豆先生',
                            owner: 'Jessy',
                            tag: 0,
                        },
                        ],
                    myBooks: [
                        {
                            id:1,
                            image:'/1.jpg',
                            ISBN: '2023120503',
                            category: '科幻',
                            bookName: '人工智障',
                            introduce: 'No. 189, Grove St, Los Angeles',
                            user:'asaw',
                            tag: 0,
                        },
                        {
                            id:2,
                            image:'/1.jpg',
                            ISBN: '20231206756',
                            category: '母猪的产后护理',
                            bookName: '从小学习C++',
                            introduce: 'No. 189, Grove St, Los Angeles',
                            user:'tyfhw',
                            tag: 1,
                        },
                        {
                            id:3,
                            image:'/1.jpg',
                            ISBN: '1243124124',
                            category: '乡村爱情',
                            bookName: '浪漫地球',
                            introduce: 'No. 189, Grove St, Los Angeles',
                            user:'oyjo',
                            tag: 2,
                        },
                        {
                            id:4,
                            image:'1.jpg',
                            ISBN: '2023112312',
                            category: '悬疑',
                            bookName: '憨豆先生',
                            introduce: 'No. 189, Grove St, Los Angeles',
                            user:'lkim',
                            tag: 0,
                        },
                        {
                            id:5,
                            image:'/1.jpg',
                            ISBN: '2023345353',
                            category: '乡村爱情',
                            bookName: '浪漫地球',
                            introduce: 'No. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los Angeles',
                            user:'kljl',
                            tag: 2,
                        },
                        {
                            id:6,
                            image:'1.jpg',
                            ISBN: '2027389246',
                            category: '悬疑',
                            bookName: '憨豆先生',
                            introduce: 'No. 189, Grove St, Los Angeles',
                            user: 'sdf',
                            tag: 0,
                        },
                        ],
                    inBox: [
                        {
                            id: 1,
                            user: '2023120503',
                            bookName: '人工智障',
                            tag: 0,
                        },
                        {
                            id: 2,
                            user: '20231206756',
                            bookName: '从小学习C++',
                            tag: 1,
                        },
                        {
                            id: 3,
                            user: '1243124124',
                            bookName: '浪漫地球',
                            tag: -1,
                        },
                        {
                            id: 4,
                            user: '2023112312',
                            bookName: '憨豆先生',
                            tag: 0,
                        },
                        {
                            id: 5,
                            user: '2023345353',
                            bookName: '浪漫地球',
                            tag: -1,
                        },
                        {
                            id: 6,
                            user: '2027389246',
                            bookName: '憨豆先生',
                            tag: 0,
                        },
                        ],
                    outBox: [
                        {
                            id:1,
                            ISBN:'12131231342',
                            introduce: '介绍',
                            src:'/1.jpg',
                            owner: '2023120503',
                            name: '人工智障',
                            tag: 0,
                        },
                        {
                            id:2,
                            ISBN:'1213453451342',
                            introduce: '介绍',
                            src:'/4.jpg',
                            owner: '20231206756',
                            name: '从小学习C++',
                            tag: 1,
                        },
                        {
                            id:3,
                            ISBN:'18766531342',
                            introduce: '介绍',
                            src:'/1.jpg',
                            owner: '1243124124',
                            name: '浪漫地球',
                            tag: -1,
                        },
                        {
                            id:4,
                            ISBN:'976768542',
                            introduce: '介绍',
                            src:'/1.jpg',
                            owner: '2023112312',
                            name: '憨豆先生',
                            tag: 0,
                        },
                        {
                            id:5,
                            ISBN:'54567843467',
                            introduce: '介绍',
                            src:'/4.jpg',
                            owner: '2023345353',
                            name: '浪漫地球',
                            tag: -1,
                        },
                        {
                            id:6,
                            ISBN:'45889643576',
                            introduce: '介绍',
                            src:'/1.jpg',
                            owner: '2027389246',
                            name: '憨豆先生',
                            tag: 0,
                        },
                        ],
                    search:'',
                    filterTable_Borrow: '',
                    filterTable_Mine: '',
                    filterTable_inBox: '',   
                    filterTable_outBox: '',
                    imageSavePath: ''
              }
          },
          components: {navigationBar},
          mounted:function(){
            this.ready();
         },
          methods: {
            ready(){
                let that = this;
                let login = JSON.parse(sessionStorage.getItem("user"));
                console.log(login)
                if(login!=0||login!=1||login!=2||login!=3){
                      //个人信息
                    let config = {
                        method: 'get',
                        url: `http://localhost:5000/loginUser/account`,
                        headers: {
                        },
                    };
                    axios(config)
                    .then(function (response) {
                    let res = response.data
                    if (res.code === 200) {
                        that.name = res.msg.id;
                        that.introduce = res.msg.introduce;
                        that.password = res.msg.password;
                    } else {
                        alert(res.msg)
                    }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    
                    //借书记录表单
                    this.getBorrowBooks();
                    //我的书籍
                    this.getMyBooks();
                    //信箱-收件箱
                    this.getInBox();
                    //信箱-申请表
                    this.getOutBox();
                }
                else{
                    alert('请先登录');
                    that.$router.push('/login')
                }
                
              
               
            },

            //修改个人信息
            changePassword(){
                this.top_drawer=true;
            },

            changeIntroduce(){
                let that = this;
                let data={
                    introduce: that.introduce
                };

                let config = {
                    method: 'put',
                    url: `http://localhost:5000/loginUser/account`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data:data
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                    alert('修改成功');
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            cancelPassword(){
                this.top_drawer=false;
            },

            comfirmPassword(){
                let that = this;
                if(that.passwords.password_new===''||that.passwords.password_old===''){
                    alert('输入不能为空');
                }
                else{
                    let config = {
                    method: 'put',
                    url: `http://localhost:5000/loginUser/password`,
                    headers: {
                    },
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                   alert('修改成功')
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
                }
            },

            //借书记录
            getBorrowBooks(){
                let that = this;
                let config = {
                    method: 'get',
                    url: `http://localhost:5000/loginUser/list`,
                    headers: {
                    },
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                    //赋值给books
                    that.borrowRecords = [];
                    for(let i = 0;i < res.msg.length;i++){
                        let book = {};
                        book.id = res.msg[i].id;
                        book.startDate = res.msg[i].date;
                        book.endDate = res.msg[i].return_deadline;
                        book.category = res.msg[i].type;
                        book.bookName = res.msg[i].bookname;
                        book.owner = res.msg[i].ownerid;
                        book.tag = res.msg[i].status;
                        that.borrowRecords.push(book);
                    }
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
                if(that.borrowRecords){
                    that.filterTable_Borrow = computed(() =>
                    that.borrowRecords.filter(
                    (data) =>
                    !that.search.value ||
                    data.name.toLowerCase().includes(that.search.value.toLowerCase())
                )
                )
                };
            },

            //延期
            postpone ( index, row) {
                console.log('延期');
                let bookID = row.id;
                let config = {
                    method: 'put',
                    url: `http://localhost:5000/loginUser/list/${bookID}`,
                    headers: {
                    },
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                    alert('成功延期一个月');
                    that.borrowBooks()
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            //我的书籍按钮
            getMyBooks(){
                let that = this;
                let config = {
                    method: 'get',
                    url: `http://localhost:5000/loginUser/books/mine`,
                    headers: {
                    },
                };
                axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                    //赋值给books
                    that.myBooks = [];
                    for(let i = 0;i < res.msg.length;i++){
                        let book = {};
                        book.id = res.msg[i].id;
                        book.image = `http://localhost:5000${res.msg[i].image}`;
                        book.ISBN = res.msg[i].isbncode;
                        book.category = res.msg[i].type;
                        book.bookName = res.msg[i].name;
                        book.introduce = res.msg[i].introduce;
                        book.user = res.msg[i].lenderid;
                        book.tag = res.msg[i].status;
                        that.myBooks.push(book);
                    }
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
                if(that.myBooks){
                    that.filterTable_Mine = computed(() =>
                    that.myBooks.filter(
                    (data) =>
                    !that.search.value ||
                    data.name.toLowerCase().includes(that.search.value.toLowerCase())
                )
                )
                };
            },

            //修改
            bookEdit ( index, row) {
                this.editForm.id = row.id;
                this.editForm.image= row.image;
                this.editForm.ISBN = row.ISBN;
                this.editForm.category = row.category;
                this.editForm.bookName = row.bookName;
                this.editForm.introduce = row.introduce;
                this.left_drawer = true
            },

            comfirmEdit() {
                let that = this;
                if (that.editForm.bookName == '' || that.editForm.ISBN == '' || that.editForm.category == '' || that.editForm.introduce == '' || that.editForm.image == '') {
                    alert('内容不能为空')
                } else {
                    let data = {
                        bookId: that.editForm.id,
                        name: that.editForm.bookName,
                        isbncode: that.editForm.ISBN,
                        type: that.editForm.category,
                        introduce: that.editForm.introduce,
                        imagePath: that.imageSavePath
                    };
                    let config = {
                        method: 'put',
                        url: `http://localhost:5000/loginUser/book`,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data:data
                    };
                    axios(config)
                        .then(function (response) {
                            let res = response.data
                            if (res.code === 200) {
                                alert('修改成功');
                                that.getMyBooks()
                            } else {
                                alert(res.msg)
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    this.left_drawer = false
                }
            },

        cancelEdit() {
            this.left_drawer = false
        },
        // 上传图片
        uploadFile(el) {
            if (!el.target.files[0].size) return; // 如果文件大小为0，则返回
            if (el.target.files[0].type.indexOf('image') === -1) { //如果不是图片格式
                console.log('请选择图片文件');
            } else {
                const that = this;
                const reader = new FileReader(); // 创建读取文件对象
                reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
                reader.onload = function () {  // 文件读取完成后
                    // 读取完成后，将结果赋值给img的src
                    that.editForm.image = this.result;
                };
                const formData = new FormData();  // 创建一个formdata对象
                formData.append('image', el.target.files[0]);
                let config = {
                    method: 'post',
                    url: 'http://localhost:5000/loginUser/uploadImage',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    data: formData
                };
                axios(config).then(function (response) {
                    let res = response.data
                    if (res.code === 200) {
                        that.imageSavePath = res.imagePath
                        console.log(`保存路径${that.imageSavePath}`)
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },

        //添加新书
        addNew() {
            let that = this;
            that.right_drawer = true;
        },

        comfirmAdd() {
            let that = this;
            console.log('asdd')
            if (that.addForm.bookName == '' || that.addForm.ISBN == '' || that.addForm.category == '' || that.addForm.introduce == '' || that.addForm.image == '') {
                alert('内容不能为空')
            } else {
                let data = {
                    name: that.addForm.bookName,
                    isbncode: that.addForm.ISBN,
                    type: that.addForm.category,
                    introduce: that.addForm.introduce,
                    imagePath: that.imageSavePath
                };
                console.log(data)
                let config = {
                    method: 'post',
                    url: `http://localhost:5000/loginUser/book`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                axios(config)
                    .then(function (response) {
                        let res = response.data
                        if (res.code === 200) {
                            alert('添加成功');
                            that.getMyBooks();
                        } else {
                            alert(res.msg)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.right_drawer = false
            }

        },

        cancelAdd() {
            this.right_drawer = false
        },

        uploadAdd(el) {
            if (!el.target.files[0].size) return; // 如果文件大小为0，则返回
            if (el.target.files[0].type.indexOf('image') === -1) { //如果不是图片格式
                console.log('请选择图片文件');
            } else {
                const that = this;
                const reader = new FileReader(); // 创建读取文件对象
                reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
                reader.onload = function () {  // 文件读取完成后
                    // 读取完成后，将结果赋值给img的src
                    that.addForm.image = this.result;
                };
                const formData = new FormData();  // 创建一个formdata对象
                formData.append('image', el.target.files[0]);
                let config = {
                    method: 'post',
                    url: 'http://localhost:5000/loginUser/uploadImage',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    data: formData
                };
                axios(config).then(function (response) {
                    let res = response.data
                    if (res.code === 200) {
                        that.imageSavePath = res.imagePath
                        console.log(`保存路径${that.imageSavePath}`)
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },

        //确认还书
        bookComfirm(index, row) {
            let that = this;
            let bookId = row.id;
            let config = {
                method: 'put',
                url: `http://localhost:5000/loginUser/books/returnBookToMe/${bookId}`,
                headers: {},
            };
            axios(config)
                .then(function (response) {
                    let res = response.data
                    if (res.code === 200) {
                        alert('借出成功');
                        that.getMyBooks()
                    } else {
                        alert(res.msg)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //删除上传书籍
        bookDelete(index, row) {
            let that = this;
            let bookId = row.id;
            let config = {
                method: 'delete',
                url: `http://localhost:5000/loginUser/book/${bookId}`,
                headers: {},
            };
            axios(config)
                .then(function (response) {
                    let res = response.data
                    if (res.code === 200) {
                        alert('删除成功');
                        that.getMyBooks()
                    } else {
                        alert(res.msg)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        //这是收件箱
        getInBox() {
            let that = this;
            let config = {
                method: 'get',
                url: `http://localhost:5000/loginUser/books/requireMe`,
                headers: {},
            };
            axios(config)
                .then(function (response) {
                    let res = response.data
                    if (res.code === 200) {
                        //赋值给books
                        that.inBox = [];
                        for (let i = 0; i < res.msg.length; i++) {
                            let book = {};
                            book.id = res.msg[i].bookid;
                            book.bookName = res.msg[i].bookname;
                            book.user = res.msg[i].lenderid;
                            book.tag = res.msg[i].status;
                            that.inBox.push(book);
                        }
                    } else {
                        alert(res.msg)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                if(that.inBox){
                        that.filterTable_inBox = computed(() =>
                        that.inBox.filter(
                        (data) =>
                        !that.search.value ||
                        data.name.toLowerCase().includes(that.search.value.toLowerCase())
                    )
                )
            }
            ;
        },
        //拒绝借出
        bookReject(index, row) {
            let that = this;
            let requireId = row.user;
            let bookId = row.id;
            let config = {
                method: 'get',
                url: `http://localhost:5000/loginUser/books/checkRequire/${requireId}/${bookId}/${-1}`,
                headers: {},
            };
            axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                    alert('拒绝借出');
                    that.getInBox()
                } 
                else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
            console.log(index, row)
        },
        //同意借出
        bookAgree(index, row) {
            let that = this;
            let requireId = row.user;
            let bookId = row.id;
            let config = {
                method: 'put',
                url: `http://localhost:5000/loginUser/books/checkRequire/${requireId}/${bookId}/${1}`,
                headers: {},
            };
            axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                    alert('借出成功');
                    getInBox()
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
            console.log(index, row)
        },
        //这是申请表
        getOutBox() {
            let that = this;
            let config = {
                method: 'get',
                url: `http://localhost:5000/loginUser/books/requireMe`,
                headers: {},
            };
            axios(config)
                .then(function (response) {
                let res = response.data
                if (res.code === 200) {
                      //赋值给books
                    that.outBox = [];
                    for(let i = 0;i < res.msg.length;i++){
                        let book = {};
                        book.id = res.msg[i].id;
                        book.name = res.msg[i].name;
                        book.owner = res.msg[i].ownerid;
                        book.tag = res.msg[i].status;
                        book.ISNB = res.msg[i].bookDetail.isbncode; 
                        book.introduce = res.msg[i].bookDetail.introduce; 
                        book.src = res.msg[i].bookDetail.image; 
                        that.outBox.push(book);
                    }
                } else {
                    alert(res.msg)
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
                if(that.outBox){
                        that.filterTable_outBox = computed(() =>
                        that.outBox.filter(
                        (data) =>
                        !that.search.value ||
                        data.name.toLowerCase().includes(that.search.value.toLowerCase())
                )
                )
                }
            },

            chat ( index, row) {
                sessionStorage.setItem("book", JSON.stringify(row));
                this.$router.push('/detail')
                console.log(index, row)
            },
          },
      })
  </script>

  
<style scoped>
@import '../../assets/css/selfCenter.css';

.alert-box-item {
    margin-bottom: 100px;
}

.selectImageButton {
    width: 500px
}

.uploadImageBox {
    width: 250px
}

:deep .el-input__inner {
    background-color: transparent !important;
  /* border: 1px solid #1296db;  */
    border: 1px solid transparent; 
    color:black
}

:deep .el-input__inner::placeholder {
        color: #ffffff;
    }

:deep .el-input__wrapper {
    background-color: transparent !important;
  /* border: 1px solid #1296db;  */
  border: 1px solid transparent; 
    color:white
}
:deep .el-input{
    background-color: transparent !important;
    border: 1px solid transparent; 
    color:white
}


:deep .el-input__inner:hover{
    background-color: rgba(255,255,255,1);
}

:deep .search{
    color:black
}

.demo-drawer__footer{
    margin-left: 35%;
}

</style>