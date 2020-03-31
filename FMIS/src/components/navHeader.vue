<template>
    <div>
        <div class="navbar navbar-expand-sm navbar-dark bg-blue">
            <!--1.最前面不折叠的菜单-->
            <div style="width:250px;" class="text-left"><a href="" class="navbar-brand font-weight-bold">财务管理系统</a></div>
            <!--2.在小屏幕下出现的按钮，按钮上有三条线-->
            <button data-toggle="collapse" type="button" data-target="#content" class="navbar-toggler">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="content" class="collapse navbar-collapse">
                <ul class="navbar-nav nav">
                    <li class="nav-item d-flex-l dropdown">
                        <a class="nav-link dropdown-toggle" :class="navNum==1? 'active':''" data-toggle="dropdown">月报表</a>
                        <ul class="dropdown-menu">
                            <li v-if="userType==2" class="dropdown-item" @click="toPath('./siteList')">工地</li>
                            <!-- <li class="dropdown-item">添加条目</li> -->
                            <li class="dropdown-item" @click="toPath('./monthlyList')">月报表</li>
                        </ul>
                    </li>
                    <li class="nav-item d-flex-l ml-2 dropdown" v-if="userType==2">
                        <span class="nav-link dropdown-toggle" :class="navNum==2? 'active':''" data-toggle="dropdown">财务管理</span>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item" @click="toPath('./accounting')">总公司做账</li>
                            <li class="dropdown-item" @click="toPath('./reportForm')">项目报表情况</li>
                        </ul>
                    </li>
                    <li class="nav-item d-flex-l ml-2" v-if="userType==2">
                        <a class="nav-link" :class="navNum==3? 'active':''" @click="toPath('./user');">用户管理</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                nav:1,
                userData:null,
                userType:null
            }
        },
        name:'NavHeader',
        props:['navNum'],
        mounted(){
            this.userType=this.$getStr('userType');
        }
    }
</script>
<style>
    @media screen and (max-width:767px){
        #content .navbar-nav{
            flex-direction: column;
        }
        #content .nav-item{
            text-align: left;
        }
    } 
    .navbar-dark .navbar-nav .nav-link{
        color:rgba(255,255,255,0.8)
    }
    .active{
        color:#fff;
    }
    .nav-link{
        cursor: pointer;
    }
    @media screen and (max-width:767px){
        .dropdown-menu{
            background:transparent;
            border:none;
            padding:0;
        }
        .dropdown-item{
            color:#fff;
        }
    } 
</style>