<template>
    <navigationBar></navigationBar>
    <div class="pages" style="margin-top:0">
        <el-table :data="filterTable_User" style="width: 90%; margin-left: 5%;margin-top:20px" height="810">
            <el-table-column label="id" prop="id"/>
            <el-table-column label="类型" prop="type"/>
            <el-table-column label="介绍" prop="introduce"/>
            <el-table-column label="密码" prop="password"/>
            <el-table-column align="center">
                <template #default="scope">
                    <el-button
                            type="primary"
                            @click="changeCharacter(scope.$index, scope.row)"
                    >修改身份
                    </el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-drawer
            ref="drawerRef"
            v-model="change"
            title="切换用户身份"
            :before-close="handleClose"
            direction="ltr"
            class="demo-drawer"
    >
        <div class="demo-drawer__content">
            <el-form>
                <el-form-item label="Area" :label-width="formLabelWidth">
                    <el-select
                            v-model="character"
                            placeholder="Please select activity area"
                    >
                        <el-option label="管理员" value="1"/>
                        <el-option label="学生" value="2"/>
                        <el-option label="教师" value="3"/>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <el-button @click="cancelChange">Cancel</el-button>
                <el-button type="primary" :loading="loading" @click="comfirmChange">{{
                    loading ? 'Submitting ...' : 'Submit'
                    }}
                </el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import {computed, defineComponent} from "vue"
import navigationBar from '../../components/header.vue'
import axios from "axios";

export default defineComponent({
    name: "userManagement",

    data() {
        return {
            tabPosition: 'left',
            filterTable_User: '',
            search: '',
            character: 1,
            user: '',
            change: false,
            User: [
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
            ]
        }
    },
    components: {navigationBar},
    mounted: function () {
        this.ready()
    },
    methods: {
        ready() {
            this.getUser();
        },

        //用户信息
        getUser() {
            let that = this;
            let config = {
                method: 'get',
                url: `http://localhost:5000/superAdmin/adminList`,
                headers: {},
            };
            axios(config)
                .then(function (response) {
                    let res = response.data
                    if (res.code === 200) {
                        //赋值给books
                        that.User = [];
                        for (let i = 0; i < res.msg.length; i++) {
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
            if (that.User) {
                that.filterTable_User = computed(() =>
                    that.User.filter(
                        (data) =>
                            !that.search.value ||
                            data.name.toLowerCase().includes(that.search.value.toLowerCase())
                    )
                )
            }
            ;
        },
        //修改用户身份
        changeCharacter(index, row) {
            this.character = row.type;
            this.user = row.id;
            this.change = true;
        },

        cancelChange() {
            this.change = false;
        },

        comfirmChange() {
            let that = this;
            let data = {
                userid: that.user,
                newUserType: that.character
            }
            let config = {
                method: 'put',
                url: `http://localhost:5000/superAdmin/adminList`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    let res = response.data
                    if (res.code === 200) {
                        that.getUser();
                        that.change = false;
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