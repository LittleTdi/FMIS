<template>
    <div>
        <nav-header navNum="1"></nav-header>
        <div class="form mt-2" >
            <div class="mt-lg-2 mt-md-5 mb-3 font-weight-bold text-blue text-lg-center form-mt-sm">修改月报表</div>
            <table class="monthly-report w-l-75 mt-3">
            <tr class="pt-2">
                <td class="text-right"><div class="mr-1">月份</div></td>
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
            <el-button type="primary" class="w-50 mt-3 w-l-30" @click="onSubmit">立即修改</el-button>
        </div>
        </div>
    </div>
</template>
<script>
    import NavHeader from '../components/navHeader'
    export default{
        data(){
            return{
                month:'',
                cwType:null,
                data:null
            }
            
        },
        created(){
            this.month=this.$route.params.data.cwMonth;
            // console.log(this.month);
            // this.cwType=this.$route.params.data.cwType;
            this.data=this.$route.params.data;
            console.log(this.data);
        },
        components:{
            NavHeader
        },
        methods:{
            onSubmit(){
                var params=this.data;
                console.log(params);
                if(!params.cwconstructionId){
                    params.cwconstructionId=this.$getObj('userData').cwconstructionId;
                }
                // console.log(this.$getObj('userData'));
                if(this.month!=this.data.cwMonth){
                    var month=this.month.getFullYear()+'-';
                    if(this.month.getMonth()+1<10){
                        month=month+'0'+(this.month.getMonth()+1);
                    }else{
                        month+=(this.month.getMonth()+1);
                    }
                    params.cwMonth=month;
                }else{
                    params.cwMonth=this.month;
                }
                
                params.cwState=1;
                // params.cwType=1;
                // console.log(params)
                this.$post('cwreport/cwreport/update',params).then(res=>{
                    if(res.code==20000){
                        this.$message({
                            message:'修改成功！',
                            type:'success'
                        })
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