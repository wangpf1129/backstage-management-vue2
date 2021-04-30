<template>
  <el-menu
    background-color="#30333c"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>主页</span>
      </template>
      <el-menu-item index="1-1">控制台</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'AsideMenu'
}
</script>

<style lang="scss" scoped>

</style>
