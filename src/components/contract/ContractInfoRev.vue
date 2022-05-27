<template>

  <el-form :inline="true" :model="info" class="demo-form-inline">
    <el-form-item label="项目名称">
      <el-input v-model="info.pro_name" placeholder="项目名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="selectByCondition">查询</el-button>
    </el-form-item>
  </el-form>

  <el-dialog
      title="合同信息"
      v-model="dialogVisible"
      width="50%"
      :before-close="handleClose">

    <!--表单数据-->
    <el-form
        :inline="true"
        :model="contract"
        class="demo-form-inline"
        :label-position="left"
        :label-width="100"
        :disabled="true"
    >


      <el-form-item label="标名称">
        <el-input v-model="contract.packageName" placeholder="标名称"></el-input>
      </el-form-item>

      <el-form-item label="保修期限">
        <el-input v-model="contract.baoxqx" placeholder="xx年">
          <template v-slot:append>年</template>
        </el-input>
      </el-form-item>

      <el-form-item label="合同金额">
        <el-input v-model="contract.amount" placeholder="元">
          <template v-slot:append>元</template>
        </el-input>
      </el-form-item>

      <el-form-item label="交货日期">
        <el-input v-model="contract.jiaohrq" placeholder="xxxx-xx-xx"></el-input>
      </el-form-item>
      <el-form-item label="甲方">
        <el-input v-model="contract.jiaf" placeholder="甲方"></el-input>
      </el-form-item>
      <el-form-item label="甲方电话">
        <el-input v-model="contract.tel_jiaf" placeholder="甲方电话"></el-input>
      </el-form-item>


      <el-form-item label="乙方">
        <el-input v-model="contract.yif" placeholder="乙方"></el-input>
      </el-form-item>
      <el-form-item label="乙方电话">
        <el-input v-model="contract.tel_yif" placeholder="乙方电话"></el-input>
      </el-form-item>

      <el-form-item label="丙方">
        <el-input v-model="contract.bingf" placeholder="丙方"></el-input>
      </el-form-item>

      <el-form-item label="丙方电话">
        <el-input v-model="contract.tel_bingf" placeholder="丙方电话"></el-input>
      </el-form-item>


      <!--      <el-form-item label="经办日前" >-->
      <!--        <el-input v-model="contract.jbrq" placeholder="xxxx-xx-xx"></el-input>-->
      <!--      </el-form-item>-->

      <!--      <br>-->
      <!--      <el-form-item>-->
      <!--        <el-button type="primary" @click="agreeTask()">同意</el-button>-->
      <!--        <el-button @click="dialogVisible = false">拒绝</el-button>-->
      <!--      </el-form-item>-->

    </el-form>


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
          width="200"
      >
        <template v-slot="scope">
          <el-row>
            <el-button type="primary" @click="review(scope.$index,scope.row)">审批</el-button>
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
  name: "ContractInfoRev",

  data() {
    return {
      dialogVisible: false,
      tableData: [{
        contract_name: '',
        pro_name: '',
        applicant: '',
        dept_name: '',
        id: '',
        packageName: '',
        baoxqx: '',
        amount: '',
        jiaohrq: '',
        jiaf: '',
        yif: '',
        bingf: '',
        tel_jiaf: '',
        tel_yif: '',
        tel_bingf: '',
        jbrq: '',
      },],
      contract: {
        id: '',
        packageName: '',
        baoxqx: '',
        amount: '',
        jiaohrq: '',
        jiaf: '',
        yif: '',
        bingf: '',
        tel_jiaf: '',
        tel_yif: '',
        tel_bingf: '',
        jbrq: '',
      },

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
        url: "/contract/getTask",
        params: {
          userId
        }
      }).then(function (resp) {
        _this.tableData = resp.data;
      })
    },


    review(index, row) {
      this.contract = row
      this.dialogVisible = true

    },
    agreeTask() {
      const _this = this
      const token = localGet(`token`)
      const userId = token.id;
      const flag = 1
      axios({
        method: "post",
        url: "/contract/completeTask",
        params: {
          userId: userId,
          contractId: this.contract.id,
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