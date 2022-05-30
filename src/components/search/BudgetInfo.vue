<template>
  <!--搜索框和按钮-->
  <el-form :inline="true" :model="info" class="demo-form-inline">
    <el-form-item label="经费名称">
      <el-input v-model="info.funds_name" placeholder="经费名称"></el-input>
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
        style="width: 100%">
      <el-table-column
          type="index"
          width="50">
      </el-table-column>

      <el-table-column
          prop="funds_no"
          label="经费编号">
      </el-table-column>
      <el-table-column
          prop="funds_name"
          label="经费名称">
      </el-table-column>
      <el-table-column
          prop="funds_type"
          label="经费类别">
      </el-table-column>
      <el-table-column
          prop="applicant_name"
          label="申请人">
      </el-table-column>
      <el-table-column
          prop="budget_price"
          label="预算金额">
      </el-table-column>
      <el-table-column
          prop="tra_price"
          label="成交金额">
      </el-table-column>
      <el-table-column
          prop="app_price"
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
import axios from "axios";

export default {
  name: "BudgetInfo",
  data() {
    return {
      tableData: [{
        funds_no: '',
        funds_name: '',
        funds_type:'',
        applicant_no: '',
        applicant_name: '',
        budget_price: '',
        tra_price: '',
        app_price: '',
      },],

      info: {
        funds_name: '',
      },
      currentPage: 1,
      pageCount: 5,
      totalCount: 5
    }
  },

  mounted() {
    this.selectAll()
  },
  methods:{
    selectAll() {

      const _this = this;
      axios({
        method: "get",
        url: "/budget/selectAll",

      }).then(function (resp) {
       // console.log(resp.data)
        _this.tableData = resp.data;
        console.log(_this.tableData)
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectByCondition();
    },

  }
}
</script>

<style scoped>

</style>