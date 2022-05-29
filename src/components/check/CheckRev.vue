<template>

    <el-form :inline="true" :model="info" class="demo-form-inline">
      <el-form-item label="项目名称">
        <el-input v-model="info.pro_name" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>


    <el-dialog
        title="合同信息"
        v-model="dialogVisible"
        width="50%"
        :before-close="handleClose">

      <!--表单数据-->
      <el-form ref="form" :model="contractList" label-width="80px" :disabled="true">


        <el-form-item label="型号">
          <el-input v-model="contractList.model"></el-input>
        </el-form-item>

        <el-form-item label="数量">
          <el-input v-model="contractList.all_count"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="contractList.priceCNY">
            <template v-slot:append>元</template>
          </el-input>
        </el-form-item>

        <el-form-item label="总价">
          <el-input v-model="contractList.total_price">
            <template v-slot:append>元</template>
          </el-input>
        </el-form-item>

        <el-form-item label="供货商">
          <el-input v-model="contractList.gonghuoshang"></el-input>
        </el-form-item>


        <el-form-item label="备注">
          <el-input type="textarea" v-model="contractList.beizhu"></el-input>
        </el-form-item>


      </el-form>

      <img :src="imgUrl" alt="" height="200" width="200">
      <template #footer>
          <span class="dialog-footer">

          <el-button type="primary" @click="agreeTask">同意</el-button>

            <el-button type="danger" @click="dialogVisible = false">拒绝</el-button>
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
            prop="contract_name"
            label="合同名称">
        </el-table-column>
        <el-table-column
            prop="pro_name"
            label="项目名称">
        </el-table-column>
        <el-table-column
            prop="applicant"
            label="申请人">
        </el-table-column>
        <el-table-column
            prop="dept_name"
            label="部门名称">
        </el-table-column>


        <el-table-column
            fixed="right"
            label="操作"
            width="300"
        >
          <template v-slot="scope">
            <el-row>
              <el-button type="primary"  @click="review(scope.$index,scope.row)">审批</el-button>
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
  name: "CheckRev",
  data() {
    return {

      imgUrl:'',
      dialogVisible: false,
      contractList: {
        id: "",
        model: '',
        all_count: '',
        priceCNY: '',
        total_price: '',
        gonghuoshang: '',
        beizhu: ''

      },
      tableData: [{
        contract_name: '',
        pro_name: '',
        applicant: '',
        dept_name: ''
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
        url: "/check/getTask",
        params: {
          userId
        }
      }).then(function (resp) {
        _this.tableData = resp.data;
      })
    },


    review(index, row) {
      this.contractList = row
      const _this = this
      //获取图片url
      axios({
        method:"post",
        url:"/check/getImgPath",
        params:{
          id:this.contractList.id
        }
      }).then(function (resp){
        //console.log(resp.data)
        _this.imgUrl=resp.data
      })
      this.dialogVisible = true

    },
    agreeTask() {
      const _this = this
      const token = localGet(`token`)
      const userId = token.id;
      const flag = 1
      axios({
        method: "post",
        url: "/check/completeTask",
        params: {
          userId: userId,
          contractListId: this.contractList.id,
          flag: flag

        }
      }).then(function (resp) {
        if ("success" === resp.data) {
          _this.selectAll();
          _this.dialogVisible=false
          _this.$message({
            message: '恭喜你，审核成功！',
            type: 'success'
          });
        } else {
          _this.$message({
            message: '审核失败！',
            type: 'error'
          });
        }
      })


    },
    refuseTask() {
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