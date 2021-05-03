<template>
  <el-card class="users-wrapper">
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="userList" stripe border>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态" prop="mg_state">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#40babf">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </el-card>
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
      total: 0
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
      console.log(this.userList, this.total)
    }
  }
}
</script>

<style lang="scss" scoped>
.users-wrapper {
  margin-top: 20px;

  .el-table {
    margin-top: 20px;
    font-size: 12px;
  }
}
</style>
