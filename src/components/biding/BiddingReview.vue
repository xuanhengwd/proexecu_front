<template>
  <!--搜索框和按钮-->
  <el-form :inline="true" :model="info" class="demo-form-inline">
    <el-form-item label="项目名称">
      <el-input v-model="info.pro_name" placeholder="项目名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="selectByCondition">查询</el-button>
    </el-form-item>
  </el-form>


  <el-dialog
      title="理由"
      v-model="dialogVisible"
      width="50%"
      :before-close="handleClose">

    <!--表单数据-->
    <el-form
        :model="formPO"
        :label-position="left"
        label-width="80px"
    >

      <el-form-item label="拒绝理由">
        <el-input type="textarea" v-model="formPO.reason"></el-input>
      </el-form-item>

    </el-form>


    <template #footer>
          <span class="dialog-footer">

          <el-button type="primary" >确定</el-button>

            <el-button type="danger" @click="dialogVisible = false">取消</el-button>
          </span>
    </template>
  </el-dialog>

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


      <el-table-column
          fixed="right"
          label="操作"
          width="200"
      >
        <template v-slot="scope">
          <el-row>
            <el-button type="primary" @click="agreeTask(scope.$index,scope.row)">同意</el-button>

            <el-button type="danger" @click="refuseTask(scope.$index, scope.row)">拒绝</el-button>
          </el-row>
        </template>
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
  name: "BiddingReview",
  data() {
    return {
      dialogVisible:false,

      formPO:{
        reason:'',
      },
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
    this.selectAll();
  },
  methods: {
    selectAll() {

      const _this = this
      const token = localGet(`token`)
      const userId = token.id;
      axios({
        method: "post",
        url: "/proDeclare/getTask",
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
        url: "/proDeclare/completeTask",
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
    refuseTask(index,row){
      console.log(row.id)
      this.dialogVisible=true
    },


    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectByCondition();
    },

    handleSelectionChange() {
    },
    handleClose(done) {
      this.$confirm('确认关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },


  }

}
</script>

<style scoped>

</style>