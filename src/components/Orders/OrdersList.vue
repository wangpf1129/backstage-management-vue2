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
          <el-button type="primary" icon="el-icon-edit" size="mini"
                     @click="editDialogVisible = true"></el-button>
          <el-button type="success" icon="el-icon-location" size="mini"
                     @click=" showProcessDialog"></el-button>
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
    <!--修改地址-->
    <el-dialog
      title="修改地址"
      :visible.sync="editDialogVisible"
      width="50%"
      :modal-append-to-body="false"
      @close="handleCloseDialog"
    >
      <el-form :model="addressFrom" :rules="addressFromRules" ref="addressFromRef" label-width="70px">
        <el-form-item label="省市区/县:" prop="address1" label-width="100px">
          <el-cascader
            v-model="addressFrom.address1"
            :options="cityData"
            :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址:" prop="address2" label-width="100px">
          <el-input v-model="addressFrom.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="editDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!--查看物流订单-->
    <el-dialog
      title="物流订单详情"
      :visible.sync="processDialogVisible"
      width="50%"
      :modal-append-to-body="false"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in processData"
          :key="index"
          :timestamp="activity.time">
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import cityData from '@/common/citydata'
import kuaiDi from '@/common/kuaidi'

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
      total: 0,
      editDialogVisible: false,
      addressFrom: {
        address1: [],
        address2: ''
      },
      addressFromRules: {
        address1: {
          required: true,
          message: '请选择省市区/县',
          trigger: 'blur'
        },
        address2: {
          required: true,
          message: '请输入详细地址',
          trigger: 'blur'
        }
      },
      cityData,
      processDialogVisible: false,
      processData: []
    }
  },
  methods: {
    async fetchOrdersList () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.ordersList = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
    },
    handleEdit () {
      if (this.addressFrom.address1.length !== 0 && this.addressFrom.address2.length !== 0) {
        this.$message.success('修改地址成功')
        this.editDialogVisible = false
      } else {
        this.$message.error('请输入地址')
      }
    },
    handleCloseDialog () {
      this.$refs.addressFromRef.resetFields()
    },
    showProcessDialog () {
      this.processData = kuaiDi.data
      console.log(this.processData)
      this.processDialogVisible = true
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
