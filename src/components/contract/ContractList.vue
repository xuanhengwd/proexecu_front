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
      title="填写信息"
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
    >


      <el-form-item label="标名称" >
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


      <br>
      <el-form-item>
        <el-button type="primary" @click="update()">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>

    </el-form>


    <!--    <template #footer>-->
    <!--      <span class="dialog-footer">-->
    <!--      <el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
    <!--      </span>-->
    <!--    </template>-->
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
            <el-button type="primary" @click="execute(scope.$index,scope.row)">申请</el-button>

            <el-button type="danger" @click="updateContract(scope.$index, scope.row)">填写信息</el-button>
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
  name: "ContractList",
  data() {
    return {
      dialogVisible: false,
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

      tableData: [{
        contract_name: '',
        pro_name: '',
        applicant: '',
        dept_name: '',
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
    this.selectByCondition();
  },
  methods: {
    selectByCondition() {

      const _this = this;
      const token = localGet(`token`)
      const userId = token.id;
      axios({
        method: "post",
        url: "/contract/selectContractByCondition",
        params: {
          pro_name: this.info.pro_name,
          curPage: this.currentPage,
          pageCount: this.pageCount,
          userId: userId

        }
      }).then(function (resp) {
        _this.tableData = resp.data;
      })
    },
    execute(index, row) {
      //console.log(row.id);

      const _this = this
      const token = localGet(`token`)
      const userId = token.id;
      //console.log(userId)
      axios({
        method: "post",
        url: "/contract/addApply",
        params: {
          userId : userId,
          contractId: row.id

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
    updateContract(index, row) {
      this.contract = row
      this.dialogVisible = true
    },
    update(){
      //console.log(this.contract)
      const _this = this;
      axios({
        method: "post",
        url: "/contract/updateById",
        params: this.contract
      }).then(function (resp) {

        if (resp.data === "success") {
          //修改成功
          _this.selectByCondition();
          _this.dialogVisible = false;
          _this.$message({
            message: '恭喜你，修改成功！',
            type: 'success'
          });
        }else {
          _this.$message({
            message: '修改失败！',
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