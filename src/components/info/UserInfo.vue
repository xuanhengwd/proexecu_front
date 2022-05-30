<template>
  <div style="width: 40%;margin-left: 20%">
  <el-form ref="form" :model="user" label-width="80px">

    <el-form-item label="姓名">
      <el-input v-model="user.name" ></el-input>
    </el-form-item>
    <el-form-item label="用户编号">
      <el-input v-model="user.userNo" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="用户名">
      <el-input v-model="user.userName" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="密码">
      <el-input v-model="user.password"></el-input>
    </el-form-item>


    <el-form-item label="电话">
      <el-input v-model="user.cellphone"></el-input>
    </el-form-item>

    <el-form-item label="邮箱">
      <el-input v-model="user.email"></el-input>
    </el-form-item>
    <el-form-item label="所在部门">
      <el-input v-model="user.deptName" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="update()">提交</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </el-form-item>
  </el-form>

  </div>
</template>

<script>
import {localGet} from "@/utils";

export default {
  name: "UserInfo",
  data(){
    return{
      user:{
        id:'',
        userNo:'',
        userName:'',
        password:'',
        name:'',
        sex:'',
        deptName:'',
        cellphone:'',
        email:''
      }
    }
  },

  mounted() {
    this.showInfo();
  },
  methods:{
    showInfo(){
      this.user = localGet('token');
      console.log(this.user)
      this.user.password=''
    }
  }

}
</script>

<style scoped>

</style>