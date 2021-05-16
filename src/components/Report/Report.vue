<template>
  <div>
    <el-card>
      <div id="main" style="width: 800px;height:500px;"></div>
    </el-card>
  </div>
</template>

<script>
import { merge } from '@/common/merge'

const echarts = require('echarts')

export default {
  name: 'Report',
  data () {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  async mounted () {
    const myChart = echarts.init(document.getElementById('main'))
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) return this.$message.error('获取数据失败')
    const result = merge(res.data, this.option)
    console.log(res.data)
    // 5.使用刚指定的配置项和数据显示图表。
    myChart.setOption(result)
  }
}
</script>

<style lang="scss" scoped>
#main {
  margin: 0 auto;
}
</style>
