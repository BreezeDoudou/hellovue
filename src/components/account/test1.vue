<template >
    <div>
    <button @click="test">
        test 
    </button >
    <p v-html="html"></p>
</div>
</template>
<script>
export default {
    data(){
               return{
                html:'',
                dona_money : 123 ,
                dona_id:123,
               }
    },
    methods :{
         test(){
            const res =   this.$http.post('/pay/alipay?dona_money='+this.dona_money+'&dona_id='+this.dona_id).then((res)=>{
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
           
        }
    }
}
</script>