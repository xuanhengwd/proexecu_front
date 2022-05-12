<template>
  <el-form :inline="true" :model="info" class="demo-form-inline">
    <el-form-item label="菜单名称">
      <el-input v-model="info.name" placeholder="菜单名称"></el-input>
    </el-form-item>
    <el-form-item label="菜单状态">
      <el-input v-model="info.state" placeholder="菜单状态"></el-input>
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
    <el-form ref="form" :model="menu" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="menu.name"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="menu.state"
                   active-value="1"
                   inactive-value="0"
        ></el-switch>
      </el-form-item>


      <el-form-item label="菜单图标">
        <el-input v-model="menu.iconCls"></el-input>
      </el-form-item>

      <el-form-item label="父节点id">
        <el-input v-model="menu.parentId"></el-input>
      </el-form-item>

      <!--      <el-form-item label="部门性质">-->
      <!--        <el-radio-group v-model="dept.deptNature">-->
      <!--          <el-radio label="1">教学</el-radio>-->
      <!--          <el-radio label="2">科研</el-radio>-->
      <!--          <el-radio label="3">教辅</el-radio>-->
      <!--          <el-radio label="4">行政</el-radio>-->
      <!--          <el-radio label="5">后勤</el-radio>-->
      <!--          <el-radio label="6">其他</el-radio>-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->

      <el-form-item label="描述">
        <el-input v-model="menu.description"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add()">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>


  <!--修改数据对话框表单-->
  <el-dialog
      title="编辑部门"
      v-model="dialogVisible2"
      width="30%"
      :before-close="handleClose">
    <!--表单-->
    <el-form ref="form" :model="newMenu" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="newMenu.name"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="newMenu.state"
                   active-value="1"
                   inactive-value="0"
        ></el-switch>
      </el-form-item>


      <el-form-item label="菜单图标">
        <el-input v-model="newMenu.iconCls"></el-input>
      </el-form-item>

      <el-form-item label="父节点id">
        <el-input v-model="newMenu.parentId"></el-input>
      </el-form-item>

      <!--      <el-form-item label="部门性质">-->
      <!--        <el-radio-group v-model="dept.deptNature">-->
      <!--          <el-radio label="1">教学</el-radio>-->
      <!--          <el-radio label="2">科研</el-radio>-->
      <!--          <el-radio label="3">教辅</el-radio>-->
      <!--          <el-radio label="4">行政</el-radio>-->
      <!--          <el-radio label="5">后勤</el-radio>-->
      <!--          <el-radio label="6">其他</el-radio>-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->

      <el-form-item label="描述">
        <el-input v-model="newMenu.description"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="update()">提交</el-button>
        <el-button @click="dialogVisible2 = false">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>


  <!--表格-->
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
          prop="name"
          label="导航名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态"
          width="180">
      </el-table-column>
      <el-table-column
          prop="parentId"
          label="父级id">
      </el-table-column>
      <el-table-column
          prop="description"
          label="导航说明">
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
//import axios from 'axios'
import axios from "@/utils/axios";
// eslint-disable-next-line no-unused-vars
import qs from 'qs'

export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Menu",
  data() {
    return {
      dialogVisible: false,//新增数据对话框
      dialogVisible1: false,//上传文件对话框
      dialogVisible2: false,//修改数据对话框
      menu: {
        id: '',
        name: '',
        state: '',
        iconCls: '',
        parentId: '',
        description: ''
      },
      newMenu: {
        id: '',
        name: '',
        state: '',
        iconCls: '',
        parentId: '',
        description: ''
      },
      info: {
        name: '',
        state: '',
      },
      tableData: [{
        name: '',
        state: '',
        parentId: '',
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
    //this.selectMenuAll();
    this.selectByCondition();
    this.getCount();

  },
  methods: {

    getCount() {
      const _this = this;
      axios({
        method: "get",
        url: "/menu/menuCount",

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
          url: "/menu/deleteMenuByIds",
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
          url: "/menu/deleteMenuById",
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
      console.log(this.menu);
      var _this = this;
      //发送请求
      axios({
        method: "post",
        url: "/menu/addMenu",
        params: this.menu
      }).then(function (resp) {
        console.log(resp.data === true);
        if (resp.data === true) {
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

      this.menu.name = this.info.name;
      this.menu.state = this.info.state;

      var _this = this;
      //页面加载之后
      axios({
        method: "post",
        url: "/menu/selectMenuByCondition",
        params: {
          name:this.menu.name,
          state:this.menu.state,
          // menu:this.menu,
          curPage: this.currentPage,
          pageCount: this.pageSize
        }
      }).then(function (resp) {
        _this.tableData = resp.data;

      })


      this.menu.name = '';
      this.menu.state = '';
    },

    selectMenuAll() {
      var _this = this;
      //页面加载之后
      axios({
        method: "get",
        url: "/menu/selectMenuAll",
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
      //console.log(index,row);
      this.newMenu = row;
      this.dialogVisible2 = true;
    },
    update() {
      const _this = this;
      axios({
        method: "post",
        url: "/menu/updateMenuById",
        params: this.newMenu
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