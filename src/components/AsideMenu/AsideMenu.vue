<template>
  <el-menu
    class="menu-wrapper"
    background-color="#30333c"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="true"
    :collapse="collapse"
    :collapse-transition="false"
    router
    :default-active="$route.path"
  >
    <el-submenu :index="item.id + ''"
                v-for="item in menuList"
                :key="item.id"
                :class="collapse ? 'el-submenu__title' : '' "
    >
      <template slot="title">
        <i :class="iconObject[item.id]"></i>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item :index="'/' + subItem.path + '-list'" v-for="subItem in item.children" :key="subItem.id">
        <i class="el-icon-menu"></i>
        {{ subItem.authName }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AsideMenu',
  computed: {
    ...mapGetters(['collapse'])
  },
  data () {
    return {
      menuList: [],
      iconObject: {
        125: 'iconfont nice-icon-user',
        103: 'iconfont nice-icon-liuyan1',
        101: 'iconfont nice-icon-shangpin',
        102: 'iconfont nice-icon-shouru',
        145: 'iconfont nice-icon-fangwenliang'
      }
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
      // console.log(this.menuList)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-wrapper {
  width: 255px;
  border: 1px solid transparent;

  .el-submenu__title {
    width: 60px;
    padding: 0;
  }
}

.iconfont {
  margin-right: 10px;
  font-size: 18px;
}
</style>
