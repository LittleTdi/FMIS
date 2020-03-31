<template>
    <div>
        <nav-header navNum="2"></nav-header>
        <div class="mt-2 mb-2 text-lg-center text-blue font-weight-bold">项目报表情况</div>
        <el-table
        :data="tableData"
        style="width: 90%;margin:10px auto;">
            <el-table-column
                prop="month"
                label="月份"
                >
            </el-table-column>
            <el-table-column
                prop="cwconstruction"
                label="工地"
                >
            </el-table-column>
            <el-table-column
                prop="totalsr"
                label="收入"
                >
            </el-table-column>
            <el-table-column
                prop="totalZc"
                label="支出">
            </el-table-column>
            <el-table-column
                prop="totalYyf"
                label="运输费用">
            </el-table-column>
        </el-table>
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
    export default{
        data(){
            return{
                tableData: [],
                data:null,//查询返回数据
                pageSize:0,
                page:{
                    page:1,
                    size:5
                },
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
                var page=this.page.page;
                var size=this.page.size;
                this.$post('cwreport/cwreport/vitalStatistics?page='+page+"&size="+size,{})
                .then(res=>{
                    if(res.code==20000){
                        this.data=res.data;
                        this.tableData=res.data.list;
                        console.log(this.tableData);
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

</style>