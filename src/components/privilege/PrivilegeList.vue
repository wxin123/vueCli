<template>
  <div>
    <div class="box-search">
      <el-form ref="form" :inline="true" label-width="80px">
        <el-row>
          <el-col :span="6">
            <div>
              <el-form-item label="查询条件">
                <el-input v-model="search"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="box-button">
      <el-button-group>
        <el-button type="primary" @click="query">查询</el-button>
        <router-link tag="el-button" class="el-button--primary" :to="{name:'PrivilegeAdd'}">新增</router-link>
      </el-button-group>
    </div>
    <div class="box-table">
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="name" label="名称" width="240"></el-table-column>
        <el-table-column prop="flag" label="标识" width="240"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="address" label="操作" width="160">
          <template slot-scope="scope">
            <router-link tag="el-button" class="el-button--mini el-button--primary" :to="{name:'PrivilegeEdit',params:{id:scope.row.id}}">编辑</router-link>
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
export default {
  name: 'privilege-list',
  data () {
    return {
      search: '',
      count: 0,
      page: 1,
      list: []
    }
  },
  methods: {
    privateGetList: function (_this, page) {
      axios.get('/privilege/page', {
        params: {
          page: page,
          search: _this.search
        }
      }).then(function (response) {
        let rst = response.data
        if (rst.status === 200) {
          _this.list = rst.list
          _this.count = rst.count
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    query: function () {
      this.$options.methods.privateGetList(this, 1)
    },
    del: function (id) {
      var _this = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/privilege/del/' + id).then(function (response) {
          if (response.data.status === 200) {
            _this.$message({
              type: 'success',
              duration: 1000,
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          duration: 1000,
          message: '已取消删除'
        })
      })

      // console.log(id)
    },
    handleChangeCurrent: function (curr) {
      this.$options.methods.privateGetList(this, curr)
    }
  },
  mounted: function () {
    let _this = this
    this.$nextTick(function () {
      _this.$options.methods.privateGetList(_this, 1)
    })
  }
}
</script>

<style scoped>
  .box-search {background: #fff;border-radius: 3px;padding: 10px}
  .box-button {text-align: left;background: #fff;margin-top: 10px;padding: 10px;}
  .box-table {text-align: left;background: #fff;margin-top: 10px;padding: 10px;}
</style>
