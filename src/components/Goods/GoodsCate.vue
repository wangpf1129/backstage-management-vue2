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
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
                       @click="showEditDialogVisible(scope.row)">编辑
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
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
    <!--添加分类对话框-->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      :modal-append-to-body="false"
      @close="handleCloseCateDialog"
    >
      <el-form :model="addCateFrom" :rules="cateFormRules" ref="addCateFromRef" label-width="70px">
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
    <!--编辑分类名称-->
    <el-dialog
      title="编辑分类"
      :visible.sync="editCateDialogVisible"
      width="50%"
      :modal-append-to-body="false"
      @close="handleCloseEditCateDialog"
    >
      <el-form :model="editCateFrom" :rules="editCateFromRules" ref="editCateFromRef" label-width="70px">
        <el-form-item label="分类名称:" prop="cat_name" label-width="100px">
          <el-input v-model="editCateFrom.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="editCateDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleEditCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { showMessageTips } from '@/common/common'

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
      selectKeys: [],
      editCateDialogVisible: false,
      editCateFrom: {},
      editCateFromRules: {
        cate_name: {
          required: true,
          message: '请输入分类名称',
          trigger: 'blur'
        }
      }
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
    },
    handleParentCateChange () {
      if (this.selectKeys.length > 0) {
        this.addCateFrom.cat_pid = this.selectKeys[this.selectKeys.length - 1]
        this.addCateFrom.cat_level = this.selectKeys.length
      } else {
        this.addCateFrom.cat_pid = 0
        this.addCateFrom.cat_level = 0
      }
    },
    handleAddCate () {
      this.$refs.addUserFromRef.validate(async valid => {
        if (!valid) { return }
        const { data: res } = await this.$http.post('categories', this.addCateFrom)
        showMessageTips(res, 201, this.$message, this.fetchCateList)
        this.addCateDialogVisible = false
      })
    },
    // 关闭对话框时，重置表单数据
    handleCloseCateDialog () {
      this.$refs.addCateFromRef.resetFields()
      this.selectKeys = []
      this.addCateFrom.cat_pid = 0
      this.addCateFrom.cat_level = 0
    },
    // 编辑功能
    showEditDialogVisible (cateItem) {
      this.editCateDialogVisible = true
      this.editCateFrom = cateItem
      console.log(this.editCateFrom)
    },
    handleEditCate () {
      this.$refs.editCateFromRef.validate(async valid => {
        if (!valid) { return }
        const { data: res } = await this.$http.put('categories/' + this.editCateFrom.cat_id, {
          cat_name: this.editCateFrom.cat_name
        })
        showMessageTips(res, 200, this.$message, this.fetchCateList)
        this.editCateDialogVisible = false
      })
    },
    handleCloseEditCateDialog () {
      this.$refs.editCateFromRef.resetFields()
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
