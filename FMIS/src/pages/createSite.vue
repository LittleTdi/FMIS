<template>
    <div class="create">
        <nav-header navNum="1"></nav-header>
        <div class="mt-2 mb-3 font-weight-bold text-blue text-lg-center mt-md-5">新增工地</div>
        <div class="form mt-2 form-md">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="工地名称" :required="true">
                    <el-input v-model="form.cwName" placeholder="请输入工地名称"></el-input>
                </el-form-item>
            </el-form>
            <div class="text-center">
                <el-button type="primary" @click="onSubmit">立即新增</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import NavHeader  from '../components/navHeader'
    export default{
        name:'createSite',
        data(){
            return{
                form:{
                    // id:1,
                    cwName:null
                },
            }
        },
        components:{
            NavHeader
        },
        methods:{
             handleDelete(index, row) {
                console.log(index, row);
            },
            onSubmit(){
                var params=JSON.parse(JSON.stringify(this.form));
                console.log(params);
                // arr.id++;
                this.$post('cwreport/cwconstruction/add',params).then(res=>{
                    // console.log(res)
                    if(res.code==20000){
                        this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        this.$router.go(-1);
                    }
                })
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
            width:60%;
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