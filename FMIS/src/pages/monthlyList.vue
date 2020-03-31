<template>
    <div>
        <nav-header navNum="1"></nav-header>
        <div class="mt-2 mb-3 font-weight-bold text-blue text-lg-center">月报表列表</div>
        <div class="text-left" style="width: 90%;margin:10px auto 0 auto;">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="toPath('./createMonthlyReport')" :disabled="isAdd"
            v-if="userType==1">新增</el-button>
            <el-button type="default" @click="edit" icon="el-icon-edit" size="small" :disabled="isEdit"
            v-if="userType==1">编辑</el-button>
            <el-button type="danger" @click="deleteReport" icon="el-icon-delete" :disabled="isDelete" size="small"
            v-if="userType==1">删除</el-button>
            <el-button type="primary" @click="submit" icon="el-icon-circle-check" :disabled="isDelete" size="small"
            v-if="userType==1">提交申请</el-button>
            <el-button type="warning" :disabled="!iscan" icon="el-icon-s-check" size="small" @click="toVerify" v-if="userType&&userType==2">审核</el-button>
        </div>
        <div class="content-lg content pl-md-3">
            <el-table
            :data="tableData"
            style="width:100%;"
            @selection-change="handleSelectionChange">
                <el-table-column
                type="selection">
                </el-table-column>
                <el-table-column
                    prop="cwMonth"
                    label="月份"
                    >
                </el-table-column>
                <el-table-column
                    label="工地"
                    >
                    <template slot-scope="scope">
                        <div>{{scope.row.cwconstructionId|change(sites)}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cwState"
                    label="状态"
                    >
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" size="mini">详情<i icon="el-icon-d-arrow-right" class="el-icon-d-arrow-right el-icon-right"></i></el-button> -->
                        <el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)">详情<i class="el-icon-d-arrow-right"></i></el-button>
                    </template>
                </el-table-column>
            </el-table> 
        </div>
        <div class="page mt-5 justify-content-lg-end justify-content-sm-end justify-content-md-end d-flex pr-lg-5 page-sm page-md">
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
    export default{
        data(){
            return{
                tableData: [],//渲染数据,
                loadData:null,//加载数据
                counts:['每页5条','每页10条','每页15条'],
                pageSize:1,
                dataCount:null,
                isEdit:true,
                isDelete:true,
                iscan:false,
                isAdd:false,
                page:{
                    page:1,
                    size:5
                },
                data:null,//所有查询数据,
                seleted:null,
                userType:null,
                userData:null,
                sites:null,//工地列表
            }
        },
        components:{
            NavHeader
        },
        methods:{
            handleSelectionChange(val) {
                // console.log(val)
                if(val.length==1&&val[0].cwState=='审核中'){
                    this.iscan=true;
                }else{
                    this.iscan=false;
                }
               
                if(val.length==1&&val[0].cwState!='审核中'&&val[0].cwState!='已审核'){
                    this.isEdit=false;
                    this.isDelete=false;
                }else{
                    this.isEdit=true;
                    this.isDelete=true;
                }
                this.seleted=val;
            },
            handleDetail(index,row){
                var data=row;
                this.$setStr('id',row.id);
                this.$setStr('month',row.cwMonth);
                this.$setStr('cwState',row.cwState);
                this.$router.push({
                    path:'./monthlyFormList',
                    name:'monthlyFormList',
                    params:{data:data}
                })
            },
            getPageData(){
                var params={
                    page:this.page,
                    shName:this.userData.id
                }
                this.$post('cwreport/cwreport/searchfindPage',params).then(res=>{
                    this.data=res.data;
                    this.loadData=res.data.list;
                    var arr=JSON.parse(JSON.stringify(res.data.list));
                    arr.forEach(element => {
                        if(element.cwState==4){
                            element.cwState='已审核'
                        }else if(element.cwState==3){
                            element.cwState='已拒绝'
                        }else if(element.cwState==2){
                            element.cwState='审核中';
                        }else if(element.cwState==1){
                            element.cwState='未审核'
                        }else{
                            element.cwState=element.cwState;
                        }
                        // var e=element;
                        // for(var i=0;i<this.sites.length;i++){
                        //     if(element.cwconstructionId==this.sites[i].id){
                        //         element.cwconstructionName=this.sites[i].cwName;
                        //     }
                        // }
                    });

                    this.tableData=arr;
                    console.log(this.tableData);

                })
            },
            next(){
                if(this.data.isLastPage===false){
                    this.page.page++;
                    this.getPageData();
                }
            },
            pre(){
                if(this.data.isFirstPage===false){
                    this.page.page--;
                    this.getPageData();
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
                this.getPageData();
            },
            drump(){
                // console.log(this.page.page);
                this.getPageData();
            },
            onEnter(e){
                if(e.keyCode==13&&this.data.lastPage>=this.page.page){
                    this.getPageData();
                }
            },
            submit(){
                // console.log(this.seleted);
                var params=this.seleted[0];
                params.cwState=2;
                this.$confirm('提交后将不能进行修改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post('cwreport/cwreport/update',params).then(res=>{
                        if(res.code==20000){
                            this.$message({
                                type: 'success',
                                message: '提交成功!'
                            });
                            this.getPageData();
                        }
                    })
                }).catch(() => {
                });
            },
            deleteReport(){
                // console.log(this.seleted);
                var self=this;
                var id=this.seleted[0].id;
                this.$post('cwreport/cwreport/delete?id='+id,{}).then(res=>{
                    if(res.code==20000){
                        this.$message({
                            message:'删除成功！',
                            type:'success'
                        })
                        this.getPageData();
                    }
                })
            },
            edit(){
                var data=this.seleted[0];
                this.$router.push({
                    path:'/editcwReport',
                    name:'editcwReport',
                    params:{
                        data:data
                    }
                })
            },
            toVerify(){
                var data=this.seleted[0];
                this.$router.push({
                    path:'/verify',
                    name:'verify',
                    params:{
                        data:data
                    }
                })
            }
        },
        created(){
            this.userData=this.$getObj('userData');
            this.$post('cwreport/cwconstruction/findAll',{}).then(res=>{
                // console.log(res);
                if(res.code==20000){
                    this.sites=res.data;
                }
            })
            this.getPageData();
            // console.log(this.userData);
        },
        mounted(){
            this.userType=this.$getStr('userType');
            
        },
        filters:{
            change:function(val,data){
                for(var i=0;i<data.length;i++){
                    if(val==data[i].id){
                        return data[i].cwName;
                    }
                }
            }
        },
    } 
</script>
<style>
    @media screen and (min-width:992px){
        .content-lg{
            width:90%;
            margin:auto;
        }
    }
    @media screen and (max-width:991px){
        .content{
            /* width:100%; */
            margin:0 10px;
        }
        .page input.ml-2.text-center{
            width:30px;
        }
    }
    .el-table .cell{
        padding-right:0;
    }
    
</style>
