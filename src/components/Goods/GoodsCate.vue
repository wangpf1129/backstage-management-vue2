<template>
  <div>
    <el-card>
      <el-row>
        <el-button type="primary" @click="showDialogVisible">添加分类</el-button>
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
      <!--分页-->
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
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      :modal-append-to-body="false"
      @close="handleCloseDialog"
    >
      <el-form :model="addCateFrom" :rules="cateFormRules" ref="addUserFromRef" label-width="70px">
        <el-form-item label="分类名称:" prop="cat_name" label-width="100px">
          <el-input v-model="addCateFrom.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:" label-width="100px">
          <el-cascader
            v-model="selectKeys"
            :options="parentCateList"
            :props="{ expandTrigger: 'hover',value:'cat_id',label:'cat_name',checkStrictly:true }"
            @change="handleParentCateChange" clearable></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="addCateDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleAddCate">确 定</el-button>
      </span>
    </el-dialog>
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
      total: 0,
      addCateDialogVisible: false,
      addCateFrom: {
        cat_name: '', // 分类名称
        cat_pid: 0, // 父级分类id
        cat_level: 0 // 分类等级，默认是 1级分类
      },
      cateFormRules: {
        cat_name: [
          {
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }
        ]
      },
      parentCateList: [],
      selectKeys: []
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
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
    },
    showDialogVisible () {
      this.fetchParentCateList()
      this.addCateDialogVisible = true
    },
    async fetchParentCateList () {
      const { data: res } = await this.$http.get('categories', { params: { type: 2 } })
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.parentCateList = res.data
      console.log(this.parentCateList)
    },
    handleParentCateChange () {
      console.log(this.selectKeys)
      if (this.selectKeys.length > 0) {
        this.addCateFrom.cat_pid = this.selectKeys[this.selectKeys.length - 1]
        this.addCateFrom.cat_level = this.selectKeys.length
      } else {
        this.addCateFrom.cat_pid = 0
        this.addCateFrom.cat_level = 0
      }
    },
    handleAddCate () {
      console.log(this.addCateFrom)
    },
    // 关闭对话框时，重置表单数据
    handleCloseDialog () {
      this.$refs.addUserFromRef.resetFields()
      this.selectKeys = []
      this.addCateFrom.cat_pid = 0
      this.addCateFrom.cat_level = 0
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
