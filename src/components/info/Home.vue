<template>


  <el-card class="box-card" style="width: 100%" shadow="never">
    <template #header>
      <div class="clearfix">
        <span>快速入口</span>
      </div>
    </template>
    <div class="text item">
      <el-button type="primary" @click="DeclareInfo" style="width: 120px;height: 50px">采购信息</el-button>
      <el-button type="primary" @click="ProjectInfos" style="width: 120px;height: 50px">中标信息</el-button>
      <el-button type="primary" @click="getContractList" style="width: 120px;height: 50px">合同填写</el-button>
      <el-button type="primary" @click="getContractText" style="width: 120px;height: 50px">合同上传</el-button>
      <el-button type="primary" @click="getContractRev" style="width: 120px;height: 50px">验收申请</el-button>
    </div>
  </el-card>


  <el-tabs type="border-card" style="width: 100%;height: 60% ;margin-top: 15px">

    <el-tab-pane label="待办任务">

      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="pro_no"
            label="项目名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="bus_type"
            label="业务类型"
            width="180">
        </el-table-column>
        <el-table-column
            prop="audit_time"
            label="更新时间">
        </el-table-column>

        <el-table-column
            prop="audit_process"
            label="进度">
        </el-table-column>
        <el-table-column
            label="操作">
          <template v-slot="scope">
            <el-row>
              <el-button type="primary" @click="updateById(scope.$index,scope.row)">详情</el-button>
            </el-row>
          </template>
        </el-table-column>

      </el-table>

    </el-tab-pane>

    <el-tab-pane label="在办任务">在办任务</el-tab-pane>

  </el-tabs>


  <div></div>

</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      tableData: [{
        pro_no: '电脑采购',
        bus_type: '招标审核',
        audit_time: '2022-05-22',
        audit_process:"未审"
      }, {
        pro_no: '键盘采购',
        bus_type: '合同审核',
        audit_time: '2022-05-22',
        audit_process:"未审"
      }, {
        pro_no: '鼠标采购',
        bus_type: '验收审核',
        audit_time: '2022-05-22',
        audit_process:"未审"
      }, {
        pro_no: '显示器采购',
        bus_type: '招标审核',
        audit_time: '2022-05-22',
        audit_process:"未审"
      }]
    }
  },
  methods:{
    DeclareInfo(){
      this.$router.push({name: 'Declare'});
    },
    ProjectInfos(){
      this.$router.push({name: 'ProjectInfo'});
    },
    getContractList(){
      this.$router.push({name: 'ContractList'});
    },
    getContractText(){
      this.$router.push({name: 'ContractText'});
    },
    getContractRev(){
      this.$router.push({name: 'ContractRev'});
    },

  }
}
</script>

<style scoped>

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}

</style>