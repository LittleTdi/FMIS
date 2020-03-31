<template>
    <div>
        <nav-header navNum="1"></nav-header>
        <div class="mt-lg-2 mt-md-5 mb-3 font-weight-bold text-blue text-lg-center">{{month}}月报表详情</div>
        <div class="text-left" style="width: 90%;margin:10px auto 0 auto;">
            <el-button type="primary" :disabled="isAdd" icon="el-icon-plus" size="small" @click="addItem">添加条目</el-button>
            <el-button type="default" icon="el-icon-edit" @click="edit" :disabled="isEdit" size="small">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteItem" :disabled="isDelete" size="small">删除</el-button>
        </div>
        <div class="content-lg content pl-md-3">
            <el-table :data="tableData" 
            @selection-change="handleSelectionChange"
            style="width:100%;">
                <el-table-column style="width:30px"
                    type="selection">
                </el-table-column>
                <el-table-column
                    prop="cwName"
                    label="条目名"
                    >
                </el-table-column>
                <el-table-column
                    prop="cwType"
                    label="类型"
                    >
                </el-table-column>
                <el-table-column
                    prop="cwAmount"
                    label="金额"
                    >
                </el-table-column>
                <el-table-column
                    prop="cwAbstract"
                    label="摘要"
                    >
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
        center>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>条目名称：</div>
                <div>{{detail? detail.cwName:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>类型：</div>
                <div>{{detail? type[detail.cwType-1]:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>金额：</div>
                <div>{{detail? detail.cwAmount:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>摘要：</div>
                <div>{{detail? detail.cwAbstract:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>创建人：</div>
                <div>{{detail? detail.createName:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>创建时间：</div>
                <div>{{detail? detail.createDate:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>修改人：</div>
                <div>{{detail? detail.updateName:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>修改时间：</div>
                <div>{{detail? detail.updateDate:''}}</div>
            </div>
            <div class="d-flex align-items-center pl-lg-5" >
                <div>备注：</div>
                <div>{{detail? detail.cwDesc:''}}</div>
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
                tableData:null,
                data:null,//查询总数据
                centerDialogVisible: false,
                detail:null,
                month:null,
                selection:null,
                isEdit:true,
                isDelete:true,
                isAdd:false,
                page:{
                    page:1,
                    size:5
                },
                counts:['每页5条','每页10条','每页15条'],
                pageSize:0,
                dataCount:null,
                type:['收入','支出','运输费用'],
                cwBbid:null,//报表ID
                cwState:null
            }
        },
        components:{
            NavHeader
        },
        created(){
            // console.log(this.$route.params.data)
            var data=this.$route.params.data;
            if(data){
                this.month=data.cwMonth;
                this.cwBbid=data.id;
                this.cwState=data.cwState;
              }  
                
            if(!this.cwBbid){
                this.cwBbid=this.$getStr('id');
                // console.log(this.cwBbid);
            }
            if(!this.month){
                this.month=this.$getStr('month');
            }
            if(!this.cwState){
                this.cwState=this.$getStr('cwState');
            }
            if(this.cwState=='已审核'||this.cwState=='审核中'){
                    this.isAdd=true;
                    this.isDelete=true;
                    this.isEdit=true;
                }else{
                    this.isAdd=false;
                    this.isDelete=false;
                    this.isEdit=false;
                }
            this.getItemData();
        },
        methods:{
            getItemData(){
                var self=this;
                var params={
                    cwBbid:this.cwBbid,
                    page:this.page
                }
                this.$post('cwreport/cwclauses/searchfindPage',params).then(res=>{
                    // console.log(res)
                    if(res.code==20000)
                    var arr=res.data.list;
                    this.data=res.data
                    // console.log(arr);
                    arr.forEach(element => {
                        if(element.cwType==1){
                            element.cwType="收入"
                        }else if(element.cwType==2){
                            element.cwType="支出"
                        }else if(element.cwType==3){
                            element.cwType="运输费用"
                        }
                    });
                    this.tableData=arr;
                })
            },
            handleSelectionChange(val) {
                this.selection = val;
                // console.log(val)
                if(val.length==1){
                    this.isEdit=false;
                    this.isDelete=false;
                }else{
                    this.isEdit=true;
                    this.isDelete=true;
                }
            },
            next(){
                if(this.data.isLastPage===false){
                    this.page.page++;
                    this.getItemData();
                }
            },
            pre(){
                if(this.data.isFirstPage===false){
                    this.page.page--;
                    this.getItemData();
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
                this.getItemData();
            },
            drump(){
                // console.log(this.page.page);
                this.getItemData();
            },
            onEnter(e){
                if(e.keyCode==13&&this.data.lastPage>=this.page.page){
                    this.getItemData();
                }
            },
            openDialog(row){
                // console.log(row);
                this.detail=row;
                this.centerDialogVisible=true;
                
            },
            addItem(){
                var self=this;
                this.$router.push({
                    path:'./addprojectitem',
                    name:'addprojectitem',
                    params:{
                        cwBbid:self.cwBbid,
                        type:1
                    }
                })
            },
            edit(){
                var self=this;
                this.$router.push({
                    path:'./addprojectitem',
                    name:'addprojectitem',
                    params:{
                        cwBbid:self.cwBbid,
                        type:2,
                        data:self.selection
                    }
                })
            },
            deleteItem(){
                // console.log(this.selection);
                var id=this.selection[0].id;
                this.$post('cwreport/cwclauses/delete?id='+id,{}).then(res=>{
                    if(res.code==20000){
                        this.$message({
                            message:'删除成功！',
                            type:'success'
                        })
                        this.getItemData();
                    }
                })
            }
        },
        
    }
</script>
<style>
    /* .el-table-column--selection .cell{
        padding:0;
    }
    .el-table th>.cell{
        padding:0;
    } */
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
            /* width:100%; */
            margin:0 10px;
        }
        .page input.ml-2.text-center{
            width:30px;
        }
    }
</style>