<template>
  <div></div>
</template>

<style>

</style>

<script>
import Sortable from 'sortablejs'
export default {
  data () {
    return {
    }
  },
  props: [
    'tableData', 'dropCol','col'
  ],
  mounted () {
    console.log(this.tableData,this.dropCol);
    this.rowDrop()
    this.columnDrop()
  },
  methods: {
    // 行拖拽
    rowDrop () {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd ({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },
    // 列拖拽
    columnDrop () {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        handle: ".allowDrag",  // 格式为简单css选择器的字符串，使列表单元中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表单元进行拖动
        filter: ".noDrag",  // 过滤器，不需要进行拖动的元素
        preventOnFilter: true, //  在触发过滤器`filter`的时候调用`event.preventDefault()`
        draggable: ".allowDrag",  // 允许拖拽的项目类名
        onEnd: evt => {
            const oldItem = this.dropCol[evt.oldIndex-1]     // -num是多少列被禁止
            this.dropCol.splice(evt.oldIndex-1, 1)
            this.dropCol.splice(evt.newIndex-1, 0, oldItem)
            
        }
      })
    }
  }
}
</script>