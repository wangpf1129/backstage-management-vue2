<template>
  <div>
    <el-card>
      <el-row>
        <el-button type="primary">添加角色</el-button>
      </el-row>
      <el-table :data="rolesList" stripe border>
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row v-for="(item1,index1) in scope.row.children" :key="item1.id"
                    :class="['bottomBorder',index1 === 0 ? 'topBorder' : '','vcenter']"
            >
              <el-col :span="5">
                <el-tag closable @close="deleteRightsById(scope.row,item1.id)">{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item2,index2) in item1.children" :key="item2.id"
                        :class="[index2 === 0 ? '' : 'topBorder','vcenter']"
                >
                  <el-col :span="5">
                    <el-tag type="success" closable @close="deleteRightsById(scope.row,item2.id)">{{
                        item2.authName
                      }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="19">
                    <el-tag type="warning"
                            v-for="item3 in item2.children" :key="item3.id"
                            closable @close="deleteRightsById(scope.row,item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="340">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-star-off" size="mini"
                       @click="showSetRightsDialog(scope.row)">分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="添加用户信息"
      :visible.sync="rightsDialogVisible"
      width="50%"
      :modal-append-to-body="false"
      @close="closeRightsDialog"
    >
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
         <el-button @click="rightsDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { showMessageTips } from '@/common/common'

export default {
  name: 'RolesList',
  data () {
    return {
      rolesList: [],
      rightsDialogVisible: false,
      rightsList: [],
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      defKeys: [],
      // 角色ID
      roleId: ''
    }
  },
  created () {
    this.fetchRolesList()
  },
  methods: {
    async fetchRolesList () {
      const { data: res } = await this.$http.get('roles/')
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.rolesList = res.data
    },
    deleteRightsById (role, rightId) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
        role.children = res.data
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    async showSetRightsDialog (role) {
      this.roleId = role.id
      this.rightsDialogVisible = true
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.rightsList = res.data
      this.getLeaveKeys(role, this.defKeys)
    },
    // 通过递归来获取角色下所有三级权限的id，并保存到 defKeys中
    getLeaveKeys (node, arr) {
      if (!node.children) { // 证明是第三级权限
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeaveKeys(item, arr))
    },
    closeRightsDialog () {
      this.defKeys = []
    },
    // 分配权限
    async allotRights () {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      const strIds = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: strIds })
      showMessageTips(res, 200, this.$message, this.fetchRolesList)
      this.rightsDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 7px;
  cursor: default;
}

.bottomBorder {
  border-bottom: 1px solid #eee;
}

.topBorder {
  border-top: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
