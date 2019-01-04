<template>
  <div>
    <div class="box-search">
      <el-form ref="form" :inline="true" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="查询条件">
              <el-input v-model="search"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="等级">
              <el-select v-model="level">
                <el-option value="">请选择</el-option>
                <el-option v-for="item in levelList" :key="item.val" :label="item.key" :value="item.val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="box-button">
      <el-button-group>
        <el-button type="primary" @click="query">查询</el-button>
        <router-link tag="el-button" class="el-button--primary" :to="{name:'RoleAdd'}">新增</router-link>
      </el-button-group>
    </div>
    <div class="box-table">
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="name" label="名称" width="240"></el-table-column>
        <el-table-column prop="level" label="等级" width="240"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="address" label="操作" width="160">
          <template slot-scope="scope">
            <router-link tag="el-button" class="el-button--mini el-button--primary" :to="{name:'RoleEdit',params:{id:scope.row.id}}">编辑</router-link>
            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="count" :page-size="10" @current-change="handleChangeCurrent">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8050'
let that = null
export default {
  name: 'role-list',
  data () {
    return {
      search: '',
      count: 0,
      page: 1,
      list: [],
      level: '',
      levelList: []
    }
  },
  methods: {
    privateGetList (page) {
      axios.get('/role/page', {
        params: {
          page: page,
          search: that.search,
          level: that.level
        }
      }).then(function (response) {
        let rst = response.data
        if (rst.status === 200) {
          that.list = rst.list
          that.count = rst.count
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    query () {
      that.$options.methods.privateGetList(1)
    },
    del (id) {
      that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/role/del/' + id).then(function (response) {
          if (response.data.status === 200) {
            that.$message({
              type: 'success',
              duration: 1000,
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          duration: 1000,
          message: '已取消删除'
        })
      })
    },
    handleChangeCurrent (curr) {
      that.$options.methods.privateGetList(curr)
    }
  },
  mounted () {
    that = this
    that.$nextTick(function () {
      that.$options.methods.privateGetList(1)
      axios.get('/role/level').then(function (response) {
        that.levelList = response.data.list
      })
    })
  }
}
</script>

<style scoped>
  .box-search {background: #fff;border-radius: 3px;padding: 10px}
  .box-button {text-align: left;background: #fff;margin-top: 10px;padding: 10px;}
  .box-table {text-align: left;background: #fff;margin-top: 10px;padding: 10px;}
</style>
