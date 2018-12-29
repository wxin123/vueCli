<template>
  <div id="app" class="container">
    <div class="header">
      <div class="logo">LOGO</div>
    </div>
    <div class="body">
      <div class="left">
        <ul class="menu">
          <li><a href="">权限管理</a></li>
        </ul>
      </div>
      <div class="right">
        <p>11111111111111111我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页我是主页</p>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }
  .header {height: 60px;width: 100%;background: #23262E}
  .header .logo{width: 200px;height: 60px;line-height: 60px;text-align: center;font-size: 24px;color: #fff}
  .body {width: 100%;position: fixed;top: 60px;left: 0;right: 0;bottom: 0;}
  .body .left{width: 200px;float: left;background: #393D49;height: 100%;}
  .body .left .menu{margin: 0;padding: 0;list-style: none}
  .body .left .menu li{line-height: 46px;height: 46px;text-align: center;}
  .body .left .menu li a{color: #fff;list-style: none;text-decoration: none}
  .body .right{padding: 10px;height: 100%;background: #f1f1f1;overflow: hidden;}
</style>
