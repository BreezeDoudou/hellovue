<template>
<el-table :data="tableData" border >
<el-table-column label="商品id" >
  <template slot-scope="scope">
        <span style="margin-left: 10px" @click="gotoitem(scope.row.productid)">{{ scope.row.productid }}</span>
      </template>
</el-table-column>
<el-table-column label="商品名称">
  <template slot-scope="scope">
        <span style="margin-left: 10px" @click="gotoitem(scope.row.productid)">{{ scope.row.name }}</span>
      </template>
</el-table-column>
<el-table-column label="商品图片">
  <template slot-scope="scope">
        <!-- <span style="margin-left: 10px">{{ scope.row.descn }}</span> -->
        
        <el-image :src="scope.row.descn" @click="gotoitem(scope.row.productid)"></el-image>
      </template>
</el-table-column>
</el-table>
</template>
<script>
export default{
    created(){
        console.log(1)
               console.log(this.$route.query.category)
               console.log(this.$userid)
                this.getproductlist(this.$route.query.category)
                this.getaccount()

        },
      data() {
        return {
          tableData:[],
          search: '',
          url:'',
          userid:''
        }
      },
      methods :{
        async getproductlist(category1){
       const res= await this.$http.get('/category',{params:{
        category:category1
       }})
       this.tableData=res.data.data
       console.log(this.tableData)
      for(let i=0;i<this.tableData.length;i++)
      {
        var descn=this.tableData[i].descn
        
        console.log(require('../images'+descn))
        this.tableData[i].descn=require('../images'+descn)
      }
      console.log(this.tableData)
       
        },
        gotoitem(productid){
          this.$router.push('/itemForm?productid='+productid+'&userid='+this.userid)
        },
        async getaccount(){
       const res= await this.$http.get('/account')
       console.log(res.data.data)
       this.userid=res.data.data[0].userid
       console.log(res.data.data[0].userid)
        }
      }
}
</script>