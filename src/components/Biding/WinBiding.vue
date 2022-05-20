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
          prop="budget"
          label="申报金额">
      </el-table-column>
      <el-table-column
          prop="bid_price"
          label="中标金额">
      </el-table-column>
      <el-table-column
          prop="bid_winner"
          label="中标方">
      </el-table-column>

      <el-table-column
          prop="bid_date"
          label="中标日期"
          width="110"
      >
      </el-table-column>
      <el-table-column
          prop="bid_linkman"
          label="标方联系人">
      </el-table-column>

      <el-table-column
          prop="bid_tel"
          label="联系电话"
          width="150"
      >
      </el-table-column>
      <el-table-column
          prop="bid_reason"
          label="中标原因">
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
  name: "WinBiding",
  data() {
    return {
      tableData: [{
        pro_name: '',

        bid_price: '',
        bid_winner:'',
        bid_date:'',
        bid_linkman: '',
        bid_tel: '',
        bid_reason:'',
        budget:'',
        pro_principal_name:'',
        dept_principal_name:''

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
        url: "/projectInfo/getTask",
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
        url: "/projectInfo/completeTask",
        params: {
          userId:userId,
          projectInfoId:row.id,
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

    handleSelectionChange() {
    }


  }
}
</script>

<style scoped>

</style>