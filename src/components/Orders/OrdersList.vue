<template>
  <div>
    <el-card>
      <!-- 搜索区域-->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格区域-->
      <el-table :data="ordersList" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price" width="120"></el-table-column>
        <el-table-column label="是否付款" prop="order_pay" width="100">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.order_pay === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send" width="70"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template v-slot="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
                       @click="showEditDialog(scope.row)"></el-button>
            <el-button type="success" icon="el-icon-location" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
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
  </div>
</template>

<script>
export default {
  name: 'OrdersList',
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      ordersList: [],
      total: 0
    }
  },
  methods: {
    async fetchOrdersList () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.ordersList = res.data.goods
      this.total = res.data.total
      console.log(this.ordersList, this.total)
    },
    showEditDialog () {},
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
    }
  },
  created () {
    this.fetchOrdersList()
  },
  watch: {
    queryInfo: {
      deep: true,
      handler () {
        this.fetchOrdersList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
