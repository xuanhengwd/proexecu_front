<template>
  <el-form :inline="true" :model="info" class="demo-form-inline">
    <el-form-item label="项目名称">
      <el-input v-model="info.pro_name" placeholder="项目名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="selectAll">查询</el-button>
    </el-form-item>
  </el-form>


  <!--展示表格-->
  <div style="height: 50%">
    <el-table
        :data="tableData"
        stripe
        style="width: 100%"

        @selection-change="handleSelectionChange">
      <el-table-column
          type="index"
          width="50">
      </el-table-column>

      <el-table-column
          prop="pro_name"
          label="项目名称">
      </el-table-column>


      <el-table-column
          prop="applicant_name"
          label="申请人">
      </el-table-column>
      <el-table-column
          prop="pro_principal_name"
          label="项目负责人">
      </el-table-column>
      <el-table-column
          prop="dept_principal_name"
          label="部门负责人">
      </el-table-column>
      <el-table-column
          prop="app_date"
          label="申请日期">
      </el-table-column>
      <el-table-column
          prop="stateStr"
          label="状态">
      </el-table-column>
      <el-table-column
          prop="apply_reason"
          label="申请理由">
      </el-table-column>
      <el-table-column
          prop="budget"
          label="申报金额">
      </el-table-column>

    </el-table>
  </div>


  <!--  分页条-->
  <div>
    <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="5"
        :total="totalCount">
    </el-pagination>
  </div>
</template>
<script>
import {localGet} from "@/utils";
import axios from "axios";

export default {
  name: "DeclareInfo",
  data() {
    return {
      tableData: [{
        pro_no: '',
        pro_name: '',
        funds_name: '',
        applicant_name: '',
        pro_principal_name: '',
        dept_principal_name: '',
        app_date: '',
        state: '',
        apply_reason: '',
        budget: '',

      },],

      info: {
        pro_name: '',
      },
      currentPage: 1,
      pageCount: 5,
      totalCount: 5
    }
  },
  mounted() {
    this.selectAll()
  },

  methods: {
    selectAll() {
      const _this = this;
      axios({
        method: "get",
        url: "/proDeclare/selectAll",

      }).then(function (resp) {
        _this.tableData = resp.data;
      })
    },


    handleSelectionChange() {
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectByCondition();
    },



  },

}
</script>

<style scoped>

</style>