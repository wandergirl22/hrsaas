<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="dialogTitle" :visible="showDialog" @close="onClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px" :model="formData" :rules="rules" ref="form">
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.name"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.code"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
        >
          <!-- 需要循环生成选项   这里做一下简单的处理 显示的是用户名 存的也是用户名-->
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
          v-model="formData.introduce"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click.native="onSave">确 定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import {
  getDeptsApi,
  addDeptsApi,
  getDepartDetail,
  editDeptApi
} from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  data() {
    // rule当前规则 value绑定数据 callback回调函数
    const checkDeptName = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter(
            (item) =>
              item.id !== this.formData.id &&
              item.pid === this.this.formData.pid
          )
          .some((item) => item.name === value)
      } else {
        isRepeat = this.currentNode.children.some((item) => item.name === value)
      }
      isRepeat ? callback(new Error('部门重复，请再次尝试')) : callback()
    }
    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }

      isRepeat ? callback(new Error('部门编码重复，请再次尝试')) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 定义校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur'
          },
          {
            validator: checkDeptName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门编码要求1-50个字符',
            trigger: 'blur'
          },
          {
            validator: checkDeptCode,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            min: 1,
            max: 300,
            message: '部门介绍要求1-50个字符'
          }
        ]
      },
      employees: []
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNode: {
      type: Object,
      default: false
    }
  },
  created() {
    this.getEmployeeSimple()
  },
  computed: {
    dialogTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async getEmployeeSimple() {
      const res = await getEmployeeSimple()
      this.employees = res
    },
    onClose() {
      this.$emit('update:show-dialog', false)
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.form.resetFields()
    },
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.id) {
          await editDeptApi(this.formData)
          this.$message.success('编辑部门成功')
        } else {
          this.formData.pid = this.currentNode.id
          await addDeptsApi(this.formData)
          this.$message.success('新增部门成功')
        }
      } catch (error) {
        this.$message.error('操作部门失败')
      } finally {
        this.onClose()
        this.$emit('add-Dept')
      }
    },
    async getDeptById(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style scoped></style>
