<template>
  <el-card class="card-view-wrapper">
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'CardView'
}
</script>

<style lang="scss" scoped>
.card-view-wrapper {
  margin-top: 20px;
}
</style>
