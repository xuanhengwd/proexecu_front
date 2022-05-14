<template>
  <!--搜索框和按钮-->
  <el-form :inline="true" :model="info" class="demo-form-inline">
    <el-form-item label="部门编号">
      <el-input v-model="info.deptNo" placeholder="部门编号"></el-input>
    </el-form-item>
    <el-form-item label="部门名称">
      <el-input v-model="info.deptName" placeholder="部门名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="selectByCondition">查询</el-button>
    </el-form-item>
  </el-form>

  <el-row>
    <el-button type="primary" plain @click="deleteByIds">批量删除</el-button>
    <el-button type="danger" plain @click="dialogVisible = true">新增</el-button>
    <el-button type="primary" @click="dialogVisible1=true">
      批量上传
      <el-icon class="el-icon--right">
        <Upload/>
      </el-icon>
    </el-button>
  </el-row>


  <!--上传文件对话框-->
  <el-dialog
      title="上传文件"
      v-model="dialogVisible1"
      width="30%"
      :before-close="handleClose">

    <div>

      <el-upload
          class="upload-demo"
          action="http://localhost:8080/dept/addDepts"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <template #tip>
        <div class="el-upload__tip">只能上传excle文件，且不超过10M</div>
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


  <!--新增数据对话框表单-->
  <el-dialog
      title="编辑部门"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose">
    <!--表单-->
    <el-form ref="form" :model="dept" label-width="80px">
      <el-form-item label="部门编号">
        <el-input v-model="dept.deptNo"></el-input>
      </el-form-item>

      <el-form-item label="部门名称">
        <el-input v-model="dept.deptName"></el-input>
      </el-form-item>

      <el-form-item label="父节点id">
        <el-input v-model="dept.parentId"></el-input>
      </el-form-item>

      <el-form-item label="部门性质">
        <el-radio-group v-model="dept.deptNature">
          <el-radio label="1">教学</el-radio>
          <el-radio label="2">科研</el-radio>
          <el-radio label="3">教辅</el-radio>
          <el-radio label="4">行政</el-radio>
          <el-radio label="5">后勤</el-radio>
          <el-radio label="6">其他</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="dept.remarks"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add()">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

  <!--修改数据对话框-->
  <el-dialog
      title="修改部门"
      v-model="dialogVisible2"
      width="30%"
      :before-close="handleClose">
    <!--表单-->
    <el-form ref="form" :model="newDept" label-width="80px">
      <el-form-item label="部门编号">
        <el-input v-model="newDept.deptNo"></el-input>
      </el-form-item>

      <el-form-item label="部门名称">
        <el-input v-model="newDept.deptName"></el-input>
      </el-form-item>

      <el-form-item label="父节点id">
        <el-input v-model="newDept.parentId"></el-input>
      </el-form-item>

      <el-form-item label="部门性质">
        <el-radio-group v-model="newDept.deptNature">
          <el-radio label="1">教学</el-radio>
          <el-radio label="2">科研</el-radio>
          <el-radio label="3">教辅</el-radio>
          <el-radio label="4">行政</el-radio>
          <el-radio label="5">后勤</el-radio>
          <el-radio label="6">其他</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="newDept.remarks"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="update()">提交</el-button>
        <el-button @click="dialogVisible2 = false">取消</el-button>
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
          label="选择"
          type="index"
          width="70">
      </el-table-column>
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>

      <el-table-column
          prop="deptNo"
          label="部门编号">
      </el-table-column>
      <el-table-column
          prop="deptName"
          label="部门名称">
      </el-table-column>


      <el-table-column
          label="操作">
        <template v-slot="scope">
          <el-row>
            <el-button type="primary" @click="updateById(scope.$index,scope.row)">修改</el-button>

            <el-button type="danger" @click="deleteById(scope.$index, scope.row)">删除</el-button>
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
import axios from "@/utils/axios";
// import axios from "axios";
import qs from "qs";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dept",
  data() {

    return {
      limit: 1,
      fileList: [],
      dialogVisible: false,//新增数据对话框
      dialogVisible1: false,//上传文件对话框
      dialogVisible2: false,//修改数据对话框
      resource: '',
      dept: {
        id: '',
        deptNo: '',
        deptName: '',
        parentId: '',
        deptNature: '',
        remarks: ''
      },
      newDept: {
        id: '',
        deptNo: '',
        deptName: '',
        parentId: '',
        deptNature: '',
        remarks: ''
      },
      info: {
        deptNo: '',
        deptName: ''
      },
      tableData: [{
        deptNo: '',
        deptName: '',
      },
      ],
      multipleSelection: [],
      id: '',
      selectIds: [],
      totalCount: 10,
      currentPage: 1,
      pageSize: 5

    }
  },

  mounted() {
    //this.selectAll();
    this.selectByCondition();
    this.getCount();
  },
  methods: {

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


    getCount() {
      const _this = this;
      axios({
        method: "get",
        url: "/dept/deptCount",

      }).then(function (resp) {
        //console.log(resp)
        _this.totalCount = resp.data;
      })

    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectByCondition();
    },

    //对话框表单的函数
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
    //新增
    add() {
      console.log(this.dept);
      const _this = this;
      const preDept=this.dept
      //发送请求
      axios({
        method: "post",
        url: "/dept/addDept",
        params: this.dept
      }).then(function (resp) {
        console.log(resp.data === true);
        if (resp.data === true) {
          _this.getCount();
          _this.selectByCondition();
          _this.dept=preDept
          _this.dialogVisible = false;
          _this.$message({
            message: '恭喜你，添加成功！',
            type: 'success'
          });
        } else {
          this.$message.error('添加失败，请检查您的表单信息！');
        }

      })
    },
    //批量删除
    deleteByIds() {
      this.$confirm('此操作将删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //确认按钮
        //创建id数组
        for (let i = 0; i < this.multipleSelection.length; i++) {
          let selectionElement = this.multipleSelection[i];
          this.selectIds[i] = selectionElement.id;
        }

        console.log(this.selectIds)
        var _this = this;
        //发送请求
        axios({
          method: "post",
          url: "/dept/deleteDeptByIds",
          params: {
            ids: _this.selectIds
          },
          paramsSerializer: params => {
            return qs.stringify(params, {indices: false})
          }
        }).then(function (resp) {
          console.log(resp.data);
          //删除成功
          _this.currentPage = 1;
          _this.getCount();
          _this.selectByCondition();

          _this.$message({
            message: '恭喜你，删除成功！',
            type: 'success'
          });
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    //删除
    deleteById(index, row) {
      //console.log(index,row);
      this.$confirm('此操作将删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //获得id
        this.id = row.id;
        //console.log(row.id);
        //console.log(this.id);
        const _this = this;
        axios({
          method: "post",
          url: "/dept/deleteDeptById",
          params: {
            id: _this.id
          }
        }).then(function (resp) {
          //console.log(resp);
          _this.getCount();
          //删除成功
          _this.selectByCondition();

          _this.$message({
            message: '恭喜你，删除成功！',
            type: 'success'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    //条件查询
    selectByCondition() {

      this.getCount();
      this.dept.deptName = this.info.deptName;
      this.dept.deptNo = this.info.deptNo;
      console.log(this.dept)
      var _this = this;
      axios({
        method: "post",
        url: "/dept/selectDeptByCondition",
        params: {
          deptName: this.dept.deptName,
          deptNo: this.dept.deptNo,
          // dept:this.dept,
          curPage: this.currentPage,
          pageCount: this.pageSize
        }
      }).then(function (resp) {
        console.log(resp.data)
        _this.tableData = resp.data;


      })
      this.dept.deptName = '';
      this.dept.deptNo = '';
    },

    //查询所有
    selectAll() {
      var _this = this;
      //页面加载之后
      axios({
        method: "get",
        url: "/dept/selectDeptAll",
        params: {
          curPage: this.currentPage,
          pageCount: this.pageSize
        }
      }).then(function (resp) {
        // _this.tableData=resp.data;
        console.log(resp.data)
        _this.tableData = resp.data

      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },

    updateById(index, row) {
      //console.log(index, row);
      this.newDept = row;
      this.dialogVisible2 = true;

    },
    update() {
      const _this = this;
      axios({
        method: "post",
        url: "/dept/updateDeptById",
        params: this.newDept
      }).then(function (resp) {
        console.log(resp.data === true);
        if (resp.data === true) {
          //修改成功
          _this.selectByCondition();
          _this.dialogVisible2 = false;
          _this.$message({
            message: '恭喜你，修改成功！',
            type: 'success'
          });
        }

      })
    }


  }
}
</script>

<style scoped>

</style>