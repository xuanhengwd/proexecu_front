<template>



      <el-card class="box-card" style="margin: auto">
        <template #header>
          <div class="card-header">
            <span><h1>用户注册</h1></span>
          </div>
        </template>
        <div class="text item">
          <div class="login-wrap">
            <el-form class="login-container" label-width="80px" >

              <el-form-item label="用户名：">
                <el-input placeholder="请输入用户名" type="text" v-model="user.username" show-text></el-input>
              </el-form-item>
              <el-form-item label="密码：">
                <el-input placeholder="请输入密码" type="password" v-model="user.password" show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码：">
                <el-input placeholder="请再次输入密码" type="password" v-model="rePassword" show-password></el-input>
              </el-form-item>

              <el-form-item label="名称：">
                <el-input placeholder="请输入名称" type="text" v-model="user.name" show-text></el-input>
              </el-form-item>
              <el-form-item label="生日：">
                <el-input
                    placeholder="请选择日期"
                    suffix-icon="el-icon-date"
                    v-model="user.birthday">
                </el-input>
<!--                <el-input placeholder="请输入生日" type="date" v-model="user.birthday" show-text></el-input>-->
              </el-form-item>
              <el-form-item label="性别：">
                <el-radio v-model="user.sex" label="1">男</el-radio>
                <el-radio v-model="user.sex" label="2">女</el-radio>
              </el-form-item>
              <el-form-item label="部门编号：">
                <el-input placeholder="请输入部门编号" type="text" v-model="user.deptNo" show-text></el-input>
              </el-form-item>
              <el-form-item label="部门名称：">
                <el-input placeholder="请输入部门名称" type="text" v-model="user.deptName" show-text></el-input>
              </el-form-item>
              <el-form-item label="电话：">
                <el-input placeholder="请输入电话" type="text" v-model="user.cellphone" show-text></el-input>
              </el-form-item>

              <el-form-item label="邮箱：">
                <el-input placeholder="请输入邮箱" type="text" v-model="user.email" show-text></el-input>
              </el-form-item>


              <el-form-item>
                <el-button type="primary" style="margin-left:120px" @click="doRegister()">注册</el-button>
              </el-form-item>

              <el-row style="margin-top: -10px;">
                <el-link type="primary" @click="doReturn">返回登录</el-link>
              </el-row>
            </el-form>
          </div>

        </div>
      </el-card>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    return{
      rePassword:'',
      user:{
        username:'',
        password:'',
        name:'',
        birthday:'',
        sex:'',
        deptNo:'',
        deptName:'',
        cellphone:'',
        email:''
      },


    }
  },
  methods: {
    doReturn(){
      this.$router.push({name:'Login'});
    },
    doRegister(){
      console.log(this.user.email)
    }

  }

}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

</style>