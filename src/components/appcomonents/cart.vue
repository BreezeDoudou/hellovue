<template>
  
<div>
    <h1 v-text=this.carts[0].userId></h1>
<el-table :data="carts" border  stripe="true" tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column label="选择"
      type="selection"
      width="55">
    </el-table-column>
<el-table-column label="Itemid" >
  <template slot-scope="scope">
        <span style="margin-left: 10px" >{{ scope.row.itemId}}</span>
      </template>
</el-table-column>
<el-table-column label="quantity" >
  <template slot-scope="scope">
        <span style="margin-left: 10px" >{{ scope.row.quantity}}</span>
      </template>
</el-table-column>
<el-table-column label="price for one" >
  <template slot-scope="scope">
        <span style="margin-left: 10px" >{{ scope.row.listprice}}</span>
      </template>
</el-table-column>
<el-table-column label="操作" >
    <template slot-scope="scope">
        <el-button-group>
  <el-button type="primary" icon="el-icon-minus" @click="low(scope.row)"></el-button>
  <el-button type="primary" @click="add(scope.row)"><i class="el-icon-plus" ></i></el-button>
</el-button-group>
</template>
</el-table-column>
</el-table>   
<el-button type="primary" @click="createOrder()">结账</el-button>
</div>
  </template>
  
  <script>
    export default {
        created(){
            this.userid=this.$route.query.userid
                console.log(this.userid)
                this.getaccount()
                this.getcarts(this.userid)
                console.log(this.carts)
        },
      data () {
        return {
            num: 1,
          carts:[    
          ],
          totalPrice:0,
          userid:'',
          totolprice:'',
          order:{
            orderid:'',
            userid: "ACID2",
            orderDate: "2022-11-12T16:00:00.000+00:00",
            shipAddr1: "582",
            "shipAddr2": "825",
            "shipCity": "4214",
            "shipState": "ok",
            "shipZip": "41",
            "shipCountry": "14",
            "billAddr1": "582",
            "billAddr2": "825",
            "billCity": "4214",
            "billState": "ok",
            "billZip": "41",
            "billCountry": "14",
            "courier": "UPS",
            "totalPrice": 18.50,
            "billToFirstname": "muffin",
            "billToLastname": "muffin",
            "shipToFirstname": "muffin",
            "shipToLastname": "muffin",
            "creditCard": "999 9999 9999 9999",
            "exprDate": "12/2022",
            "cardType": "Visa",
            "locale": "default",
            "lineItemList": [
                
                
            ]
          },
          lineItem:{
            "linenum": 0,
                    "itemid": "EST-4",
                    "quantity": 1,
                    "unitprice": "18.50"
          }
        };
        
      },
      methods: {
      handleChange(value) {
        console.log(value);
      },
     async add(row){
      console.log(row)
      // this.carts[row].quantity=this.carts[row].quantity+1
      row.quantity++;
      console.log(row)
         const res= await this.$http.post('/updatequantity',row)
         this.$message.success('添加成功')
         this.totolprice.num+=this.carts[i].quantity.num*this.carts[i].listprice.num
      },
    async  low(row){
        row.quantity--;
        console.log(this.carts)
        if(row.quantity===0){
          const res= await this.$http.post('/deletefromcart',row)
          this.$router.go(0)
          this.$message.success('删除成功')

        }
        else{
          const res= await this.$http.post('/updatequantity',row)
          this.$message.success('减少成功')
        }
        this.totolprice+=this.carts[i].quantity*this.carts[i].listprice
      },
      async getaccount(){
       const res= await this.$http.get('/account')
       
       this.userid=res.data.data[0].userid
       console.log(res.data.data[0].userid)
       
        },
        async getcarts(id){
          
         const res= await this.$http.get('/carts',{params:{userId:id}})
         this.carts=res.data.data
         for(var i=0 ;i<this.carts.length;i++){
          const res = await this.$http.get('/item',{params:{id:this.carts[i].itemId}})
          console.log(res.data.data.listprice)
          this.$set(this.carts[i], 'listprice', res.data.data.listprice)
         }
         console.log(this.carts)
         
        },
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      createOrder(){
        console.log(this.multipleSelection)
        
        for(var i=0;i<this.multipleSelection.length;i++){
         this.totalPrice+=this.multipleSelection[i].quantity*this.multipleSelection[i].listprice
         console.log(this.totalPrice)
           console.log(this.multipleSelection[i])
           this.lineItem.itemid=this.multipleSelection[i].itemId
           this.lineItem.quantity=this.multipleSelection[i].quantity
           this.lineItem.unitprice=this.multipleSelection[i].listprice
           this.lineItem.linenum=i
           
           console.log(this.lineItem)
           this.order.lineItemList.push(this.lineItem)
           }
        const res= this.$http.get('/account').then(success=>{
          
          console.log(success.data.data[0])
          this.order.userid=success.data.data[0].userid
         this.order.totalPrice=this.totalPrice
         this.order.billAddr1=success.data.data[0].addr1
         this.order.billAddr2=success.data.data[0].addr2
         this.order.billCountry=success.data.data[0].country
         this.order.billState=success.data.data[0].state
         this.order.billZip=success.data.data[0].zip
         this.order.billCity=success.data.data[0].city
         this.order.billToFirstname=success.data.data[0].firstname
         this.order.billToLastname=success.data.data[0].lastname
          console.log(this.order)
          this.$http.get('/getvalidorderid').then(success=>{
            console.log(success.data.data)
            this.order.orderid=success.data.data
            this.$http.post('/addorder',this.order).then(
          success=>{
              this.$message.success('创建成功')
              for(var j=0 ;j<this.multipleSelection.length;j++){
                this.$http.post('/deletefromcart',this.multipleSelection[j])
              }
              this.$router.push('/order?orderid='+this.order.orderid)
          }
        )
          })
       
          
        
        })
         
      }
       
       
        
      }
    } 
    
  </script>