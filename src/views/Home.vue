<template>
  <el-container class="home-wrapper">
    <div class="home-aside">
      <el-aside>
        <el-header class="home-aside-header">
        </el-header>
        aside
      </el-aside>
    </div>
    <el-main class="home-main">
      <home-header></home-header>
    </el-main>
  </el-container>
</template>

<script>
import HomeHeader from '@/components/Home/HomeHeader'
export default {
  name: 'Home',
  components: { HomeHeader },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.home-wrapper {
  height: 100%;
  color: red;

  .home-aside {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-x: hidden;
    width: 255px;
    z-index: 10;
    color: #fff;
    background: #30333c;
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);

    .home-aside-header {
      width: 100%;
      overflow: hidden;
      background-position: 30%;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 15%);
      background-color: #30333c;
      cursor: pointer;
      background-image: url(../assets/images/logo-white.png);
      background-repeat: no-repeat;
      background-size: 85%;
    }
  }

  .home-main {
    position: fixed;
    left: 255px;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #f7f7f7;
  }
}
</style>
