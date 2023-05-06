<template>
    <navigationBar></navigationBar>
    <div class="container">
        <div style="margin-top:1%"></div>
        <el-text class="title">图书管理系统</el-text>
        <div class="top">
            <div style="margin-top:2%"></div>
            <img src="/4.jpg" class="head-image"/>
            <div class="name">{{ name }}</div>
            <div class="introduce">
                <el-input
                        v-model="introduce"
                        maxlength="20"
                        placeholder="编辑个性签名"
                        type="text"
                        input-style="color:white"
                />
            </div>
        </div>
        <div class="bottom">
            <el-tabs type="border-card" class="pages">
                <el-tab-pane label="借书记录">
                    <el-table :data="filterTable_Borrow" style="width: 100%" height="500">
                        <el-table-column label="拥有者" prop="owner"/>
                        <el-table-column label="类型" prop="category"/>
                        <el-table-column label="书名" prop="bookName"/>
                        <el-table-column label="借书日期" prop="startDate"/>
                        <el-table-column label="还书期限" prop="endDate"/>
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
                                >延期
                                </el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="我的书籍">
                    <el-table :data="filterTable_Mine" style="width: 100%" height="500">
                        <el-table-column label="图片" prop="owner" width="150">
                            <template #default="scope">
                                <img :src="scope.row.image" width="60" height="60" class="head_pic"/>
                            </template>
                        </el-table-column>
                        <el-table-column label="书名" prop="bookName" width="150"/>
                        <el-table-column label="ISBN" prop="ISBN" width="150"/>
                        <el-table-column label="类型" prop="category"/>
                        <el-table-column label="简介" prop="introduce" width="250"/>
                        <el-table-column label="借出用户" prop="user"/>
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
                                >修改
                                </el-button
                                >
                                <el-button
                                        type="success"
                                        @click="bookComfirm(scope.$index, scope.row)"
                                >确认
                                </el-button
                                >
                                <el-button
                                        type="danger"
                                        @click="bookDelete(scope.$index, scope.row)"
                                >删除
                                </el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="信箱">
                    <el-tabs :tab-position="tabPosition" class="mailBox">
                        <el-tab-pane label="收件箱">
                            <el-table :data="filterTable_inBox" style="width: 100%" height="500">
                                <el-table-column label="申请人" prop="user"/>
                                <el-table-column label="书名" prop="bookName"/>
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
                                        >同意
                                        </el-button
                                        >
                                        <el-button
                                                type="danger"
                                                @click="bookReject(scope.$index, scope.row)"
                                        >拒绝
                                        </el-button
                                        >
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="申请表">
                            <el-table :data="filterTable_outBox" style="width: 100%" height="500">
                                <el-table-column label="拥有者" prop="user"/>
                                <el-table-column label="书名" prop="bookName"/>
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
                                        >交流
                                        </el-button
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
                <!--                <img src="/1.jpg"/>-->
                <!--                <el-upload-->
                <!--                        action=""-->
                <!--                        accept="image/png,image/gif,image/jpg,image/jpeg"-->
                <!--                        list-type="picture-card"-->
                <!--                        :on-change="onUploadChange"-->
                <!--                        :auto-upload="false"-->
                <!--                        :limit="1"-->
                <!--                >-->
                <!--                    <el-button slot="trigger" size="small" type="primary">选取</el-button>-->
                <!--                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>-->
                <!--                </el-upload>-->
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
                <el-form-item label="" :label-width="formLabelWidth">
                    <!-- <el-input v-model="editForm.image" height="300" name="image" type="file"/> -->
                    <img :src="addForm.image" width="200" height="300" class="head_pic"/>
                    <el-button type="primary" style="margin-top: 59%;margin-left: 10%;" @click="uploadAdd()">选择图片
                    </el-button>
                </el-form-item>
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
</template>
<script>
import {computed, defineComponent} from "vue"
import '../../utils/selfCenter.js'
import navigationBar from '../../components/header.vue'
import axios from "axios";

