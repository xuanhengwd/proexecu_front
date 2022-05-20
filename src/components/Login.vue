<template>

  <div style="padding-top: 150px;">
    <el-card class="box-card" style="margin: auto;">
      <template #header>
        <div class="card-header">
          <span><h1>用户登录</h1></span>
          <span><h2>采购执行系统</h2></span>
        </div>
      </template>
      <div class="text item">
        <div class="login-wrap">
          <el-form class="login-container" label-width="70px">

            <el-form-item label="用户名：">
              <!--            用户名：<el-input type="text" v-model="username" ></el-input>-->
              <el-input placeholder="请输入用户名" type="text" v-model="username" show-text></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <!--            密码：<el-input type="password" v-model="password"></el-input>-->
              <el-input placeholder="请输入密码" type="password" v-model="password" show-password></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" style="margin-left:120px" @click="login()">登录</el-button>
            </el-form-item>
            <el-row style="margin-top: -10px;">
              <el-link type="primary">忘记密码</el-link>

              <el-link type="primary" @click="doRegister()" style="margin-left: 10px">用户注册</el-link>
            </el-row>
          </el-form>
        </div>

      </div>
    </el-card>
  </div>
</template>

<script>

import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import qs from 'qs'
import {localSet} from "@/utils";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",

  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {

      var _this = this;
      axios({
        method: "post",
        url: "/user/login",
        params: {
          username: this.username,
          password: this.password
        }
      }).then(function (resp) {
        let flag = resp.data;
        if (flag !== "") {
          const date=Date.now();
          console.log(date);
          localSet('startTime',date);
          localSet('token', resp.data);
          _this.$message({
            message: '恭喜你，登录成功！',
            type: 'success'
          });
          _this.$router.push({name: 'Layout2'});
        } else {
          _this.$message.error('用户名或密码错误！');
        }
      })

      //this.$router.push({name:'Layout2'});
    },
    doRegister() {
      this.$router.push({name: 'Register'});
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