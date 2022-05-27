<template>
  <el-row>
    <el-col>
      <h3 class="mb-2">导航</h3>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo">


        <el-menu-item @click="returnHome">
          <template #title>
            <el-icon>
              <house/>
            </el-icon>
            <span @click="returnHome">返回首页</span>
          </template>
        </el-menu-item>


        <el-sub-menu index="1">
          <template #title>
            <el-icon><Calendar /></el-icon>
            <span>任务中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="processingTask">在办任务</el-menu-item>
            <el-menu-item index="1-2" @click="waitingTask">待办任务</el-menu-item>
            <el-menu-item index="1-3" >已办任务</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>


        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>基础信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="menu">菜单管理</el-menu-item>
            <el-menu-item index="2-2" @click="role">角色管理</el-menu-item>
            <el-menu-item index="2-3" @click="user">用户管理</el-menu-item>
            <el-menu-item index="2-4" @click="dept">部门管理</el-menu-item>
            <el-menu-item index="2-5" @click="locations">地点管理</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>


        <el-sub-menu index="3" :disabled="false">
          <template #title>
            <el-icon>
              <list/>
            </el-icon>
            <span>招标模块</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="DeclareInfo">采购信息</el-menu-item>
            <el-menu-item index="3-2" @click="getBiding">采购信息审核</el-menu-item>
            <el-menu-item index="3-3" @click="ProjectInfos">中标信息</el-menu-item>
            <el-menu-item index="3-4" @click="getWinBiding">中标审核</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <edit-pen/>
            </el-icon>
            <span>合同签订</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="getContractList">合同信息填写</el-menu-item>
            <el-menu-item index="4-2" @click="getContractInfoRev">合同信息审核</el-menu-item>
            <el-menu-item index="4-3" @click="getContractText">合同上传</el-menu-item>
            <el-menu-item index="4-4">合同审核</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="5">
          <template #title>
            <el-icon>
              <stamp/>
            </el-icon>
            <span>验收模块</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" @click="Getcheck">验收申请</el-menu-item>
            <el-menu-item index="5-1" @click="Getcheck">验收审核</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="6">
          <template #title>
            <el-icon>
              <search/>
            </el-icon>
            <span>查询统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1">进度查询</el-menu-item>
          </el-menu-item-group>

          <el-sub-menu index="6-2">
            <template #title>表单查询</template>
            <el-menu-item index="6-2-1">经费预算表</el-menu-item>
            <el-menu-item index="6-2-2">采购申报表</el-menu-item>
            <el-menu-item index="6-2-3">项目信息表</el-menu-item>
            <el-menu-item index="6-2-4">合同表</el-menu-item>
          </el-sub-menu>

        </el-sub-menu>

        <el-sub-menu index="7">
          <template #title>
            <el-icon>
              <setting/>
            </el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="7-1" @click="toFlow">流程管理</el-menu-item>
            <el-menu-item index="7-2">表单管理</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Catalogue",
  methods: {

    processingTask(){
      this.$router.push({name: 'ProcessingTask'});
    },


    waitingTask(){
      //this.$router.push({name: 'WaitingTask'});
    },


    openMenu(key, keyPath){
        console.log(key,keyPath)
    },

    returnHome() {
      this.$router.push({name: 'Home'});
    },
    menu() {
      console.log("candan");
      this.$router.push({name: 'Menu'});

    },
    role() {
      this.$router.push({name: 'Role'});
    },
    dept() {
      this.$router.push({name: 'Dept'});
    },
    user() {
      this.$router.push({name: 'User'});
    },
    locations(){
      this.$router.push({name: 'Locations'});
    },
    toFlow(){
      this.$router.push({name: 'Flow'});
    },
    DeclareInfo(){
      this.$router.push({name: 'Declare'});
    },

    ProjectInfos(){
      this.$router.push({name: 'ProjectInfo'});
    },

    Getcheck(){
      this.$router.push({name: 'CheckInfo'});
    },

    getBiding(){
      this.$router.push({name: 'BiddingReview'});
    },
    getWinBiding(){
      this.$router.push({name: 'WinBiding'});
    },
    getContractList(){
      this.$router.push({name: 'ContractList'});
    },
    getContractInfoRev(){
      this.$router.push({name: 'ContractInfoRev'});
    },
    getContractText(){
      this.$router.push({name: 'ContractText'});
    },


    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },


  }
}
</script>

<style scoped>

</style>