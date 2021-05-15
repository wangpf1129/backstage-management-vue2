<template>
  <el-table :data="data" border stripe>
    <el-table-column type="expand">
      <template v-slot="scope">
        <el-tag class="tags" closable @close="handleCloseTag(index,scope.row)"
                v-for="(item,index) in scope.row.attr_vals" :key="index">
          {{ item }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="scope.row.inputVisible"
          v-model="scope.row.inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm(scope.row)"
          @blur="handleInputConfirm(scope.row)"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
      </template>
    </el-table-column>
    <el-table-column type="index"></el-table-column>
    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.attr_id)">编辑
        </el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteParams(scope.row.attr_id)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { showMessageTips } from '@/common/common'

export default {
  name: 'GoodsParamsTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    fetchCateId: {
      type: Number,
      default: null
    }
  },
  methods: {
    showEditDialog (id) {
      this.$emit('showEditDialog', id)
    },
    deleteParams (id) {
      this.$emit('deleteParams', id)
    },
    handleInputConfirm (row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      // 保存到数据库中
      this.saveAttrValues(row)
    },
    showInput (row) {
      row.inputVisible = true
      // 点击之后让文本框自动聚焦
      // $nextTick 方法 ： 当页面上的元素被重新渲染之后，才会指定回调函数中的代码
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 删除标签
    handleCloseTag (index, row) {
      row.attr_vals.splice(index, 1)
      this.saveAttrValues(row)
    },
    async saveAttrValues (row) {
      const { data: res } = await this.$http.put(`categories/${this.fetchCateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(',')
        })
      showMessageTips(res, 200, this.$message)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags, .button-new-tag, .input-new-tag {
  margin: 7px;
}

.input-new-tag {
  width: 120px;
}
</style>
