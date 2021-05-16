<template>
  <div>
    <el-card>
      <!-- 搜索区域-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddGoodPage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域-->
      <el-table :data="goodsList" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格（元）" prop="goods_price" width="120"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="100"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="170">
          <template v-slot="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
                       @click="showEditDialog(scope.row)">编辑
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="deleteGoods(scope.row.goods_id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5,7, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!--编辑分类名称-->
    <el-dialog
      title="修改商品信息"
      :visible.sync="editDialogVisible"
      width="50%"
      :modal-append-to-body="false"
    >
      <el-form :model="editFrom" :rules="editFromRules" ref="editFromRef" label-width="70px">
        <el-form-item label="商品名称:" prop="goods_name" label-width="100px">
          <el-input v-model="editFrom.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格:" prop="goods_price" label-width="100px">
          <el-input v-model="editFrom.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量:" prop="goods_number" label-width="100px">
          <el-input v-model="editFrom.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量:" prop="goods_weight" label-width="100px">
          <el-input v-model="editFrom.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="editDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { showMessageTips } from '@/common/common'

export default {
  name: 'GoodsList',
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      goodsList: [],
      total: 0,
      editDialogVisible: false,
      editFrom: {},
      editFromRules: {
        goods_name: {
          required: true,
          message: '请输入商品名称',
          trigger: 'blur'
        },
        goods_price: {
          required: true,
          message: '请输入商品价格',
          trigger: 'blur'
        },
        goods_number: {
          required: true,
          message: '请输入商品数量',
          trigger: 'blur'
        },
        goods_weight: {
          required: true,
          message: '请输入商品重量',
          trigger: 'blur'
        }
      }
    }
  },
  computed: {},
  methods: {
    async fetchGoodsList () {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    showEditDialog (item) {
      this.editDialogVisible = true
      this.editFrom = item
    },
    deleteGoods (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete('goods/' + id)
        showMessageTips(res, 200, this.$message, this.fetchGoodsList)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
    },
    goAddGoodPage () {
      this.$router.push('/goods-list/add')
    },
    handleEdit () {
      this.$refs.editFromRef.validate(async valid => {
        if (!valid) { return }
        const { data: res } = await this.$http.put('goods/' + this.editFrom.goods_id, {
          goods_name: this.editFrom.goods_name,
          goods_price: this.editFrom.goods_price,
          goods_number: this.editFrom.goods_number,
          goods_weight: this.editFrom.goods_weight
        })
        showMessageTips(res, 201, this.$message, this.fetchGoodsList)
        this.editDialogVisible = false
      })
    }
  },
  created () {
    this.fetchGoodsList()
  },
  watch: {
    queryInfo: {
      deep: true,
      handler () {
        this.fetchGoodsList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table-column {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
