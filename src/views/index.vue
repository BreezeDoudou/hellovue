<template id="app">
  <el-container>
    <!-- 头部组件 -->
    <el-header>
      <div class="line"></div>
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/index">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">宠物</template>
          <el-menu-item index="2-1">鱼</el-menu-item>
          <el-menu-item index="2-2">鸟</el-menu-item>
          <el-menu-item index="2-3">猫</el-menu-item>
          <el-menu-item index="2-4">狗</el-menu-item>
          <el-menu-item index="2-5">爬宠</el-menu-item>
        </el-submenu>
        <el-menu-item index="/cart"><i class="el-icon-shopping-cart-2"></i></el-menu-item>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-user-solid"></i></template>
          <el-menu-item index="/selfaccount">个人信息</el-menu-item>
          <el-menu-item index="/">登出</el-menu-item>
        </el-submenu>

        <el-menu-item>
          <template>
           <search></search>
          </template>
        </el-menu-item>
      
      </el-menu>
    </el-header>
    <!-- 中心组件 -->
    <el-main>

      <router-view :key="key">
      </router-view>
      
    </el-main>
    
  </el-container>
 
  
</template>
<script>
import search from '../components/appcomonents/test.vue'
export default {
  created(){
    
        this.useridforindex=this.$route.query.userid
        console.log(this.$route.query.userid)
  },
  components:{
    search
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  
  data() {
    return {
      restaurants: [],
      state: '',
      useridforindex:''
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item)
      // this.$router.push({path:'/productForm',query: {category:'FISH'}})
      switch (item) {
        case "2-1": this.$router.push({ path: '/productForm?category=FISH&userid='+this.useridforindex }); break;
        case "2-2": this.$router.push({ path: '/productForm?category=BIRDS&userid='+this.useridforindex}); break;
        case "2-3": this.$router.push({ path: '/productForm?category=CATS&userid='+this.useridforindex}); break;
        case "2-4": this.$router.push({ path: '/productForm?category=DOGS&userid='+this.useridforindex }); break;
        case "2-5": this.$router.push({ path: '/productForm?category=REPTILES&userid='+this.useridforindex}); break;
        case "/cart" :this.$router.push({ path: '/cart?userid='+this.useridforindex }); break;
        default: this.$router.push(item)
      }
    },
 
  },


}

</script>

<style>
.el-menu-demo {
  display: flex;
  justify-content: flex-end; /* 右对齐布局 */
}

.el-menu-demo .el-menu-item,
.el-menu-demo .el-submenu {
  margin-left: 0px; /* 调整元素之间的间距 */
}
.footer {
  background-color: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 30px;
}

.about-us,
.related-links,
.follow-us {
  flex: 1;
}

.about-us h3,
.related-links h3,
.follow-us h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.about-us p {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.related-links a {
  display: block;
  margin-bottom: 5px;
}

.social-media-icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.social-media-icons i {
  font-size: 24px;
  color: #00baff;
  cursor: pointer;
  margin-right: 10px;
}
.social-media-icons i:last-child {
  margin-right: 0;
}
</style>