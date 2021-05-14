<template>
  <el-table :data="data" border stripe>
    <el-table-column type="expand"></el-table-column>
    <el-table-column type="index"></el-table-column>
    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.attr_id)">编辑
        </el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'GoodsParamsTable',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    showEditDialog (id) {
      this.$emit('showEditDialog', id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
