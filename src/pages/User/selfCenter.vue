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
            /></div>
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
                            <el-table-column label="拥有者" prop="user" />
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
</template>
<script>
      import {computed, defineComponent } from "vue"
      import '../../utils/selfCenter.js'
      import navigationBar from '../../components/header.vue'

      export default defineComponent({
          name: "selfCenter",
          
          data(){
              return {
                    name:'你',
                    introduce:'这是一个自我介绍',
                    tabPosition : 'left',
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
                            image:'/1.jpg',
                            ISBN: '2023120503',
                            category: '科幻',
                            bookName: '人工智障',
                            introduce: 'No. 189, Grove St, Los Angeles',
                            user:'asaw',
                            tag: 0,
                        },
                        {
                            image:'/1.jpg',
                            ISBN: '20231206756',
                            category: '母猪的产后护理',
                            bookName: '从小学习C++',
                            introduce: 'No. 189, Grove St, Los Angeles',
                            user:'tyfhw',
                            tag: 1,
                        },
                        {
                            image:'/1.jpg',
                            ISBN: '1243124124',
                            category: '乡村爱情',
                            bookName: '浪漫地球',
                            introduce: 'No. 189, Grove St, Los Angeles',
                            user:'oyjo',
                            tag: 2,
                        },
                        {
                            image:'1.jpg',
                            ISBN: '2023112312',
                            category: '悬疑',
                            bookName: '憨豆先生',
                            introduce: 'No. 189, Grove St, Los Angeles',
                            user:'lkim',
                            tag: 0,
                        },
                        {
                            image:'/1.jpg',
                            ISBN: '2023345353',
                            category: '乡村爱情',
                            bookName: '浪漫地球',
                            introduce: 'No. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los Angeles',
                            user:'kljl',
                            tag: 2,
                        },
                        {
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
                    search:'',
                    filterTable_Borrow: '',
                    filterTable_Mine: '',
                    filterTable_inBox: '',   
                    filterTable_outBox: '',  
              }
          },
          components: {navigationBar},
          mounted:function(){
            this.ready()
         },
          methods: {
            ready(){
                var that = this;
                //借书记录表单
                if(that.borrowRecords){
                    that.filterTable_Borrow = computed(() =>
                    that.borrowRecords.filter(
                    (data) =>
                    !that.search.value ||
                    data.name.toLowerCase().includes(that.search.value.toLowerCase())
                )
                )
                };
                if(that.myBooks){
                    that.filterTable_Mine = computed(() =>
                    that.myBooks.filter(
                    (data) =>
                    !that.search.value ||
                    data.name.toLowerCase().includes(that.search.value.toLowerCase())
                )
                )
                };
                if(that.inBox){
                    that.filterTable_inBox = computed(() =>
                    that.inBox.filter(
                    (data) =>
                    !that.search.value ||
                    data.name.toLowerCase().includes(that.search.value.toLowerCase())
                )
                )
                };
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
            //这是借书记录按钮
            postpone ( index, row) {
                console.log('延期');
                console.log(index, row)
            },
            //我的书籍按钮
            bookEdit ( index, row) {
                this.$prompt('修改屠宰数量', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			})
				.then(({ value }) => {
					this.$message({
						type: 'success',
						message: '修改成功！'
					});
					// val.tuzai = value;
					// // console.log('修改为',value,'行',indexs);
					// this.tableData[indexs].tuzai = JSON.parse(value);
					// val.tuzai = JSON.parse(value);
					// this.$set(this.tableData, indexs, val);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
                console.log('修改');
                console.log(index, row)
            },
            bookComfirm ( index, row) {
                console.log('确认借出');
                console.log(index, row)
            },
            bookDelete ( index, row) {
                console.log('删除');
                console.log(index, row)
            },
            //这是收件箱
            bookReject ( index, row) {
                console.log(index, row)
            },
            bookAgree ( index, row) {
                console.log(index, row)
            },
            //这是申请表
            chat ( index, row) {
                console.log(index, row)
            },
          },
      })
  </script>

  
<style scoped>
@import '../../assets/css/selfCenter.css';

:deep .el-input__inner {
    background-color: transparent !important;
  /* border: 1px solid #1296db;  */
    border: 1px solid transparent; 
    color:white
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

</style>