<template>
  <div>
    <el-card class="users-wrapper">
      <!--搜索区域-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域-->
      <el-table :data="userList" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state" width="120">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeUserState(scope.row)"
              active-color="#40babf">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-star-off" circle size="mini"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
      <!-- 分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-dialog
      title="添加用户信息"
      :visible.sync="dialogVisible"
      width="50%"
      :modal-append-to-body="false"
    >
      <el-form :model="usersForm" :rules="usersFormRules" ref="ruleFormRef" label-width="70px">
        <el-form-item label="用户:" prop="username">
          <el-input v-model="usersForm.username"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Users',
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      usersForm: {},
      usersFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.fetchUserList()
  },
  methods: {
    async fetchUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.userList = res.data.users
      this.total = res.data.total
      // console.log(this.userList, this.total)
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
    },
    async changeUserState (userInfo) {
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error(`${res.meta.msg}`)
      }
      this.$message.success(`${res.meta.msg}`)
    }
  },
  watch: {
    queryInfo: {
      deep: true,
      handler () {
        this.fetchUserList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
