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
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8050'
let that = this
export default {
  name: 'role-add',
  data () {
    return {
      levelList: [],
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
    that = this
    that.$nextTick(function () {
      axios.get('/role/level').then(function (response) {
        that.levelList = response.data.list
      })
    })
  },
  beforeRouteEnter (to, from, next) {
    console.log('local beforeEnter')
    next()
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    console.log('local beforeUpdate')
    next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    console.log('local beforeLeave')
    next()
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
  methods: {
    save () {
      let that = this
      let form = that.form
      this.$refs['form'].validate((valid) => {
        if (valid) {
          axios.post('/role/add', {
            params: {
              name: form.name,
              level: form.level,
              description: form.description
            }
          }).then(function (response) {
            if (response.data.status === 200) {
              location.href = '/role'
            } else {
              that.$message({
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
