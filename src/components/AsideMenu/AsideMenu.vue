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
  name: 'AsideMenu',
  data () {
    return {
      menuList: []
    }
  },
  created () {
    this.fetchMenuList()
  },
  methods: {
    async fetchMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.menuList = res.data
      console.log(this.menuList)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
