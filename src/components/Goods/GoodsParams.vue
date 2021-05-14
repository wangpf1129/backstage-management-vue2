<template>
  <div>
    <el-card>
      <el-alert title="只允许为第三级分类设置相关参数" type="warning" show-icon :closable="false"></el-alert>
      <el-row class="cat_options">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            v-model="selectedCateKeys"
            :options="cateList"
            :props="{ expandTrigger: 'hover',value:'cat_id',label:'cat_name'}"
            @change="handleChange"></el-cascader>
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
      cateList: [],
      selectedCateKeys: []
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
    },
    handleChange () {
      if (this.selectedCateKeys.length < 3) {
        this.selectedCateKeys = []
        this.$message.warning('只允许为第三级分类设置相关参数')
        return
      }
      console.log(this.selectedCateKeys)
    }
  }
}
</script>

<style lang="scss" scoped>
.cat_options {
  margin-top: 15px;
}
</style>
