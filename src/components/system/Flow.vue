<template>

  <!--搜索框和按钮-->
  <el-form :inline="true" :model="info" class="demo-form-inline">
    <el-form-item label="流程名称">
      <el-input v-model="info.flowName" placeholder="流程名称"></el-input>
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
        style="width: 100%">

      <el-table-column
          type="index"
          width="50">
      </el-table-column>

      <el-table-column
          prop="flowName"
          label="流程名称"
      >
      </el-table-column>
      <el-table-column
          prop="stateStr"
          label="状态"
      >
      </el-table-column>

      <el-table-column
          label="操作"
          width="180"
          align="center"
      >
        <template v-slot="scope">

          <el-button
              @click="updateFlow(scope.$index,scope.row)"
              type="text"
              size="small">
            查看
          </el-button>

          <el-button
              @click="deleteFlow(scope.$index,scope.row)"
              type="text"
              size="small">
            禁用
          </el-button>

          <el-button

              @click="deployFlow(scope.$index,scope.row)"
              type="text"
              size="small">
            部署
          </el-button>

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
        :page-size="8"
        :total="totalCount">
    </el-pagination>
  </div>

</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Flow",
  data() {
    return {


      flow: {
        id: '',
        flowName: '',
        flowKey: '',
        filepath: '',
        state: ''
      },
      info: {
        flowName: '',
      },

      tableData: [{
        flowName: '',
        state: '',
      },],


      currentPage: 1,
      pageCount: 5,
      totalCount: 5
    }
  },

  mounted() {
    //this.selectAll();
    this.selectByCondition();
    //this.getCount();
  },
  methods: {
    //部署流程
    deployFlow(index, row) {
      console.log(row.id)

      const _this= this;
      axios({
        method:"post",
        url: "/event/deployFlow",
        params:{
          id: row.id
        }
      }).then(function (resp){
        console.log(resp);

        _this.info.flowName='';
        _this.selectByCondition();

        if("success"===resp.data){
          _this.$message({
            message: '恭喜你，部署成功！',
            type: 'success'
          });
        }else {
          _this.$message({
            message: '部署失败',
            type: 'error'
          });
        }

      })
    },
    updateFlow(index, row){},

    deleteFlow(index, row){
      const _this=this;
      axios({
        method:"post",
        url:"/event/deleteFlow",
        params:{
          id : row.id
        }
      }).then(function (resp){
        _this.info.flowName='';
        _this.selectByCondition();
        console.log(resp);
        if("success"===resp.data){
          _this.$message({
            message: '恭喜你，禁用成功！',
            type: 'success'
          });
        }else {
          _this.$message({
            message: '禁用失败',
            type: 'error'
          });
        }


      })
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectByCondition();
    },
    selectByCondition() {

      const _this = this;
      axios({
        method: "post",
        url: "/event/selectEventionByCondition",
        params: {
          flowName: this.info.flowName,
          curPage: this.currentPage,
          pageCount: this.pageCount

        }
      }).then(function (resp) {
        _this.tableData = resp.data;
      })
    }

  }
}
</script>

<style scoped>

</style>