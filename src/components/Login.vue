<template>

  <div class="login-wrap">
    <div class="ms-title">采购执行系统-欢迎登录</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
        <!--        <div v-if="errorInfo" style="margin-bottom: 5px;">-->
        <!--          <span>{{errInfo}}</span>-->
        <!--        </div>-->
        <el-form-item prop="username" label="用户名">
          <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="validate" label="验证码">
          <el-input v-model="ruleForm.validate" class="validate-code" placeholder="验证码"></el-input>
          <div class="code" @click="refreshCode">
            <check-code :identify-code="identifyCode"></check-code>
          </div>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="login">登录</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import qs from 'qs'
import {localSet} from "@/utils";
import CheckCode from "@/components/CheckCode";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components:{
    // eslint-disable-next-line vue/no-unused-components
    CheckCode
  },

  data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      errorInfo: false,
      ruleForm: {
        username: '',
        password: '',
        validate: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        validate: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    login() {

      var _this = this;
      axios({
        method: "post",
        url: "/user/login",
        params: {
          username: this.ruleForm.username,
          password: this.ruleForm.password
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
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
      }
      //console.log(this.identifyCode);
    },

  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;

}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  height: 240px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}

.ms-login span {
  color: red;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

.code {
  width: 112px;
  height: 35px;
  border: 1px solid #ccc;
  float: right;
  border-radius: 2px;
}

.validate-code {
  width: 136px;
  float: left;
}


</style>