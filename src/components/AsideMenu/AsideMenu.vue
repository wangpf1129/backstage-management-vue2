<template>
  <el-menu
    background-color="#30333c"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item :index="subItem.id + ''" v-for="subItem in item.children" :key="subItem.id">
        {{ subItem.authName }}
      </el-menu-item>
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
