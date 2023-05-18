<template>
  <div id="app">
    
    <el-container>
  <el-header><h2>欢迎来到宠物商店</h2>
     </el-header>
  <el-main><router-view></router-view></el-main>
</el-container>
    <!-- 路由占位符 -->
    

  </div>
</template>

<script>
import login from './components/account/login.vue'
import Views from './views/index.vue';
import navbar from './components/appcomonents/navbar.vue'
import menu from './components/appcomonents/menu.vue';
export default {
    name: "App",
    components: { Views ,navbar,login,menu}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
