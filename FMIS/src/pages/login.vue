<template>
    <div class="form pt-md-5 pt-sm-5 form-sm form-md mt-lg-0">
        <div class="text-blue text-xl-center font-weight-bold mt-5">登陆</div>
        <div class="login mt-md-5 mt-lg-5">
            <el-form ref="form" :model="user">
                <el-form-item>
                    <div class="d-flex align-items-center">
                        <div class="mr-1 pl-1 pr-1">
                            <img src="../assets/user.png" alt="">
                        </div>
                        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="d-flex align-items-center">
                        <div class="mr-1 pl-1 pr-1">
                            <img src="../assets/pwd.png" alt="">
                        </div>
                        <el-input v-model="user.password" type="password" placeholder="请输入密码" @keyup="login"></el-input>
                    </div>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" class="w-75" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                user:{
                    username:null,
                    password:null
                }
            }
        },
        created(){},
        methods:{
            login(){
                var person=JSON.parse(JSON.stringify(this.user));
                person.password=this.$md5(person.password);
                this.$post('cwreport/cwuser/login',person).then(res =>{
                    // console.log(res)
                    if(res.code==20000){
                        this.$setStr('data',res.data);
                        var token=res.data;
                        this.$post('cwreport/cwuser/getToken',{token:token}).then(res=>{
                            // console.log(res);
                            if(res.code=20000){
                                this.userData=res.data;
                                this.userType=res.data.userType;
                                this.$setStr('userType',this.userType);
                                this.$setObj('userData',this.userData);
                            }
                        })
                        setTimeout(() => {
                            this.$router.push('./monthlyList');
                        }, 1000);
                        
                    }else if(res.code==20001){
                        this.$message({
                            message:'登录失败！',
                            type:'error'
                        })
                    }else if(res.code==20002){
                        this.$message({
                            message:'用户名或密码错误！',
                            type:'warning'
                        })
                    }
                })
            }
        }
    }
</script>
<style>
    @media screen and (min-width:992px){
        .form{
            width:60%;
            margin-top:5%;
            margin-left:auto;
            margin-right:auto;
        }
    }
    .border-blue{
        border:solid 1px #1296DB;
    }
</style>