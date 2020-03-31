<template>
    <div>
        <nav-header navNum="1"></nav-header>
        <div class="form mt-lg-2 form-sm form-md mt-md-5" >
            <div class="mt-lg-2 mt-md-2 mb-3 font-weight-bold text-blue text-lg-center form-mt-sm">修改工地</div>
            <el-form ref="form" :model="revise" label-width="80px">
                <el-form-item label="工地名称">
                    <el-input v-model="revise.cwName" placeholder="请输入工地名称"></el-input>
                </el-form-item>
            </el-form>
            <div class="text-center">
                <el-button type="primary" @click="onSubmit">立即修改</el-button>
            </div>
        </div>  
    </div>
</template>
<script>
    import NavHeader from '../components/navHeader'
    export default{
        data(){
            return{
                revise:{
                    id:null,
                    cwName:null
                },
            }
        },
        components:{
            NavHeader
        },
        created(){
            this.getParams();
        },
        methods:{
            onSubmit(){
                this.$post('cwreport/cwconstruction/update',this.revise).then(res=>{
                    // console.log(res);
                    if(res.code==20000){
                        this.$message({
                            message:'修改成功！',
                            type:'success'
                        })
                        this.$router.go(-1);
                    }
                })
            },
            getParams() {
                let list=this.$route.params;
                this.revise.cwName=list.list[0].cwName;
                this.revise.id=list.list[0].id;
            }
        }
    }
</script>
<style>
    .form{
        margin:0 auto;
    }
    @media screen and (min-width:992px){
        .form{
            width:70%;
            padding:1% 5%;
        }
    }
    @media screen and (min-width:768px) and (max-width:991px){
        .form{
            padding-right:10px;
            padding-left:10px;
        }
        .el-form-item__label{
            padding-right:5px;
        }
    }
    @media screen and (max-width:767px){
        .form{
            padding-right:10px;
        }
        .el-form-item__label{
            padding-right:8px;
        }
    }
</style>