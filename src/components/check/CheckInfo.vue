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
  <!--上传文件对话框-->
  <el-dialog
      title="上传文件"
      v-model="dialogVisible1"
      width="30%"
      :before-close="handleClose">

    <div>

      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <template #tip>
        <div  class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </template>
      </el-upload>

    </div>
    <template #footer>
        <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="uploadExcle">确 定</el-button>
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
          prop="pro_no"
          label="项目编号">
      </el-table-column>
      <el-table-column
          prop="pro_name"
          label="项目名称">
      </el-table-column>


      <el-table-column
          label="图片">
          <el-row>
          </el-row>
      </el-table-column>

      <el-table-column
          label="操作"
          width="200"
      >
        <template v-slot="scope">
          <el-row>
            <el-button type="primary" @click="dialogVisible1=true">上传</el-button>
            <el-button type="primary" @click="execute(scope.$index,scope.row)">申请</el-button>


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
export default {
  name: "CheckInfo",
  data() {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      dialogVisible1:false,
      tableData: [{
        pro_no: '1001',
        pro_name: '电脑采购',
        funds_name: '',
        applicant_name: '',
        pro_principal_name: '',
        dept_principal_name: '',
        app_date: '',
        state: '',
        apply_reason: '',
        budget: '',
        img:''

      },],

      info: {
        pro_name: '',
      },
      currentPage: 1,
      pageCount: 5,
      totalCount: 5
    }
  },
  methods:{
    uploadImg(){},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>

<style scoped>

</style>