<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">主页</el-breadcrumb-item>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in navList" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      list: []
    }
  },
  computed: {
    navList () {
      return this.list.filter(item => {
        return item.meta.title
      })
    }
  },
  created () {
    this.getList()
  },
  watch: {
    $route () {
      this.getList()
    }
  },
  methods: {
    getList () {
      this.list = this.$route.matched.filter(item => {
        return item.meta.title
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}
.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
