<template>
  <div class="box-form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="标识" prop="flag">
        <el-input v-model="form.flag"></el-input>
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

<script>import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8050'
let that = null
let id = null
export default {
  name: 'privilege-edit',
  data () {
    return {
      form: {
        name: '',
        flag: '',
        description: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        flag: [
          {required: true, message: '请输入标识', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述', trigger: 'blur'},
          {min: 1, max: 200, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    that = this
    id = that.$route.params.id
    that.$nextTick(function () {
      axios.get('/privilege/info/' + id).then(function (response) {
        var rst = response.data
        if (rst.status === 200) {
          var vo = rst.data
          that.form.id = vo.id
          that.form.name = vo.name
          that.form.flag = vo.flag
          that.form.description = vo.description
        }
      })
    })
  },
  methods: {
    save () {
      axios.post('/privilege/edit/ ' + id, {
        params: {
          name: that.form.name,
          flag: that.form.flag,
          description: that.form.description
        }
      }).then(function (response) {
        if (response.data.status === 200) {
          location.href = '/privilege'
        }
      })
    }
  }
}
</script>
<style scoped>
  .box-form{background: #fff;padding: 10px}
</style>
