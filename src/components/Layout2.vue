<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <catalogue></catalogue>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>


</template>

<script>
import Catalogue from "@/components/Catalogue";
import Header from "@/components/Header";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout2",
  components:{
    Catalogue,
    Header
  }
}
</script>

<style scoped>

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height:30px;
}

.el-aside {

  text-align: center;
  height: calc(100vh - 70px);

}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;

}
</style>