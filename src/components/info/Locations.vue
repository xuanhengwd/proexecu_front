<template>
  <!--搜索框和按钮-->
  <el-form :inline="true" :model="info" class="demo-form-inline">
    <el-form-item label="地点名称">
      <el-input v-model="info.locationName" placeholder="地点名称"></el-input>
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
  </el-row>

  <!--新增数据对话框表单-->
  <el-dialog
      title="编辑部门"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose">
    <!--表单-->
    <el-form ref="form" :model="location" label-width="80px">
      <el-form-item label="地点编号">
        <el-input v-model="location.locationNo"></el-input>
      </el-form-item>

      <el-form-item label="地点名称">
        <el-input v-model="location.locationName"></el-input>
      </el-form-item>

      <el-form-item label="部门编号">
        <el-input v-model="location.deptNo"></el-input>
      </el-form-item>

      <el-form-item label="部门名称">
        <el-input v-model="location.deptName"></el-input>
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
    <el-form ref="form" :model="newLocation" label-width="80px">
      <el-form-item label="地点编号">
        <el-input v-model="newLocation.locationNo"></el-input>
      </el-form-item>

      <el-form-item label="地点名称">
        <el-input v-model="newLocation.locationName"></el-input>
      </el-form-item>

      <el-form-item label="部门编号">
        <el-input v-model="newLocation.deptNo"></el-input>
      </el-form-item>

      <el-form-item label="部门名称">
        <el-input v-model="newLocation.deptName"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="update()">提交</el-button>
        <el-button @click="dialogVisible2 = false">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

  <!--表格-->
  <div style="height: 50%;">
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
          prop="locationNo"
          label="地点编号">
      </el-table-column>
      <el-table-column
          prop="locationName"
          label="地点名称">
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
import qs from "qs";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Locations",
  data() {
    return {
      dialogVisible: false,//新增数据对话框
      dialogVisible1: false,//上传文件对话框
      dialogVisible2: false,//修改数据对话框
      location: {
        id: '',
        locationNo: '',
        locationName: '',
        deptNo: '',
        deptName: '',
      },
      newLocation: {
        id: '',
        locationNo: '',
        locationName: '',
        deptNo: '',
        deptName: '',
      },

      info: {

        locationName: '',
        deptName: '',

      },

      tableData: [{
        locationNo: '',
        locationName: '',
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
    getCount() {
      const _this = this;
      axios({
        method: "get",
        url: "/location/locationCount",

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
      const _this = this;
      //发送请求
      axios({
        method: "post",
        url: "/location/addLocation",
        params: this.location
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
        } else {
          this.$message.error('添加失败，请检查您的表单信息！');
        }

      })
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

        //console.log(this.selectIds)
        var _this = this;
        //发送请求
        axios({
          method: "post",
          url: "/location/deleteLocationByIds",
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
        const _this = this;
        axios({
          method: "post",
          url: "/location/deleteLocationById",
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

    //条件查询
    selectByCondition() {

      var _this = this;
      //页面加载之后
      axios({
        method: "post",
        url: "/location/selectLocationByCondition",
        params: {
          locationName:this.info.locationName,
          deptName:this.info.deptName,
          // location:this.location,
          curPage: this.currentPage,
          pageCount: this.pageSize
        }
      }).then(function (resp) {
        _this.tableData = resp.data
      })

    },

    selectAll() {
      var _this = this;
      //页面加载之后
      axios({
        method: "get",
        url: "/location/selectLocationAll",
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
      this.newLocation = row;
      this.dialogVisible2 = true;
    },

    update() {
      const _this = this;
      axios({
        method: "post",
        url: "/location/updateLocationById",
        params: this.newLocation
      }).then(function (resp) {
        //console.log(resp.data === true);
        if (resp.data === true) {
          //修改成功
          _this.selectAll();
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