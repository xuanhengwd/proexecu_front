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



  <!--修改数据对话框-->
  <el-dialog
      title="信息填写"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose">
    <!--表单-->
    <el-form ref="form" :model="projectInfo" label-width="80px">
      <el-form-item label="中标金额">
        <el-input v-model="projectInfo.bid_price">
          <template v-slot:append>元</template>

        </el-input>
      </el-form-item>

      <el-form-item label="中标方">
        <el-input v-model="projectInfo.bid_winner"></el-input>
      </el-form-item>
      <el-form-item label="中标日期">
        <el-input v-model="projectInfo.bid_date" placeholder="xxxx-xx-xx"></el-input>
      </el-form-item>
      <el-form-item label="中标联系人">
        <el-input v-model="projectInfo.bid_linkman"></el-input>
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input v-model="projectInfo.bid_tel"></el-input>
      </el-form-item>

      <el-form-item label="中标原因">
        <el-input type="textarea" v-model="projectInfo.bid_reason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update()">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>

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
          prop="budget"
          label="申报金额">
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
          label="操作"
          width="200"

      >
        <template v-slot="scope">
          <el-row>
            <el-button type="primary" @click="execute(scope.$index,scope.row)">申请</el-button>

            <el-button type="danger" @click="updateInfo(scope.$index, scope.row)">填写信息</el-button>
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
import axios from "axios";
import {localGet} from "@/utils";

export default {
  name: "ProjectInfo",
  data(){
    return{
      dialogVisible:false,

      projectInfo:{
        id:'',
        bid_price: '',
        bid_winner:'',
        bid_date:'',
        bid_linkman: '',
        bid_tel: '',
        bid_reason:'',
      },

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

      info:{
        pro_name:'',
      },
      currentPage: 1,
      pageCount: 5,
      totalCount: 5
    }
  },
  mounted() {
    this.selectByCondition()
  },
  methods:{
    selectByCondition() {

      const _this = this;
      const token = localGet(`token`)
      const userId = token.id;
      axios({
        method: "post",
        url: "/projectInfo/selectProjectInfoByCondition",
        params: {
          pro_name: this.info.pro_name,
          curPage: this.currentPage,
          pageCount: this.pageCount,
          userId:userId

        }
      }).then(function (resp) {
        _this.tableData = resp.data;
      })
    },

    execute(index,row){

      const _this = this
      const token = localGet(`token`)
      const userId = token.id;
      //console.log(userId)
      axios({
        method: "post",
        url: "/projectInfo/addApply",
        params: {
          userId : userId,
          projectInfoId: row.id

        }
      }).then(function (resp){
        if("success"===resp.data){

          _this.selectByCondition()
          _this.$message({
            message: '恭喜你，申请成功！',
            type: 'success'
          })

        }else if("empty"===resp.data){
          _this.$message({
            message: '请填写信息！',
            type: 'error'
          })
        }else {
          _this.$message({
            message: '请勿重复申请！',
            type: 'error'
          })
        }
      })

    },

    updateInfo(index,row){
      this.projectInfo=row
      this.dialogVisible=true

    },

    update(){
      const _this = this;
      axios({
        method: "post",
        url: "/projectInfo/updateProjectInfo",
        params: this.projectInfo
      }).then(function (resp) {

        if (resp.data === "success") {
          //修改成功
          _this.selectByCondition();
          _this.dialogVisible = false;
          _this.$message({
            message: '恭喜你，修改成功！',
            type: 'success'
          });
        }

      })
    },


    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectByCondition();
    },

    handleSelectionChange(){},
    //对话框表单的函数
    handleClose(done) {
      const _this = this
      this.$confirm('确认关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(_ => {
            _this.selectByCondition()
            done();
          })
          .catch(_ => {
          });
    },


  },

}
</script>

<style scoped>

</style>