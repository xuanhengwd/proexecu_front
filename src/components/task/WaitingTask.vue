<template>
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


      <el-table-column
          label="操作">
        <template v-slot="scope">
          <el-row>
            <el-button type="primary" @click="agreeTask(scope.$index,scope.row)">同意</el-button>

            <el-button type="danger" @click="refuseTask(scope.$index, scope.row)">拒绝</el-button>
          </el-row>
        </template>
      </el-table-column>

    </el-table>
  </div>

<!--  &lt;!&ndash;  分页条&ndash;&gt;-->
<!--  <div>-->
<!--    <el-pagination-->
<!--        background-->
<!--        layout="prev, pager, next"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :current-page="currentPage"-->
<!--        :page-size="5"-->
<!--        :total="totalCount">-->
<!--    </el-pagination>-->
<!--  </div>-->
</template>

<script>
import axios from "axios";
import {localGet} from "@/utils";

export default {
  name: "WaitingTask",
  data(){
    return{
      tableData: [{
        pro_name: '',
        funds_name: '',
        applicant_name: '',
        pro_principal_name:'',
        dept_principal_name:'',
        app_date: '',
        state: '',
        apply_reason:'',
        budget: '',

      },],

      info:{
        pro_name:'',
      },
      currentPage: 1,
      pageCount: 5,
      totalCount: 5
    }
  },

  mounted() {
    //this.selectAll();
    this.selectAll();
    //this.getCount();
  },
  methods:{
    selectAll() {

      const _this = this
      const token = localGet(`token`)
      const userId = token.id;
      axios({
        method: "post",
        url: "/task/getTask",
        params: {
          userId
        }
      }).then(function (resp) {
        _this.tableData = resp.data;
      })
    },

    agreeTask(index,row){
      const _this = this
      const token = localGet(`token`)
      const userId = token.id;
      const flag = 1
      axios({
        method: "post",
        url: "/task/completeTask",
        params: {
          userId:userId,
          proId:row.id,
          flag:flag

        }
      }).then(function (resp) {
        if("success"===resp.data){
          _this.selectAll();
          _this.$message({
            message: '恭喜你，审核成功！',
            type: 'success'
          });
        }else {
          _this.$message({
            message: '审核失败！',
            type: 'error'
          });
        }
      })


    },
    refuseTask(){},


    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectByCondition();
    },

    handleSelectionChange(){}


  },
}
</script>

<style scoped>

</style>