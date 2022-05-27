<template>

  <el-row>
    <el-button type="primary"  @click="selectAll">刷新
      <el-icon><Refresh /></el-icon>
    </el-button>
  </el-row>
  <!--展示表格-->
  <div style="height: 50%">
    <el-table
        :data="tableData"
        stripe
        style="width: 100%"
    >
      <el-table-column
          type="index"
          width="50">
      </el-table-column>


      <el-table-column
          prop="pro_name"
          label="项目名称">
      </el-table-column>
      <el-table-column
          prop="bus_typeStr"
          label="业务类型">
      </el-table-column>
      <el-table-column
          prop="audit_date"
          label="更新时间">
      </el-table-column>
      <el-table-column
          prop="audit_processStr"
          label="进度">
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          width="200"
      >
        <el-row>
          <el-button type="primary" @click="getInfo">详情</el-button>
        </el-row>
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
  name: "ProcessingTask",
  data() {
    return {
      tableData: [{
        pro_name: '',
        bus_type: '',
        audit_date: '',
        audit_process: '',

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
    this.selectAll();
  },
  methods: {

    selectAll() {
      const _this = this
      const token = localGet(`token`)
      const userId = token.id;
      axios({
        method: "post",
        url: "/task/getProcessingTask",
        params: {
          id:userId
        }
      }).then(function (resp) {
        _this.tableData = resp.data;
      })
    },


    getInfo() {
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