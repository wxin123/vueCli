<template>
  <div class="box-form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-select v-model="form.level" style="width: 100%">
          <el-option value="">请选择</el-option>
          <el-option v-for="item in levelList" :key="item.val" :label="item.key" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-checkbox-group v-model="form.privilege">
          <el-row>
            <el-col :span="6" v-for="item in privilegeList" :key="item.id">
              <el-checkbox :label="item.id"  :checked="item.checked">{{item.name}}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import async from 'async'
axios.defaults.baseURL = 'http://127.0.0.1:8050'
export default {
  name: 'role-edit',
  data () {
    return {
      levelList: [],
      privilegeList: [],
      form: {
        name: '',
        level: '',
        description: '',
        privilege: []
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择等级', trigger: 'blur' }
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
      axios.get('/role/level').then(function (response) {
        _this.levelList = response.data.list
      })
      async.series([
        function (callback) {
          axios.get('/role/info/' + id).then(function (response) {
            var rst = response.data
            if (rst.status === 200) {
              var vo = rst.data
              _this.form.id = vo.id
              _this.form.name = vo.name
              _this.form.level = vo.level
              _this.form.description = vo.description
              callback(null, vo.privilege)
            }
          })
        },
        function (callback) {
          axios.get('/privilege/list').then(function (response) {
            callback(null, response.data.list)
          })
        }
      ], function (err, rst) {
        var checked = rst[0].map(function (val) {
          return val.id
        })
        var all = rst[1]
        all.forEach(function (val) {
          if (checked.indexOf(val.id) > -1) {
            console.log(1)
            val.checked = true
          } else {
            val.checked = false
          }
        })
        _this.privilegeList = all
      })
    })
  },
  methods: {
    save: function () {
      var _this = this
      var id = _this.$route.params.id
      console.log(_this.form.level)
      let form = _this.form
      this.$refs['form'].validate((valid) => {
        if (valid) {
          axios.post('/role/edit/ ' + id, {
            params: {
              name: form.name,
              level: form.level,
              description: form.description,
              privilege: form.privilege.join(',')
            }
          }).then(function (response) {
            if (response.data.status === 200) {
              location.href = '/role'
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
