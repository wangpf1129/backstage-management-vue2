<template>
  <div>
    <el-card>
      <el-row>
        <el-button type="primary">添加分类</el-button>
      </el-row>
      <el-table
        :data="cateList"
        row-key="cat_id"
        border
        :tree-props="{children: 'children'}">
        <el-table-column prop="cat_name" label="分类名称"></el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template v-slot="scope">
            <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: #11C26D"></i>
            <i class="el-icon-error" v-else style="color: #dd3e54"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template v-slot="scope">
            <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag type="success" v-if="scope.row.cat_level === 1">二级</el-tag>
            <el-tag type="warning" v-if="scope.row.cat_level === 2">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'GoodsCate',
  data () {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类列表数据
      cateList: [],
      // 总数据条数
      total: 0
    }
  },
  created () {
    this.fetchCateList()
  },
  methods: {
    async fetchCateList () {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.cateList = res.data.result
      this.total = res.data.total
      console.log(this.cateList)
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
    }
  },
  watch: {
    queryInfo: {
      deep: true,
      handler () {
        this.fetchCateList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
