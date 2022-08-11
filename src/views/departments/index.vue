<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools @onAdd="addDialog" :isRoot="true" :tree-node="company" />
        <!-- 树形结构 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <!-- 这是作用域插槽 -->
          <!-- v-slot 获取组件内部slot提供的数据 -->
          <template v-slot="{ data }">
            <TreeTools
              @onAdd="addDialog"
              @remove="loadDepts"
              @onEdit="editDialog"
              :tree-node="data"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <addDialog
      :show-dialog.sync="showDialog"
      :currentNode="currentNode"
      @add-Dept="loadDepts"
      ref="addDialog"
    />
  </div>
</template>

<script>
import { getDeptsApi } from '@/api/departments'
import TreeTools from './components/treeTools.vue'
import addDialog from './components/addDialog.vue'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools,
    addDialog
  },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      company: {
        name: '传智教育',
        manager: '负责人'
      },
      treeData: [],
      showDialog: false,
      currentNode: {},
      loading: false
    }
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      this.loading = true
      const res = await getDeptsApi()
      this.treeData = tranListToTreeData(res.depts, '')
      this.loading = false
    },
    addDialog(val) {
      this.showDialog = true
      this.currentNode = val
    },
    editDialog(val) {
      this.showDialog = true
      this.$refs.addDept.getDeptById(val.id)
    }
  }
}
</script>

<style scoped lang="less"></style>
