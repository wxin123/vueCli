<template>
  <div>
    <div class="">
      <label for="">名称</label>
      <input type="text" v-model="name"/>
    </div>
    <div class="">
      <label for="">标识</label>
      <input type="text" v-model="flag"/>
    </div>
    <div class="">
      <label for="">描述</label>
      <input type="text" v-model="description"/>
    </div>
    <div class="">
      <button type="button" @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8050/privilege'
export default {
  name: 'privilege-add',
  data () {
    return {
      name: '',
      flag: '',
      description: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
    })
  },
  methods: {
    save: function () {
      var _this = this
      axios.post('/add', {
        params: {
          name: _this.name,
          flag: _this.flag,
          description: _this.description
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

</style>
