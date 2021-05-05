<template>
  <div>
    <el-card class="users-list-wrapper">
      <!--搜索区域-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
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
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini"
                       @click="showEditDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini"
                       @click="deleteUser(scope.row.id)"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-star-off" circle size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2,5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户-->
    <el-dialog
      title="添加用户信息"
      :visible.sync="addDialogVisible"
      width="50%"
      :modal-append-to-body="false"
      @close="closeAddUserDialog"
    >
      <el-form :model="usersForm" :rules="usersFormRules" ref="addUserFromRef" label-width="70px">
        <el-form-item label="用户:" prop="username">
          <el-input v-model="usersForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="usersForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="usersForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="mobile">
          <el-input v-model="usersForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="addDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑用户-->
    <el-dialog
      title="添加用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      :modal-append-to-body="false"
      @close="closeEditUserDialog"
    >
      <el-form :model="editUserForm" :rules="usersFormRules" ref="editUserFormRef" label-width="70px">
        <el-form-item label="用户:" prop="username">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="editDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { checkMobile, checkEmail } from '@/common/check'
import { showMessageTips } from '@/common/common'

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
      addDialogVisible: false,
      editDialogVisible: false,
      usersForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
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
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 15,
            message: '密码的长度在5~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      editUserForm: {}
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
    },
    async showEditDialog (id) {
      this.editDialogVisible = true
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.editUserForm = res.data
    },
    // 模态框关闭时进行一些操作（重置form表单中的内容）
    closeAddUserDialog () {
      this.$refs.addUserFromRef.resetFields()
    },
    closeEditUserDialog () {
      this.$refs.editUserFormRef.resetFields()
    },
    addUser () {
      this.$refs.addUserFromRef.validate(async valid => {
        if (!valid) { return }
        const { data: res } = await this.$http.post('users', this.usersForm)
        showMessageTips(res, 201, this.$message, this.fetchUserList)
        this.addDialogVisible = false
      })
    },
    editUserInfo () {
      this.$refs.editUserFormRef.validate(async valid => {
        if (!valid) { return }
        const { data: res } = await this.$http.put('users/' + this.editUserForm.id, {
          email: this.editUserForm.email,
          mobile: this.editUserForm.mobile
        })
        showMessageTips(res, 200, this.$message, this.fetchUserList)
        this.editDialogVisible = false
      })
    },
    deleteUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete('users/' + id)
        showMessageTips(res, 200, this.$message, this.fetchUserList)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
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
