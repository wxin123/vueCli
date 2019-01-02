<template>
  <div>
    <div class="box-search">
      <div class="row">
        <div class="my-col-3">
          <div class="my-form-item">
            <label>查询条件</label>
            <input type="text" v-model="search"/>
          </div>
        </div>
      </div>
    </div>
    <div class="box-button">
      <button type="button" @click="query">查询</button>
      <router-link tag="button" :to="{name:'PrivilegeAdd'}">新增</router-link>
    </div>
    <div class="box-table">
      <table border="1">
        <thead>
        <tr>
          <td width="200">名称</td>
          <td width="200">标识</td>
          <td width="500">描述</td>
          <td width="200">操作</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td>{{item.name}}</td>
          <td>{{item.flag}}</td>
          <td>{{item.description}}</td>
          <td>
            <router-link tag="button" :to="{name:'PrivilegeEdit',params:{id:item.id}}">编辑</router-link>
            <button type="button" @click="del(item.id)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8050/privilege'
export default {
  name: 'privilege-list',
  data () {
    return {
      search: '',
      list: []
    }
  },
  methods: {
    query: function () {
      let _this = this
      axios.get('/list', {
        params: {
          search: _this.search
        }
      }).then(function (response) {
        let rst = response.data
        if (rst.status === 200) {
          _this.list = rst.list
          console.log(_this.list)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    del: function (id) {
      axios.post('/del/' + id).then(function (response) {
        console.log(response)
      })
      console.log(id)
    }
  },
  mounted: function () {
    let _this = this
    this.$nextTick(function () {
      axios.get('/list', {
        params: {
          search: _this.search
        }
      }).then(function (response) {
        var rst = response.data
        if (rst.status === 200) {
          _this.list = rst.list
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    })
  }
}
</script>

<style scoped>
  .row {width: 100%;}
  .my-col-3 {width: 25%;}
  .box-search {background: #fff;border-radius: 3px;padding: 10px}
  .my-form-item {line-height: 34px;height: 34px;position: relative;}
  .my-form-item label {float: left;display: block;height: 34px}
  .box-button {text-align: left;background: #fff;margin-top: 10px;padding: 10px;}
</style>
