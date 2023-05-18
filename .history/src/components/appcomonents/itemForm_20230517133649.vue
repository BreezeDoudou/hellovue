
  <template >
 
 <el-table :data="items" border  stripe="true">
<el-table-column label="itemid" >
  <template slot-scope="scope">
        <span style="margin-left: 10px" >{{ scope.row.itemid }}</span>
      </template>
</el-table-column>
<el-table-column label="productid" >
  <template slot-scope="scope">
        <span style="margin-left: 10px" >{{ scope.row.productid }}</span>
      </template>
</el-table-column>
<el-table-column label="listprice" >
  <template slot-scope="scope">
        <span style="margin-left: 10px" >{{ scope.row.listprice}}</span>
      </template>
</el-table-column>
<el-table-column label="unitcost">
  <template slot-scope="scope">
        <span style="margin-left: 10px" >{{ scope.row.unitcost }}</span>
      </template>
</el-table-column>
<el-table-column label="status">
  <template slot-scope="scope">
        <span style="margin-left: 10px" >{{ scope.row.status }}</span>
      </template>
</el-table-column>
<el-table-column label="attr1">
  <template slot-scope="scope">
        <span style="margin-left: 10px" >{{ scope.row.attr1 }}</span>
      </template>
</el-table-column>
<el-table-column >
  <template slot-scope="scope">
        <!-- <span style="margin-left: 10px">{{ scope.row.descn }}</span> -->
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="addtocart(scope.row.itemid)"></el-button>
        
      </template>
</el-table-column>
</el-table>
  </template>

  <script>

export default {
  
    created(){
        console.log(this.$route.query.productid)
         this.getItems(this.$route.query.productid)
         this.userid=this.$route.query.userid
    },
   
    data(){
        return {
               items:[{
            "itemid": "EST-2",
            "productid": "FI-SW-01",
            "listprice": 16.50,
            "unitcost": 10.00,
            "supplier": 1,
            "status": "P",
            "attr1": "Small",
            "attr2": null,
            "attr3": null,
            "attr4": null,
            "attr5": null
        },{
            "itemid": "EST-1",
            "productid": "FI-SW-01",
            "listprice": 16.50,
            "unitcost": 10.00,
            "supplier": 1,
            "status": "P",
            "attr1": "Large",
            "attr2": null,
            "attr3": null,
            "attr4": null,
            "attr5": null
        }],
        userid:'' ,
        carts:{
               userId:'',
               itemId:'',
               quantity:''
        }
        }
    },
    methods :{
       async  getItems(productid){
        const result= await this.$http.get('/ItemofProduct',{params:{
                  id:productid
        }})
        this.items=result.data.data

        },
        async addtocart(itemid){
          console.log(itemid+this.userid)
          this.carts.itemId=itemid
          this.carts.userId=this.userid
          this.carts.quantity=1
         const res =await this.$http.post('/addtocart',this.carts)
         this.$message.success("成功添加至购物车")
        }
    }
}
</script>