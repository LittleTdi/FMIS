<template>
    <div>
        <nav-header navNum="2"></nav-header>
        <div class="text-left" style="width: 90%;margin:10px auto 0 auto;">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="toPath('./generalledger')">新增</el-button>
            <el-button type="default" icon="el-icon-edit" size="small" @click="toEdit" :disabled="isEdit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" :disabled="isDelete" @click="toDelete" size="small" >删除</el-button>
        </div>
        <div class="pl-lg-3 pl-md-2 t-sm">
            <el-table
                :data="tableData"
                @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection">
                    </el-table-column>
                    <el-table-column
                        prop="month"
                        label="月份">
                    </el-table-column>
                    <el-table-column
                        prop="grossIncome"
                        label="总收入">
                    </el-table-column>
                    <el-table-column
                        prop="totalExpenditure"
                        label="总支出">
                    </el-table-column>
                    
            </el-table>
        </div>
        <div class="page mt-4 justify-content-lg-end justify-content-sm-end justify-content-md-end d-flex pr-lg-5 page-sm page-md">
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

        <el-dialog
        title="详情"
        :visible.sync="centerDialogVisible"
        width="30%"
        center v-if="centerDialogVisible==true">
            <div class="d-flex align-items-center pl-lg-5" >
                <div>月份：</div>
                <div>{{detail? detail.month:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>总收入：</div>
                <div>{{detail? detail.grossIncome:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>总支出：</div>
                <div>{{detail? detail.totalExpenditure:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>创建人：</div>
                <div>{{detail? detail.createName:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>创建时间：</div>
                <div>{{detail.createDate | date}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>修改人：</div>
                <div>{{detail? detail.updateName:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>修改时间：</div>
                <div>{{ detail.updateDate | date}}</div>
            </div>
            <div slot="footer" class="dialog-footer text-right">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import NavHeader from '../components/navHeader'
    export default{
        data(){
            return{
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
                tableData:[],
                data:null,
                centerDialogVisible: false,
                detail:{
                    month:null,grossIncome:null,totalExpenditure:null,createName:null,createDate:null,updateDate:null,updateName:null
                }
            }
        },
        components:{
            NavHeader
        },
        created(){
            this.getData();
        },
        methods:{
            handleSelectionChange(val){
                // console.log(val)
                if(val.length==1){
                    this.isEdit=false;
                    this.isDelete=false;
                }else{
                    this.isDelete=true;
                    this.isEdit=true;
                }
                this.selection=val;
            },
            handleDetail(index, row){
                // console.log(row);
                this.detail=row;
                // var t=row.updateDate;
                // console.log(typeof(t))
                // console.log(t.getFullYear())
                // console.log(t.substring(0,9))
                this.centerDialogVisible=true;
            },
            toEdit(){
                var data=this.selection[0];
                this.$router.push({
                    path:'./generalledger',
                    name:'generalledger',
                    params:{
                        type:2,
                        data:data
                    }
                })
            },
            toDelete(){
                var id=this.selection[0].id;
                this.$post('cwreport/cwgeneralledger/delete?id='+id,{}).then(res=>{
                    if(res.code==20000){
                        this.$message({
                            message:'删除成功！',
                            type:'success'
                        })
                        this.getData();
                    }
                })
            },
            getData(){
                var self=this;
                this.$post('cwreport/cwgeneralledger/searchfindPage',{page:self.page})
                .then(res=>{
                    // console.log(res);
                    if(res.code==20000){
                        this.tableData=res.data.list;
                        this.data=res.data;
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
                if(this.data.isFirstPage===false){
                    this.page.page--;
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
    @media screen and (max-width:767px) {
        .t-sm{
            width:95%;
            margin:auto;
        }
    }
</style>