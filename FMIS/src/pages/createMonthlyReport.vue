<template>
    <div>
        <nav-header navNum="1"></nav-header>
        <div class="mt-lg-2 mt-md-5 font-weight-bold text-blue text-lg-center form-mt-sm">
            创建月报表
        </div>
        <table class="monthly-report w-l-75 mt-3">
            <tr class="pt-2">
                <td class="text-right"><div class="mr-1" :required="true">月份</div></td>
                <td>
                    <el-date-picker
                    v-model="month"
                    type="month"
                    placeholder="选择月份" style="width:100%;">
                    </el-date-picker>
                </td>
            </tr>
        </table>
        <div class="text-center">
            <el-button type="primary" class="w-50 mt-3 w-l-30" @click="onSubmit">提交申请</el-button>
        </div>
    </div>
</template>
<script>
    import NavHeader from '../components/navHeader'
    export default{
        data(){
            return{
                month:'',
            }
        },
        components:{
            NavHeader
        },
        created(){
        },
        methods:{
            onSubmit(){
                var site=this.$getObj('userData').cwconstructionId;
                var month=this.month.getMonth()+1;
                var cwMonth=this.month.getFullYear()+'-';
                if(month+1<10){
                    cwMonth=cwMonth+'0'+month;
                }else{
                    cwMonth+=month;
                }
                // console.log(cwMonth);
                console.log(cwMonth.toString());
                this.$post('cwreport/cwreport/add',{
                    cwconstructionId:site,//工地ID,
                    cwMonth:cwMonth,
                    cwState:1
                }).then(res=>{
                    console.log(res)
                    if(res.code==20000){
                        this.$message({
                            message:'创建成功！',
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