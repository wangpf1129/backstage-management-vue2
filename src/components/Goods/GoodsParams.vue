<template>
  <div>
    <el-card>
      <el-alert title="只允许为第三级分类设置相关参数" type="warning" show-icon></el-alert>
      <el-row class="cat_options">
        <el-col>
          <span>选择商品分类：</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'GoodsParams',
  data () {
    return {
      cateList: []
    }
  },
  created () {
    this.fetchCateList()
  },
  methods: {
    async fetchCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.cateList = res.data
      console.log(this.cateList)
    }
  }
}
</script>

<style lang="scss" scoped>
.cat_options {
  margin-top: 15px;
}
</style>
