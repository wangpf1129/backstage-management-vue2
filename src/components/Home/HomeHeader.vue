<template>
  <el-header class="header-wrapper">
    <ul class="header-nav nav-tool">
      <li class="header-nav-item">
        <i class="iconfont nice-icon-indent"></i>
      </li>
      <li class="header-nav-item">
        <i class="iconfont nice-icon-earth"></i>
      </li>
      <li class="header-nav-item">
        <i class="iconfont nice-icon-refresh"></i>
      </li>
    </ul>
    <div class="header-nav nav-user">
      <div class="avatar-box">
        <el-dropdown>
          <div class="avatar">
            <el-avatar
              src="https://i0.hdslb.com/bfs/face/6a366b8156aa49f773d64d23eaa9e5d3d1e3b0e8.jpg@96w_96h_1c.webp"/>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">
              <span>个人主页</span>
            </el-dropdown-item>
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
export default {
  name: 'HomeHeader',
  methods: {
    logout () {
      this.$MessageBox('确定要退出登录吗?', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        window.sessionStorage.clear()
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  background-color: #fff;
  border: 1px solid #f6f6f6;
  display: flex;
  align-items: center;

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
        position: relative;
        cursor: pointer;
      }
    }
  }
}
</style>
