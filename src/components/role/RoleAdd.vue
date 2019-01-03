<template>
  <div class="box-form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-input v-model="form.level"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8050'
export default {
  name: 'role-add',
  data () {
    return {
      form: {
        name: '',
        flag: '',
        description: '',
        privilege: []
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请输入等级', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
    })
  },
  methods: {
    save: function () {
      let _this = this
      let form = _this.form
      this.$refs['form'].validate((valid) => {
        if (valid) {
          axios.post('/role/add', {
            params: {
              name: form.name,
              level: form.level,
              description: form.description,
              privilege: form.privilege
            }
          }).then(function (response) {
            if (response.data.status === 200) {
              location.href = '/role'
            } else {
              _this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .box-form{background: #fff;padding: 10px}
</style>
