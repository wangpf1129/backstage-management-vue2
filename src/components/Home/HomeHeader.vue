<template>
  <el-header class="header-wrapper">
    <ul class="header-nav nav-tool">
      <li class="header-nav-item" @click="toggleMenuCollapse">
        <i class="iconfont" :class="iconStatus"></i>
      </li>
      <li class="header-nav-item">
        <i class="iconfont nice-icon-earth"></i>
      </li>
      <li class="header-nav-item">
        <i class="iconfont nice-icon-refresh"></i>
      </li>
      <Breadcrumb/>
    </ul>
    <div class="header-nav nav-user">
      <div class="avatar-box">
        <el-dropdown>
          <div class="avatar">
            <el-avatar src="https://wwwpppfffzzz.github.io/img/mytou.jpeg">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown">
            <div @click="$router.push('/profile')">
              <el-dropdown-item icon="el-icon-user">
                <span>个人主页</span>
              </el-dropdown-item>
            </div>
            <div @click="logout">
              <el-dropdown-item icon="el-icon-switch-button">
                <span>退出登录</span>
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'HomeHeader',
  components: { Breadcrumb },
  computed: {
    ...mapGetters(['collapse']),
    iconStatus () {
      return this.collapse ? 'nice-icon-indent' : 'nice-icon-outdent'
    }
  },
  methods: {
    logout () {
      this.$confirm('确定要退出登录吗?', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功'
        })
        window.sessionStorage.clear()
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    toggleMenuCollapse () {
      this.setCollapse(!this.collapse)
    },
    ...mapMutations({
      setCollapse: 'SET_COLLAPSE'
    })
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  background-color: #fff;
  border: 1px solid #f6f6f6;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.08);
  .header-nav {
    display: flex;
    align-items: center;
    height: 100%;
    .header-nav-item {
      cursor: pointer;
      margin: 0 20px;
    }
    &.nav-tool {
      flex: 1;
    }
    &.nav-user {
      padding-right: 20px;
      .avatar-box {
        width: 12%;
        cursor: pointer;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
