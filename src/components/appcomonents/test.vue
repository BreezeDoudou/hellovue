
<template><el-autocomplete
    popper-class="my-autocomplete"
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    @select="handleSelect1">
    <i
      class="el-icon-edit el-input__icon"
      slot="suffix"
      @click="handleIconClick">
    </i>
    <template slot-scope="{ item }">
      <div class="name">{{ item.name }}</div>
      <span class="addr">{{ item.productid }}</span>
    </template>
  </el-autocomplete></template>


<script>
  export default {
    created(){
       this.loadAll()
       console.log(this.restaurants)
    },
    data() {
      return {
        restaurants: [],
        state: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      async loadAll() {
      const results = await this.$http.get('/products')
      // console.log(results.data.data)
      this.restaurants=results.data.data
     
    },
      handleSelect1(item) {
        console.log(item);
        this.$router.push('/itemForm?productid='+item.productid)
      },
      handleIconClick(ev) {
         console.log(ev);
      }
    },
    
  }
</script>