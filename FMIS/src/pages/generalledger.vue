<template>
    <div>
        <nav-header navNum="2"></nav-header>
        <div class="mt-3 font-weight-bold text-blue text-lg-center">{{type==2? '编辑总账':'创建总账'}}</div>
        <div class="form mt-3 form-md form-sm">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="月份" :required="type!=2? true:false">
                    <el-date-picker
                    v-model="form.month"
                    type="month"
                    placeholder="选择月份" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="总收入" :required="type!=2? true:false">
                    <el-input v-model="form.grossIncome" placeholder="总收入"></el-input>
                </el-form-item>
                <el-form-item label="总支出" :required="type!=2? true:false">
                    <el-input v-model="form.totalExpenditure" placeholder="总支出"></el-input>
                </el-form-item>
            </el-form>
            <div class="text-center">
                <el-button type="primary" @click="onSubmit">{{type==2? '立即修改':'立即新增'}}</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import NavHeader from '../components/navHeader'
    export default{
        data(){
            return{
                type:null,
                form:{
                    month:null,
                    totalExpenditure:null,
                    grossIncome:null
                },
                id:null
            }
        },
        components:{NavHeader},
        created(){
            this.type=this.$route.params.type;
            if(this.type&&this.type==2){
                var data=this.$route.params.data;
                // console.log(data)
                this.form.month=data.month;
                this.form.grossIncome=data.grossIncome;
                this.form.totalExpenditure=data.totalExpenditure;
                this.id=data.id;
            }
        },
        methods:{
            onSubmit(){
                var params=JSON.parse(JSON.stringify(this.form));
                if(this.type==2){
                    params.id=this.id;
                    this.$post('cwreport/cwgeneralledger/update',params).then(res=>{
                        if(res.code==20000){
                            this.$message({
                                message:'修改成功！',
                                type:'success'
                            })
                            this.$router.go(-1);
                        }
                    })
                }else{
                    this.$post('cwreport/cwgeneralledger/add',params).then(res=>{
                        if(res.code==20000){
                            this.$message({
                                message:'新增成功！',
                                type:'success'
                            })
                            this.$router.go(-1);
                        }
                    })
                }
            }
        }
    }
</script>
<style>

</style>