export default defineComponent({
    name: "selfCenter",

    data() {
        return {
            name: '你',
            introduce: '这是一个自我介绍',
            tabPosition: 'left',
            left_drawer: false,
            right_drawer: false,
            formLabelWidth: '80px',
            editForm: {
                bookName: '',
                ISBN: '',
                category: '',
                introduce: '',
                image: '',
            },
            addForm: {
                bookName: '',
                ISBN: '',
                category: '',
                introduce: '',
                image: '',
            },
            borrowRecords: [
                {
                    startDate: '2023-05-03',
                    endDate: '2023-05-04',
                    category: '科幻',
                    bookName: '人工智障',
                    owner: 'Tom',
                    tag: 0,
                },
                {
                    startDate: '2023-05-03',
                    endDate: '2023-05-04',
                    category: '母猪的产后护理',
                    bookName: '从小学习C++',
                    owner: 'John',
                    tag: 1,
                },
                {
                    startDate: '2023-05-03',
                    endDate: '2023-05-04',
                    category: '乡村爱情',
                    bookName: '浪漫地球',
                    owner: 'Morgan',
                    tag: 2,
                },
                {
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
                    startDate: '2023-05-03',
                    endDate: '2023-05-04',
                    category: '母猪的产后护理',
                    bookName: '从小学习C++',
                    owner: 'John',
                    tag: 1,
                },
                {
                    startDate: '2023-05-03',
                    endDate: '2023-05-04',
                    category: '乡村爱情',
                    bookName: '浪漫地球',
                    owner: 'Morgan',
                    tag: 2,
                },
                {
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
                    startDate: '2023-05-03',
                    endDate: '2023-05-04',
                    category: '母猪的产后护理',
                    bookName: '从小学习C++',
                    owner: 'John',
                    tag: 1,
                },
                {
                    startDate: '2023-05-03',
                    endDate: '2023-05-04',
                    category: '乡村爱情',
                    bookName: '浪漫地球',
                    owner: 'Morgan',
                    tag: 2,
                },
                {
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
                    image: '/1.jpg',
                    ISBN: '2023120503',
                    category: '科幻',
                    bookName: '人工智障',
                    introduce: 'No. 189, Grove St, Los Angeles',
                    user: 'asaw',
                    tag: 0,
                },
                {
                    image: '/1.jpg',
                    ISBN: '20231206756',
                    category: '母猪的产后护理',
                    bookName: '从小学习C++',
                    introduce: 'No. 189, Grove St, Los Angeles',
                    user: 'tyfhw',
                    tag: 1,
                },
                {
                    image: '/1.jpg',
                    ISBN: '1243124124',
                    category: '乡村爱情',
                    bookName: '浪漫地球',
                    introduce: 'No. 189, Grove St, Los Angeles',
                    user: 'oyjo',
                    tag: 2,
                },
                {
                    image: '1.jpg',
                    ISBN: '2023112312',
                    category: '悬疑',
                    bookName: '憨豆先生',
                    introduce: 'No. 189, Grove St, Los Angeles',
                    user: 'lkim',
                    tag: 0,
                },
                {
                    image: '/1.jpg',
                    ISBN: '2023345353',
                    category: '乡村爱情',
                    bookName: '浪漫地球',
                    introduce: 'No. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los Angeles',
                    user: 'kljl',
                    tag: 2,
                },
                {
                    image: '1.jpg',
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
                    user: '2023120503',
                    bookName: '人工智障',
                    tag: 0,
                },
                {
                    user: '20231206756',
                    bookName: '从小学习C++',
                    tag: 1,
                },
                {
                    user: '1243124124',
                    bookName: '浪漫地球',
                    tag: -1,
                },
                {
                    user: '2023112312',
                    bookName: '憨豆先生',
                    tag: 0,
                },
                {
                    user: '2023345353',
                    bookName: '浪漫地球',
                    tag: -1,
                },
                {
                    user: '2027389246',
                    bookName: '憨豆先生',
                    tag: 0,
                },
            ],
            outBox: [
                {
                    user: '2023120503',
                    bookName: '人工智障',
                    tag: 0,
                },
                {
                    user: '20231206756',
                    bookName: '从小学习C++',
                    tag: 1,
                },
                {
                    user: '1243124124',
                    bookName: '浪漫地球',
                    tag: -1,
                },
                {
                    user: '2023112312',
                    bookName: '憨豆先生',
                    tag: 0,
                },
                {
                    user: '2023345353',
                    bookName: '浪漫地球',
                    tag: -1,
                },
                {
                    user: '2027389246',
                    bookName: '憨豆先生',
                    tag: 0,
                },
            ],
            search: '',
            filterTable_Borrow: '',
            filterTable_Mine: '',
            filterTable_inBox: '',
            filterTable_outBox: '',
            valueUrl: ''
        }
    },
    components: {navigationBar},
    mounted: function () {
        this.ready()
    },
    methods: {
        ready() {
            let that = this;
            //借书记录表单
            let config = {
                method: 'get',
                url: `http://localhost:5000/loginUser/list`,
                headers: {},
            };
            axios(config)
                .then(function (response) {
                    let res = response.data
                    if (res.code === 200) {
                        //赋值给books
                        that.borrowRecords = [];
                        let book = {};
                        for (let i = 0; i < res.msg.length; i++) {
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
            if (that.borrowRecords) {
                that.filterTable_Borrow = computed(() =>
                    that.borrowRecords.filter(
                        (data) =>
                            !that.search.value ||
                            data.name.toLowerCase().includes(that.search.value.toLowerCase())
                    )
                )
            }
            ;

            if (that.myBooks) {
                that.filterTable_Mine = computed(() =>
                    that.myBooks.filter(
                        (data) =>
                            !that.search.value ||
                            data.name.toLowerCase().includes(that.search.value.toLowerCase())
                    )
                )
            }
            ;
            if (that.inBox) {
                that.filterTable_inBox = computed(() =>
                    that.inBox.filter(
                        (data) =>
                            !that.search.value ||
                            data.name.toLowerCase().includes(that.search.value.toLowerCase())
                    )
                )
            }
            ;
            if (that.outBox) {
                that.filterTable_outBox = computed(() =>
                    that.outBox.filter(
                        (data) =>
                            !that.search.value ||
                            data.name.toLowerCase().includes(that.search.value.toLowerCase())
                    )
                )
            }

        },
        //这是借书记录按钮
        postpone(index, row) {
            console.log('延期');
            console.log(index, row)
        },
        //我的书籍按钮
        //修改
        bookEdit(index, row) {
            this.editForm.image = row.image;
            this.editForm.ISBN = row.ISBN;
            this.editForm.category = row.category;
            this.editForm.bookName = row.bookName;
            this.editForm.introduce = row.introduce;
            this.left_drawer = true
        },
        comfirmEdit() {
            var data = {
                bookId: 1,
                name: "软工",
                isbncode: "1112223334445",
                type: "软件",
                introduce: "介绍",
                imagePath: "/static/images/b.txt"
            };

            var config = {
                method: 'put',
                url: 'http://localhost:5000/loginUser/book',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.left_drawer = false
        },
        cancelEdit() {
            this.left_drawer = false
        },

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
                    that.valueUrl = this.result;
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
                    console.log(res)
                    if (res.code === 200) {
                        that.valueUrl = `http://localhost:5000${res.imagePath}`;
                        console.log(`http://localhost:5000${res.imagePath}`)
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
            this.right_drawer = false
        },
        cancelAdd() {
            this.right_drawer = false
        },
        uploadAdd() {
            let that = this;
            let input = document.createElement("input");
            input.setAttribute("type", "file");
            // 支持多选
            input.accept = "image/*";
            input.addEventListener("change", (e) => {
                let file = e.path[0].files[0];
                // 浏览器兼容性处理（有的浏览器仅存在 Window.URL）
                const windowURL = window.URL || window.webkitURL;
                // createObjectURL 函数会根据传入的参数创建一个指向该参数对象的URL
                let filePath = windowURL.createObjectURL(file);
                that.addForm.image = filePath;
            });
            input.click();
        },

        bookComfirm(index, row) {
            console.log('确认借出');
            console.log(index, row)
        },
        bookDelete(index, row) {
            console.log('删除');
            console.log(index, row)
        },
        //这是收件箱
        bookReject(index, row) {
            console.log(index, row)
        },
        bookAgree(index, row) {
            console.log(index, row)
        },
        //这是申请表
        chat(index, row) {
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
    color: black
}

:deep .el-input__inner::placeholder {
    color: #ffffff;
}

:deep .el-input__wrapper {
    background-color: transparent !important;
    /* border: 1px solid #1296db;  */
    border: 1px solid transparent;
    color: white
}

:deep .el-input {
    background-color: transparent !important;
    border: 1px solid transparent;
    color: white
}


:deep .el-input__inner:hover {
    background-color: rgba(255, 255, 255, 1);
}

:deep .search {
    color: black
}

.demo-drawer__footer {
    margin-left: 35%;
}

</style>