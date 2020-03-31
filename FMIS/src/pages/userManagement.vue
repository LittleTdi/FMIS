<template>
    <div>
        <nav-header navNum="3"></nav-header>
        <div class="mt-3 font-weight-bold text-blue text-lg-center">{{type==2? '用户编辑':'新增用户'}}</div>
        <div class="mt-3 form form-sm form-md">
            <el-form ref="form" :model="user" label-width="80px">
                <el-form-item label="用户名" :required="type!=2? true:false">
                    <el-input v-model="user.username" autofocus></el-input>
                </el-form-item>
                <el-form-item label="密码"  :required="type!=2? true:false">
                    <el-input v-model="user.password" placeholder="请输入密码" type='password'></el-input>
                </el-form-item>
                <el-form-item label="手机号"  :required="type!=2? true:false">
                    <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="用户类型"  :required="type!=2? true:false">
                    <el-select v-model="user.userType" placeholder="请选择用户类型">
                    <el-option label="工地管理员" value="1"></el-option>
                    <el-option label="财务管理员" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工地">
                    <el-select v-model="site" placeholder="请选择" style="width:100%;">
                        <el-option
                        v-for="(item,index) in sites"
                        :key="index"
                        :label="item.cwName"
                        :value="item.id">
                        </el-option>
                    </el-select>
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
    export default {
        data(){
            return{
                user:{
                    email :null,//(string, optional): 邮箱 ,
                    // id :null,
                    password :null,//(string, optional): 密码 ,
                    phone :null,//(string, optional): 电话 ,
                    userType :null,//(string, optional): 用户类型 ,
                    username :null//(string, optional): 用户名
                },
                type:null,
                data:null,
                id:null,
                site:null,
                sites:null
            }
        },
        created(){
            this.$post('cwreport/cwconstruction/findList',{}).then(res=>{
                console.log(res);
                if(res.code==20000){
                    this.sites=res.data;
                    // this.site=res.data[0].id;
                }
            })

            var type=this.$route.params.type;
            this.type=type;
            if(type&&type==2){
                var data=this.$route.params.data;
                // console.log(data);
                this.data=data;
                this.id=data.id;
                this.user.username=data.username;
                this.user.phone=data.phone;
                this.user.email=data.email;
                // this.user.password=data.password;
                this.user.userType=data.userType;
            }
        },
        components:{
            NavHeader
        },
        methods:{
            onSubmit(){
                var params;
                if(this.type&&this.type==2){
                    params=JSON.parse(JSON.stringify(this.data));params.username=this.user.username;params.phone=this.user.phone;
                    params.email=this.user.email;
                }else{
                    params=JSON.parse(JSON.stringify(this.user));
                }
                // console.log(params)
                if(this.site){
                    params.cwconstructionId=this.site;
                }
                
                if(this.user.password){
                    params.password=this.$md5(this.user.password);
                }
                
                if(this.user.userType=='工地管理员'){
                    params.userType=1;
                }else if(this.user.userType=='财务管理员'){
                    params.userType=2;
                }else{
                    params.userType=this.user.userType;
                }
                
                // console.log(params);
                if(this.type==2){
                    // if(this.data.password!=params.password){
                    //     params.password=this.$md5(params.password);
                    // }
                    params.id=this.id;
                    this.$post('cwreport/cwuser/update',params).then(res=>{
                        // console.log(res)
                        if(res.code==20000){
                            this.$message({
                                message:'修改成功！',
                                type:'success'
                            })
                            this.$router.go(-1);
                        }
                    })
                }else{
                    // console.log(params);
                    this.$post('cwreport/cwuser/add',params).then(res=>{
                        // console.log(res)
                        if(res.code==20000){
                            this.$message({
                                message:'新增成功！',
                                type:'success'
                            })
                            this.$router.go(-1);
                        }
                    })
                }
            },
        }

    }
</script>
<style>
    .el-select{
        width:100%;
    }
</style>