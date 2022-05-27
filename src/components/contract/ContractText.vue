<template>
  <el-form :inline="true" :model="info" class="demo-form-inline">
    <el-form-item label="项目名称">
      <el-input v-model="info.pro_name" placeholder="项目名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="selectByCondition">查询</el-button>
    </el-form-item>
  </el-form>

  <el-row>
    <el-button type="primary" @click="downloadText">
      合同模板下载
      <el-icon class="el-icon--right"><Download /></el-icon>
    </el-button>
  </el-row>

  <el-dialog
      title="上传文件"
      v-model="dialogVisible1"
      width="30%"
      :before-close="handleClose">

    <div>

      <el-upload
          class="upload-demo"
          action="http://localhost:8080/contractText/uploadFile"
          :data="{id:contract.id}"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">只能上传word文件，且不超过30M</div>
        </template>
      </el-upload>

    </div>
    <template #footer>
        <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
    </template>
  </el-dialog>

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



    </el-form>


    <template #footer>
          <span class="dialog-footer">

            <el-button type="danger" @click="dialogVisible = false">关闭</el-button>
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
            <el-button type="primary" @click="getInfo(scope.$index,scope.row)">详情</el-button>

            <el-button type="primary" @click="uploadText(scope.$index,scope.row)">上传</el-button>
            <el-button type="primary" @click="uploadText(scope.$index,scope.row)">申请</el-button>
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
  name: "ContractText",
  data() {
    return {
      dialogVisible1:false,
      dialogVisible: false,
      uploadUrl:'http://localhost:8080/contractText/uploadFile',
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

    //模板下载
    downloadText(){
      const a = document.createElement("a"); //创建一个<a></a>标签
      a.href = "/static/合同模板.doc"; // 给a标签的href属性值加上地址，注意，这里是绝对路径，不用加 点.
      a.download = "合同模板.doc"; //设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
      a.style.display = "none"; // 障眼法藏起来a标签
      document.body.appendChild(a); // 将a标签追加到文档对象中
      a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
      a.remove(); // 一次性的，用完就删除a标签
    },
    uploadText(index,row){
      this.dialogVisible1=true
      this.contract.id = row.id
      //console.log(row.id);
    },
    execute(index, row) {
      //console.log(row.id);

      // const _this = this
      // const token = localGet(`token`)
      // const userId = token.id;
      // //console.log(userId)
      // axios({
      //   method: "post",
      //   url: "/contract/addApply",
      //   params: {
      //     userId : userId,
      //     contractId: row.id
      //
      //   }
      // }).then(function (resp){
      //   if("success"===resp.data){
      //
      //     _this.selectByCondition()
      //     _this.$message({
      //       message: '恭喜你，申请成功！',
      //       type: 'success'
      //     })
      //
      //   }else if("empty"===resp.data){
      //     _this.$message({
      //       message: '请填写信息！',
      //       type: 'error'
      //     })
      //   }else {
      //     _this.$message({
      //       message: '请勿重复申请！',
      //       type: 'error'
      //     })
      //   }
      // })

    },
    getInfo(index, row) {
      this.contract = row
      this.dialogVisible = true
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


    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    beforeUpload(file) {
      console.log(file.type)
      const isDoc = file.type === 'application/msword';
      const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      console.log("doc格式"+isDoc)
      console.log("docx格式"+isDocx)
      // const isLt2M = file.size / 1024 / 1024 < 2;
      //
      if (!isDoc&&!isDocx) {
        this.$message.error('上传头像图片只能是 doc/docx 格式!');
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;

    }

  }
}
</script>

<style scoped>

</style>