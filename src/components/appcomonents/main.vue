<template>
    <el-carousel :interval="4000" type="card" height="800px" >
      <el-carousel-item>
        <el-link href="/productForm?category=FISH"><img src="../../assets/fish1.jpg" ></el-link>
      </el-carousel-item>
      <el-carousel-item>
        <el-link href="/productForm?category=DOGS"><img src="../../assets/dog1.jpg" ></el-link>
      </el-carousel-item>
      <el-carousel-item>
        <el-link href="/productForm?category=CATS"><img src="../../assets/cat1.jpg"></el-link> 
      </el-carousel-item>
      <el-carousel-item>
        <el-link href="/productForm?category=BIRDS"> <img src="../../assets/bird1.jpg"></el-link>
      </el-carousel-item>
      <el-carousel-item>
        <el-link href="/productForm?category=REPTILES">  <img src="../../assets/snake1.jpg" ></el-link>
      </el-carousel-item>
    </el-carousel>
  </template>

  <script>
export default {
  created(){
        this.userid=this.$route.query.userId
  },
  data(){
    return{
         userid:'',
         url
    }
  },
    method:{
    
        test(){
            console.log(1)
        },
        gotoCategory(category){
          this.$router.push('/productForm?category='+category+'&userid='+this.userid)
        }
    }
}

</script>
   
  <style> 
    .el-carousel__item a {
  display: block;
  height: 100%; /* 卡片高度撑满容器 */
}

.el-carousel__item img {
  width: 100%; /* 图片宽度拉伸至卡片宽度 */
  height: 100%; /* 图片高度拉伸至卡片高度（即容器高度） */
  object-fit: cover; /* 图片按比例缩放并截取以填充卡片 */
}

.el-carousel__item.is-active img {
  transform: scale(1.05); /* 当前卡片放大一点以突出显示 */
}
  </style>