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
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini"
                     :disabled="selectedCateKeys.length !== 3"
                     @click="addDialogVisible = true"
          >添加参数
          </el-button>
          <goods-params-table :data="manyTableData"
                              @showEditDialog="showEditDialog"
                              @deleteParams="deleteParams"
          ></goods-params-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini"
                     :disabled="selectedCateKeys.length !== 3"
                     @click="addDialogVisible = true"
          >添加属性
          </el-button>
          <goods-params-table :data="onlyTableData"
                              @showEditDialog="showEditDialog"
                              @deleteParams="deleteParams"
          ></goods-params-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--添加参数属性对话框-->
    <el-dialog
      :title="`添加${textTitle}`"
      :visible.sync="addDialogVisible"
      width="50%"
      :modal-append-to-body="false"
      @close="handleCloseAddDialog">
      <el-form :model="addForm" status-icon :rules="addFormRules" ref="addFromRef"
               label-width="100px">
        <el-form-item :label="`添加${textTitle}`" prop="attr_name">
          <el-input type="text" v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="addDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleAddParams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑参数属性对话框-->
    <el-dialog
      :title="`修改${textTitle}`"
      :visible.sync="editDialogVisible"
      width="50%"
      :modal-append-to-body="false"
      @close="handleCloseEditDialog">
      <el-form :model="editForm" status-icon :rules="editFormRules" ref="editFromRef"
               label-width="100px">
        <el-form-item :label="`修改${textTitle}`" prop="attr_name" label-width="150px">
          <el-input type="text" v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="editDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleEditParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodsParamsTable from '@/components/Goods/GoodsParamsTable'
import { showMessageTips } from '@/common/common'

export default {
  name: 'GoodsParams',
  components: { GoodsParamsTable },
  data () {
    return {
      cateList: [],
      selectedCateKeys: [],
      activeName: 'many',
      onlyTableData: [],
      manyTableData: [],
      addDialogVisible: false,
      addForm: {
        attr_name: ''
      },
      addFormRules: {
        attr_name: [
          {
            required: true,
            message: '请输入参数名称',
            trigger: 'blur'
          }
        ]
      },
      editDialogVisible: false,
      editForm: {
        attr_name: ''
      },
      editFormRules: {
        attr_name: [
          {
            required: true,
            message: '请输入参数名称',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    fetchCateId () {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    },
    textTitle () {
      return this.activeName === 'many' ? '动态参数' : '静态属性'
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
    },
    // 级联选择器处理函数
    handleChange () {
      this.fetchParamsData()
    },
    handleTabsClick () {
      this.fetchParamsData()
    },
    // 获取参数数据
    async fetchParamsData () {
      if (this.selectedCateKeys.length < 3) {
        this.selectedCateKeys = []
        return
      }
      const { data: res } = await this.$http.get(`categories/${this.fetchCateId}/attributes`,
        { params: { sel: this.activeName } })
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.activeName === 'only' ? this.onlyTableData = res.data : this.manyTableData = res.data
    },
    handleCloseAddDialog () {
      this.$refs.addFromRef.resetFields()
    },
    handleCloseEditDialog () {
      this.$refs.editFromRef.resetFields()
    },
    handleAddParams () {
      this.$refs.addFromRef.validate(async valid => {
        if (!valid) { return }
        const { data: res } = await this.$http.post(`categories/${this.fetchCateId}/attributes`, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        })
        showMessageTips(res, 201, this.$message, this.fetchParamsData)
        this.addDialogVisible = false
      })
    },
    async showEditDialog (id) {
      const { data: res } = await this.$http.get(`categories/${this.fetchCateId}/attributes/${id}`,
        { params: { attr_sel: this.activeName } })
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    handleEditParams () {
      this.$refs.editFromRef.validate(async valid => {
        if (!valid) { return }
        const { data: res } =
          await this.$http.put(`categories/${this.fetchCateId}/attributes/${this.editForm.attr_id}`, {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName
          })
        showMessageTips(res, 200, this.$message, this.fetchParamsData)
        this.editDialogVisible = false
      })
    },
    deleteParams (id) {
      this.$confirm('此操作将永久删除此参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete(`categories/${this.fetchCateId}/attributes/${id}`)
        showMessageTips(res, 200, this.$message, this.fetchParamsData)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cat_options {
  margin-top: 15px;
  margin-bottom: 25px;

  span {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
