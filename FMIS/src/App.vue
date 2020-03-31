<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height:100vh;
  width:100vw;
  background:#F5F8FA;
}
.el-table th,.el-table tr{
  background:#F5F8FA!important;
}
.bg-blue{
  background:mediumturquoise;
}

@media screen and (min-width:992px) {
  .d-flex-l{
    display: flex;
    align-items: center;
  }
  .form{
            width:70%;
            padding:1% 5%;
  }
}
.form{
        margin:0 auto;
    }

    @media screen and (max-width:991px){
        .form{
            padding-right:10px;
            padding-left:10px;
        }
        .el-form-item__label{
            padding-right:5px;
        }
        .form-md{
          width:80%;
        }
        .page-md{
          margin-right:60px;
        }
    }

    @media screen and (max-width:767px){
        .form{
            padding-right:10px;
        }
        .el-form-item__label{
            padding-right:8px;
        }
        .form-sm{
          width:90%;
          margin-top:100px;
        }
        .login{
          margin-top:20px;
        }
        .page-sm{
          width:88%;
          margin-left:auto;
          margin-right:auto;
        }
        .form-mt-sm{
          margin-top:50px;
        }
        .mt-sm-5{
          margin-top:25px;
        }
    }
.text-blue{
  color:#007ACC;
}
html,body,table,.el-table,.el-table th, .el-table tr{
  background:#F5F8FA;
}
.flex-center{
  justify-content: center;
}
.title{
  color:#007ACC;
  font-weight: 600;
  font-size:16px;
  text-align: left;
  padding:15px 30px;
}
/* 分页 */
.page-itm>i,.page-itm>span{
        border:1px solid #DCDFE6;
        /* margin-left:2px; */
        padding:6px;
        background: #fff;
        border-radius:3px;
    }
    .page-itm>span{
        padding:6px 10px;
    }
    .page>div:nth-child(3){
        width: 80px;
    }
    .page{
        height:32px;
        font-size: 14px;
        align-items: center;
    }
    .page .el-input__inner{
        height:31px;
    }
    .page input.ml-2{
        width:29px;
        height:29px;
        border:#DCDFE6 1px solid;
        border-radius:3px;
        outline: none;
    }
    .page .el-input__icon{
        line-height: 31px;
    }
    .page .el-input--suffix .el-input__inner{
        padding-right:5px;
        padding-left:5px;
    }
    .page div,.page span,.page .el-input{
        font-size:12px;
    }
  /* 分页 */
</style>
