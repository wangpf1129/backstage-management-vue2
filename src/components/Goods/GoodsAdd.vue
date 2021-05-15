<template>
  <div>
    <el-card>
      <el-alert title="消息提示的文案" type="info" show-icon></el-alert>
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品照片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-position="top">
        <el-tabs v-model="activeIndex" tab-position="left"
                 :before-leave="beforeTabLeave" @tab-click="handleTabClick">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="{ expandTrigger: 'hover',value:'cat_id',label:'cat_name',checkStrictly:true }"
                @change="handleParentCateChange" clearable></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox border :label="cb" v-for="(cb,index) in item.attr_vals" :key="index"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品照片" name="3">
            <el-upload
              :action="uploadUrl"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headersObj"
              :on-success="handleSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'GoodsAdd',
  data () {
    return {
      activeIndex: '0',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_cat: [],
        pics: []
      },
      addFormRules: {
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
        },
        goods_cat: {
          required: true,
          message: '请选择商品分类',
          trigger: 'blur'
        }
      },
      cateList: [],
      manyTableData: [],
      onlyTableData: [],
      // 图片上传组件的请求头
      headersObj: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
  },
  computed: {
    fetchCateId () {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    },
    uploadUrl () {
      return this.$http.defaults.baseURL + 'upload'
    }
  },
  methods: {
    async fetchCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
      this.cateList = res.data
    },
    handleParentCateChange () {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    beforeTabLeave (activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addForm.goods_name.trim().length === 0) {
        this.$message.error('请添加商品名称！')
        return false
      }
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请添加商品分类！')
        return false
      }
    },
    async handleTabClick () {
      // 为1 证明是 动态参数面板
      if (this.activeIndex === '1') {
        const { data: res } = await this.$http.get(`categories/${this.fetchCateId}/attributes`,
          { params: { sel: 'many' } })
        if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
        })
        this.manyTableData = res.data
      } else if (this.activeIndex === '2') {
        const { data: res } = await this.$http.get(`categories/${this.fetchCateId}/attributes`,
          { params: { sel: 'only' } })
        if (res.meta.status !== 200) { return this.$message.error(`${res.meta.msg}`) }
        this.onlyTableData = res.data
        console.log(this.onlyTableData)
      }
    },
    // 照片移除
    handleRemove (file) {
      this.addForm.pics = this.addForm.pics.filter(item => {
        return item.pic !== file.response.data.tmp_path
      })
    },
    handleSuccess (response) {
      this.addForm.pics.push({ pic: response.data.tmp_path })
    }
  },
  created () {
    this.fetchCateList()
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox {
  margin: 3px 7px !important;
}
</style>
