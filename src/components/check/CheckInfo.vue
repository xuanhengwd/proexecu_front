<template>
  <!--搜索框和按钮-->
  <el-form :inline="true" :model="info" class="demo-form-inline">
    <el-form-item label="项目名称">
      <el-input v-model="info.pro_name" placeholder="采购名称"></el-input>
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
    <el-form ref="form" :model="contractList" label-width="80px">

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

      <!--      <el-form-item>-->
      <!--        <el-button type="primary" @click="update()">提交</el-button>-->
      <!--        <el-button @click="dialogVisible = false">取消</el-button>-->
      <!--      </el-form-item>-->
    </el-form>

    <!--    上传图片-->
    <el-upload
        action="http://localhost:8080/check/uploadImg"
        list-type="picture-card"
        :data="{id:contractList.id}"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
      <el-icon>
        <Plus/>
      </el-icon>
    </el-upload>
    <el-dialog v-model="dialogVisible1">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <template #footer>
      <span class="dialog-footer">
           <el-button type="primary" @click="update()">提交</el-button>
    <el-button @click="dialogVisible = false">取消</el-button>
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
import {localGet} from "@/utils";
import axios from "axios";

export default {
  name: "CheckInfo",
  data() {
    return {
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      dialogVisible: false,
      dialogImageUrl: '',
      dialogVisible1: false,
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
    this.selectByCondition()
  },
  methods: {

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file.url)
      this.dialogImageUrl = file.url;
      this.dialogVisible1 = true;
    },
    selectByCondition() {

      const _this = this;
      const token = localGet(`token`)
      const userId = token.id;
      axios({
        method: "post",
        url: "/check/selectContractByCondition",
        params: {
          pro_name: this.info.pro_name,
          curPage: this.currentPage,
          pageCount: this.pageCount,
          userId: userId
        }
      }).then(function (resp) {
        console.log(resp.data)
        _this.tableData = resp.data;
      })
    },

    execute(index, row) {

      const _this = this
      const token = localGet(`token`)
      const userId = token.id;
      //console.log(userId)
      axios({
        method: "post",
        url: "/check/addApply",
        params: {
          userId: userId,
          contractListId: row.id

        }
      }).then(function (resp) {
        if ("success" === resp.data) {

          _this.selectByCondition()
          _this.$message({
            message: '恭喜你，申请成功！',
            type: 'success'
          })

        } else if ("empty" === resp.data) {
          _this.$message({
            message: '请填写信息！',
            type: 'error'
          })
        } else {
          _this.$message({
            message: '请勿重复申请！',
            type: 'error'
          })
        }
      })

    },

    updateInfo(index, row) {
      this.contractList = row
      this.dialogVisible = true

    },

    update() {
      const _this = this;
      axios({
        method: "post",
        url: "/check/updateContractList",
        params: this.contractList
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

    handleSelectionChange() {
    },
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

  }
}
</script>

<style scoped>

</style>