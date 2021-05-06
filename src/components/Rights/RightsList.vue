<template>
  <div>
    <el-card class="rights-list-wrapper">
      <el-table :data="rightsList" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
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
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.rightsList = res.data
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
