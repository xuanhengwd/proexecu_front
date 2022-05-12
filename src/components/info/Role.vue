<template>
  <!--搜索框和按钮-->
  <el-form :inline="true" :model="info" class="demo-form-inline">
    <el-form-item label="角色名称">
      <el-input v-model="info.name" placeholder="角色名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="selectByCondition">查询</el-button>
    </el-form-item>
  </el-form>

  <el-row>
    <el-button type="primary" plain @click="deleteByIds">批量删除</el-button>
    <el-button type="danger" plain @click="dialogVisible = true">新增</el-button>
  </el-row>


  <!--新增数据对话框表单-->
  <el-dialog
      title="编辑部门"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose">
    <!--表单-->
    <el-form ref="form" :model="role" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="role.name"></el-input>
      </el-form-item>


      <el-form-item label="角色描述">
        <el-input v-model="role.description"></el-input>
      </el-form-item>

      <el-form-item label="角色权限">
        <el-checkbox-group v-model="menuIds">
          <el-checkbox label='1' name="type">基础信息</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add()">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>


  <div style="height: 50%">
    <!--表格-->
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
          prop="name"
          label="名称">
      </el-table-column>
      <el-table-column
          prop="description"
          label="描述">
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
//import axios from "axios";
import axios from "@/utils/axios";
import qs from "qs";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Role",
  data() {
    return {
      dialogVisible: false,//新增数据对话框
      dialogVisible1: false,//上传文件对话框
      dialogVisible2: false,//修改数据对话框
      role: {
        id: '',
        name: '',
        description: ''
      },
      menuIds: [],

      newRole: {
        id: '',
        name: '',
        description: ''
      },

      info: {
        name: '',
      },

      tableData: [{
        name: '',
        description: '',
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
    getCount() {
      const _this = this;
      axios({
        method: "get",
        url: "/role/roleCount",

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
          url: "/role/deleteRoleByIds",
          params: {
            ids: _this.selectIds
          },
          paramsSerializer: params => {
            return qs.stringify(params, {indices: false})
          }
        }).then(function (resp) {
          console.log(resp.data);
          //删除成功
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
        var _this = this;
        axios({
          method: "post",
          url: "/role/deleteRoleById",
          params: {
            id: _this.id
          }
        }).then(function (resp) {
          //console.log(resp);
          //删除成功
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
      var _this = this;
      console.log(this.role)
      //发送请求
      axios({
        method: "post",
        url: "/role/addRole",
        params: {
          name: this.role.name,
          description: this.role.description,
          menuIds: this.menuIds
        },
        paramsSerializer: params => {
          return qs.stringify(params, {indices: false})
        }
      }).then(function (resp) {
        console.log(resp.data === true);
        if (resp.data === true) {
          //删除成功
          _this.getCount();
          _this.selectByCondition();
          _this.dialogVisible = false;
          _this.$message({
            message: '恭喜你，添加成功！',
            type: 'success'
          });
        }

      })
    },

    //条件查询
    selectByCondition() {

      var _this = this;
      //页面加载之后
      axios({
        method: "post",
        url: "/role/selectRoleByCondition",
        params: {
          name:this.info.name,
          //role:this.role,
          curPage: this.currentPage,
          pageCount: this.pageSize
        }
      }).then(function (resp) {
        _this.tableData = resp.data;

      })
    },

    selectAll() {
      var _this = this;
      //页面加载之后
      axios({
        method: "get",
        url: "/role/selectRoleAll",
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
      console.log(index, row);
    },


  }
}
</script>

<style scoped>

</style>