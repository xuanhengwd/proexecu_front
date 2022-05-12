<template>
  <div style="display: flex">
    <el-card class="box-card" style="width: 30%">
      <template #header>
      <div class="clearfix">
        <span>我的待办</span>
      </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>

    <el-card class="box-card" style="width: 60%;margin-left: 5%">
      <template #header>
      <div class="clearfix">
        <span>快速入口</span>
      </div>
      </template>
      <div class="text item">
        <el-button type="primary" style="width: 120px;height: 50px">上传标书</el-button>
        <el-button type="primary" style="width: 120px;height: 50px">填写合同</el-button>
        <el-button type="primary" style="width: 120px;height: 50px">进度查询</el-button>
        <el-button type="primary" style="width: 120px;height: 50px">快速入口</el-button>
        <el-button type="primary" style="width: 120px;height: 50px">快速入口</el-button>
      </div>
    </el-card>

  </div>
  <div></div>

</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
}
</script>

<style scoped>

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}

</style>