<template>
    <div class='login_box'>
        <h1>CRM管理系统</h1>
        <div class="content">
            <el-input v-model="name" placeholder="请输入用户名">
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
            <el-input v-model="psw" placeholder="请输入密码" show-password>
                <i slot="prefix" class="el-input__icon el-icon-tickets"></i>
            </el-input>
            <el-button type="primary">主要按钮</el-button>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
export default {
    name: 'login',// 不能是已经存在的html标签
    data() {
        return {
            name:'',
            psw:''
        }
    },
    components: {
        
    }
}
</script>
<style lang="less">
    .login_box{
        width: 100%;
        height: 100%;
        background: #eee;
        .content{
            width: 500px;
            // height: 300px;
            margin: 50px auto;
            padding-top: 30px;
            background: #fff;
            .el-input{
                width: 60%;
                margin: 30px auto 0;
                display: block;
            }
            button{
                margin: 30px;
            }
        }
    }
</style>