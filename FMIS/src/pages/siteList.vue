<template>
    <div>
        <nav-header navNum="1"></nav-header>
        <div class="mt-2 mb-3 font-weight-bold text-blue text-lg-center">工地列表</div>
        <div class="text-left" style="width: 90%;margin:10px auto 0 auto;">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="toPath('./createSite')">新增</el-button>
            <el-button type="default" icon="el-icon-edit" size="small" @click="toEdit" :disabled="isEdit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" :disabled="isDelete" @click="deleteSite" size="small" >删除</el-button>
        </div>
        <div class="site-list">
            <el-table
            :data="tableData"
            @selection-change="handleSelectionChange">
                <el-table-column
                type="selection">
                </el-table-column>
                <el-table-column
                    prop="cwName"
                    label="工地名称">
                </el-table-column>
            </el-table>
        </div>
        <div class="page mt-4 mb-3 justify-content-lg-end justify-content-sm-end justify-content-md-end d-flex pr-lg-5 page-sm page-md">
            <div>共 {{data? data.total:0}} 条</div>
            <div class="page-itm ml-2">
                <i class="el-icon-arrow-left" @click="pre"></i>
                <span class="text-blue">{{page.page}}</span>
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
    export default{
        data(){
            return{
                tableData: null,
                data:null,//查询返回数据
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
            }
        },
        components:{
            NavHeader
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                var page=this.page;
                this.$post('cwreport/cwconstruction/searchfindPage',{page:page})
                .then(res=>{
                    if(res.code==20000){
                        this.data=res.data;
                        this.tableData=res.data.list;
                        // console.log(res.data.list);
                    }
                })
            },
            handleSelectionChange(val){
                // console.log(val)
                if(val.length==1){
                    this.isEdit=false;
                    this.isDelete=false;
                }else{
                    this.isEdit=true;
                    this.isDelete=true;
                }
                this.seletion=val;
            },
            deleteSite(){
                // console.log('111');
                var id=this.seletion[0].id;
                this.$post('cwreport/cwconstruction/delete?id='+id,{}).then(res=>{
                    if(res.code==20000){
                        this.$message({
                            message:'删除成功！',
                            type:'success'
                        })
                        this.getData();
                    }
                })
            },
            toEdit(){
                var list=this.seletion;
                var id=this.seletion[0].id;
                var cwName=this.seletion[0].cwName;
                this.$router.push({
                    name:'editSite',
                    path:'./editSite',
                    params:{
                        list:list
                    }
                })
            },
            next(){
                if(this.data.isLastPage===false){
                    this.page.page++;
                    this.getData();
                }
            },
            pre(){
                if(this.page.page>1){
                    this.page.page=this.page.page-1;
                    this.getData();
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
                this.getData();
            },
            drump(){
                // console.log(this.page.page);
                this.getData();
            },
            onEnter(e){
                if(e.keyCode==13&&this.data.lastPage>=this.page.page){
                    this.getData();
                }
            },
        }
    }
</script>
<style>
    .site-list{
        width:90%;
        margin:0 auto;
    }
</style>