<template>
  <div>
    <el-card class="rights-list-wrapper">
      123
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'RightsList',
  data () {
    return {
      rightsList: []
    }
  },
  created () {
    this.fetchRightsList()
  },
  methods: {
    async fetchRightsList () {
      const { data: res } = await this.$http.get('rights/list')
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
