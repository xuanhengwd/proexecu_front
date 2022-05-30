<template>

  <div style="height: 100%">
    <div style="display: flex">
    <!--  content="this is content, this is content, this is content"-->
    <!--  v-model:visible="visible"-->
    <h2 style="width: 90%; margin-top: 15px">采购执行系统</h2>
    <el-popover
        placement="bottom"
        title="个人信息:"
        :width="200"
        trigger="click"
    >

      <div align="center">
      <h4> 用户名：{{ user.userName }}</h4>
      <el-divider></el-divider>
      <h4>姓名：{{ user.name }}</h4>
      <el-divider></el-divider>
      <h4>所属部门：{{ user.deptName }}</h4>


        <el-button type="primary" round  @click="toUserInfo">个人信息</el-button>
      <el-button type="danger" round @click="signOut">退出系统</el-button>
      </div>


      <template #reference>
        <div style="width:10%;float: right">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="large"
                     @click="showUser"/>
        </div>
      </template>
    </el-popover>
    </div>
  </div>


</template>

<script>
import {localGet, localRemove} from "@/utils";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      user: {},
      // visible: false
    }
  },
  methods: {
    showUser() {
      this.user = localGet('token');
      console.log(this.user)
      // this.visible=!this.visible;
    },
    signOut(){
      localRemove('token');
      this.$router.push({path:'/login'});
    },

    toUserInfo(){
      this.$router.push({name: 'UserInfo'});
    }
  }
}
</script>

<style scoped>
.demo-type {
  display: flex;
}

.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

</style>