<template>
    <div>
        <nav-header navNum="2"></nav-header>
        <div class="form mt-2" >
            <div class="mt-lg-2 mt-md-5 mb-3 font-weight-bold text-blue text-lg-center form-mt-sm">审核月报表</div>
            <table class="monthly-report w-l-75 mt-3">
                <tr class="pt-2">
                    <td class="text-right"><div class="mr-1">月份</div></td>
                    <td>
                        <el-input
                        :value="form.cwMonth"
                        disabled>
                        </el-input>
                    </td>
                </tr>
                <tr class="pt-2">
                    <td class="text-right"><div class="mr-1">工地ID</div></td>
                    <td>
                        <el-input :value='form.cwconstructionId' disabled></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right"><div class="mr-1">审核</div></td>
                    <td>
                        <el-select v-model="form.cwState" placeholder="请选择" style="width:100%;">
                            <el-option label="通过" value="4"></el-option>
                            <el-option label="拒绝" value="3"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td class="text-right"><div class="mr-1">审核意见</div></td>
                    <td><el-input type="textarea" v-model="form.cwAuditmind"></el-input></td>
                </tr>
            </table>
            <div class="text-center">
                <el-button type="primary" class="w-50 mt-3 w-l-30" @click="onSubmit">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import NavHeader from '../components/navHeader'
    export default{
        data(){
            return{
                form:{
                    id:null,
                    cwconstructionId:null,
                    cwAuditmind:null,//审核意见
                    cwState:null,//审核状态
                    // shDate:null,// (string, optional): 审核日期 
                    // shName:null,// (string, optional): 审核人 ,
                    cwMonth:null,// (string, optional): 月份 ,
                },
                    
            }
            
        },
        created(){
            // console.log()
            var data=this.$route.params.data;
            console.log(data)
            this.form.cwMonth=data.cwMonth;
            this.form.cwconstructionId=data.cwconstructionId;
            this.form.id=data.id;
            console.log(this.$route.params.data);
        },  
        components:{
            NavHeader
        },
        methods:{
            onSubmit(){
                var params=this.form;
                // params.cwState=3
                this.$post('cwreport/cwreport/update',params).then(res=>{
                    if(res.code==20000){
                        this.$message({
                            message:'提交成功！',
                            type:'success'
                        });
                        this.$router.go(-1);
                    }
                })
            }
        },
        
    }
</script>
<style>
    .d-flex{
        display:flex;
        align-items: center;
    }
    .flex-center{
        justify-content: center;
    }
    .monthly-report{
        /* width:90%; */
        margin:auto;
    }
    .monthly-report td{
        padding:10px;
    }
    @media screen and (min-width:768px){
        /* .monthly-report{
            width:70%;
        } */
        .w-l-75{
            width:75%;
        }
        .w-l-30{
            width:30% !important;
        }
    }
    @media screen and (max-width:767px){
        .monthly-report tr>td{
            padding:5px;
        }
    }
</style>