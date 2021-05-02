<template>
  <el-container class="home-wrapper">
    <div class="home-aside" :style="{width:menuStatus}">
      <el-aside>
        <el-header class="home-aside-header" :class="collapse ? 'home-aside-menu-shrink' : '' ">
        </el-header>
        <aside-menu></aside-menu>
      </el-aside>
    </div>
    <el-main class="home-main" :style="{left:menuStatus}">
      <home-header></home-header>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import HomeHeader from '@/components/Home/HomeHeader'
import AsideMenu from '@/components/AsideMenu/AsideMenu'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    AsideMenu,
    HomeHeader
  },
  computed: {
    ...mapGetters(['collapse']),
    menuStatus () {
      return this.collapse ? '60px' : '255px'
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.home-wrapper {
  width: 255px;
  height: 100%;

  .home-aside {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 255px;
    overflow-x: hidden;
    padding: 0;
    color: #fff;
    background: #30333c;
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    transition: all 0.3s;

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
      transition: all 0.3s;
      &.home-aside-menu-shrink {
        width: 60px;
        margin-left: 5px;
        background-image: url(../assets/images/logo-small.png);
        background-repeat: no-repeat;
        background-size: 55%;
      }
    }
  }

  .home-main {
    position: fixed;
    left: 255px;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #f7f7f7;
    transition: all 0.3s;
  }
}
</style>
