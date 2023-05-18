<template>
<el-descriptions class="margin-top" title="带边框列表" :column="3"  border>
    <template slot="extra">
      <el-button type="primary" size="small" @click="test()">付款</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      <span v-text="this.order.userid"></span>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        手机号
      </template>
      <span v-text="this.user.phone"></span>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        发送地址
      </template>
      <span v-text="this.order.billAddr1"></span>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        商品
      </template>
       <div v-for="item in this.order.lineItemList">
        
        <span>商品id：{{ item.itemid }}</span>
        <span>数量：{{ item.quantity }}</span>
    </div>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        总价格
      </template>
      <span v-text="this.order.totalPrice"></span>
    </el-descriptions-item>
  </el-descriptions>
  </template>


<script>


export default{
    created(){
      console.log(1)
        console.log(this.$route.query.orderid)
        console.log(this.id)
          this.getaccount()
          this.getorder(this.$route.query.orderid)
    },
    data(){
        return{
            id:'',
            order: {
            
        },
        user:''
        }
        
    },
    methods:{
        async getaccount(){
       const res= await this.$http.get('/account')
       
       this.user=res.data.data
       console.log(this.user)
       
       
        },
        test(){
            const res =   this.$http.post('/pay/alipay?dona_money='+this.order.totalPrice+'&dona_id='+this.order.orderid).then((res)=>{
                const divForm =document.getElementsByTagName("div");
           if(divForm.length){
            document.body.removeChild(divForm[0]);
           }
           const div =document.createElement("div");
           div.innerHTML =res.data;
           document.body.appendChild(div);
           document.forms[0].setAttribute("target","_blank");
           document.forms[0].submit();
            })
    },
    async getorder(id){
       console.log(id)
        const res = await this.$http.get('getorder',{params:{orderid:id}})
        console.log(res.data)
        this.order=res.data.data
    }
}
}
</script>