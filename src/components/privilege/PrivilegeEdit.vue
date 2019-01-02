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
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        flag: [
          { required: true, message: '请输入标识', trigger: 'blur' },
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
      let _this = this
      let id = this.$route.params.id
      axios.get('/privilege/info/' + id).then(function (response) {
        var rst = response.data
        if (rst.status === 200) {
          var vo = rst.data
          _this.form.id = vo.id
          _this.form.name = vo.name
          _this.form.flag = vo.flag
          _this.form.description = vo.description
        }
      })
    })
  },
  methods: {
    save: function () {
      var _this = this
      var id = _this.$route.params.id
      axios.post('/privilege/edit/ ' + id, {
        params: {
          name: _this.form.name,
          flag: _this.form.flag,
          description: _this.form.description
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
