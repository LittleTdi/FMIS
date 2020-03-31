<template>
    <div>
        <nav-header navNum="3"></nav-header>
        <div class="mt-2 mb-3 font-weight-bold text-blue text-lg-center">用户列表</div>
        <div class="text-left" style="width: 90%;margin:10px auto 0 auto;">
            <el-button type="primary" icon="el-icon-plus" @click="toPath('./userManagement')" size="small">新增</el-button>
            <el-button type="default" icon="el-icon-edit" @click="editUser" size="small" :disabled="isEdit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteUser" :disabled="isDelete" size="small">删除</el-button>
        </div>
        <div class="content-lg content pl-md-3 m-left">
            <el-table
            :data="user"
            style="width: 100%"
            @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                min-width="20">
                </el-table-column>
                <el-table-column
                    fixed
                    prop="username"
                    label="用户名"
                    min-width="70"
                    >
                </el-table-column>
                <el-table-column
                    prop="userType"
                    label="用户类型"
                    wdth='80'
                    >
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机号"
                    min-width="100"
                    >
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱"
                    min-width="120"
                    >
                </el-table-column>
            </el-table>
        </div>
        <div class="page mt-4 mb-3 justify-content-lg-end justify-content-sm-end justify-content-md-end d-flex pr-lg-5 page-sm page-md">
            <div>共 {{data? data.total:0}} 条</div>
            <div class="page-itm ml-2">
                <i class="el-icon-arrow-left" @click="pre"></i>
                <span class="text-blue">{{data? data.pageNum:1}}</span>
                <i class="el-icon-arrow-right" @click="next"></i> 
            </div>
            <div class="ml-2">
                <el-select v-model="pageSize" placeholder="Select" @change="changeSelection">
                    <el-option
                    v-for="(item,index) in counts"
                    :key="item"
                    :label="item"
                    :value="index"
                    width='50'
                    height="30">
                    </el-option>
                </el-select>
            </div>
            <div class="ml-2">跳至</div>
            <input type="text" v-model="page.page" class="ml-2 text-center" @blur="drump" @keyup="onEnter">
            <div class="ml-2">页</div>
        </div>
    </div>
</template>
<script>
    import NavHeader from '../components/navHeader'
    export default {
        data(){
            return{
                user:[],
                pageSize:0,
                page:{
                    page:1,
                    size:5
                },
                selection:null,
                isEdit:true,
                isDelete:true,
                counts:['每页5条','每页10条','每页15条'],
                dataCount:null,
                data:null,
            }
        },
        created(){
            this.getUser();
        },
        components:{
            NavHeader
        },
        methods:{
            handleSelectionChange(val){
                if(val.length==1){
                    this.isEdit=false;
                    this.isDelete=false;
                }else{
                    this.isDelete=true;
                    this.isEdit=true;
                }
                this.selection=val;
            },
            getUser(){
                var page=this.page;
                this.$post('cwreport/cwuser/searchfindPage',{page:page}).then(res=>{
                    // console.log(res);
                    if(res.code==20000){
                        var user=res.data.list;
                        this.data=res.data;
                        user.forEach(element => {
                            if(element.userType==1){
                                element.userType='工地管理员'
                            }else if(element.userType==2){
                                element.userType='财务管理员'
                            }else{
                                element.userType='-';
                            }
                        });
                        this.user=user;
                    }
                })
            },
            next(){
                if(this.data.isLastPage===false){
                    this.page.page++;
                    this.getUser();
                }
            },
            pre(){
                if(this.data.isFirstPage===false){
                    this.page.page--;
                    this.getUser();
                }
            },
            changeSelection(){
                // console.log(this.pageSize);
                if(this.pageSize==0){
                    this.page.size=5;
                }else if(this.pageSize==1){
                    this.page.size=10;
                }else{
                    this.apge.size=15;
                }
                this.getUser();
            },
            drump(){
                // console.log(this.page.page);
                this.getUser();
            },
            onEnter(e){
                if(e.keyCode==13&&this.data.lastPage>=this.page.page){
                    this.getUser();
                }
            },
            editUser(){
                var data=this.selection[0];
                this.$router.push({
                    path:'./userManagement',
                    name:'userManagement',
                    params:{
                        type:2,
                        data:data
                    }
                })
            },
            deleteUser(){
                var id=this.selection[0].id;
                this.$post('cwreport/cwuser/delete?id='+id,{}).then(res=>{
                    // console.log(res)
                    if(res.code==20000){
                        this.$message({
                            message:'删除成功！',
                            type:'success'
                        })
                        this.getUser();
                    }
                })
            }
        }

    }
</script>
<style>
    .el-table .cell{
        padding-right:0;
    }
    @media screen and (min-width:992px){
        .content-lg{
            width:90%;
            margin:auto;
        }
    }
    @media screen and (max-width:991px){
        .content{
            width:90%;
            margin:0 auto;
        }
        .page input.ml-2.text-center{
            width:30px;
        }
    }
    @media screen and (max-width:767px){
        .m-left{
            margin-left:8px;
        }
    }
    /* .el-table th{
        text-align: center;
    } */
</style>