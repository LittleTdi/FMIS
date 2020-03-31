<template>
    <div>
        <nav-header navNum="1"></nav-header>
        <div class="mt-lg-2 mt-md-5 mt-sm-5 mb-3 font-weight-bold text-blue text-lg-center">{{type==2? '修改条目':'新增条目'}}</div>
        <div class="add-item">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="条目名称"  :required="type!=2? true:false">
                    <el-input v-model="form.cwName" placeholder="请输入条目名称"></el-input>
                </el-form-item>
                <el-form-item label="类型" :required="type!=2? true:false">
                    <el-select v-model="cwType " placeholder="请选择" class="mb-1">
                        <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金额"  :required="type!=2? true:false">
                    <el-input v-model="form.cwAmount" placeholder="请输金额"></el-input>
                </el-form-item>
                <el-form-item label="摘要"  :required="type!=2? true:false">
                    <el-input v-model="form.cwAbstract" placeholder="摘要"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                <el-input type="textarea" v-model="form.cwDesc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">{{submitButton}}</el-button>
                    <!-- <el-button>取消</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import NavHeader from '../components/navHeader'
    export default{
        data(){
            return{
                options:["收入","支出","运输费用"],
                cwType:'收入',
                form:{
                    // id:null,
                    cwType:null,
                    cwAmount:null,
                    cwName:null,
                    cwAbstract:null,
                    cwDesc:null,
                    cwBbid:null
                },
                id:null,
                submitButton:null,
                type:null//功能类型（添加/修改）
            }
        },
        components:{
            NavHeader
        },
        created(){
            this.form.cwBbid=this.$route.params.cwBbid;
            var data=this.$route.params.data;
            // console.log(data);
            this.type=this.$route.params.type;
            // console.log(this.type);
            if(this.type==1){
                this.submitButton="立即添加"
            }else if(this.type==2){
                this.submitButton='修改条目'
                this.form.cwName=data[0].cwName;
                this.form.cwType=data[0].cwType;
                this.form.cwAbstract=data[0].cwAbstract;
                this.form.cwAmount=data[0].cwAmount;
                this.form.cwDesc=data[0].cwDesc;
                this.id=data[0].id;
                console.log(this.form)
            }else{
                this.submitButton="立即添加"
            }
        },
        methods:{
            onSubmit(){
                var self=this;
                // console.log(this.form.cwType);
                if(this.cwType=="收入"){
                    this.form.cwType=1;
                }else if(this.cwType=="支出"){
                    this.form.cwType=2
                }else if(this.cwType=="运输费用"){
                    this.form.cwType=3;
                }else{
                    this.form.cwType=this.cwType;
                }
                var params=JSON.parse(JSON.stringify(this.form));

                if(this.type==1){
                    this.$post('cwreport/cwclauses/add',params).then(res=>{
                        if(res.code==20000){
                            // console.log(res)
                            this.$message({
                                message:'添加成功！',
                                type:'success'
                            })
                            self.$router.go(-1);
                        }
                    })
                }else if(this.type==2){
                    params.id=this.id;
                    this.$post('cwreport/cwclauses/update',params).then(res=>{
                        if(res.code==20000){
                            this.$message({
                                message:"修改成功！",
                                type:'success'
                            })
                            self.$router.go(-1);
                        }
                    })
                }
                
            }
        }
    }
</script>
<style>
    .add-item{
        padding:1% 5%;
        margin: 15px auto;
    }
    .el-select{
        display:block;
    }
    @media screen and (min-width:992px) {
        .add-item{
            width:60%;
        }
    }
    .el-date-editor.el-input{
        width:100%;
    }
</style>