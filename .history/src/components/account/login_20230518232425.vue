
  <template>
    <div id="container">
      <div class="form-wrapper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px"  hide-required-asterisk size="medium" 
     validate-on-rule-change>
    <el-form-item label="账  号" prop="username"> 
     <el-input v-model="ruleForm.username" prefix-icon="el-icon-user" ></el-input>
    </el-form-item>
    <el-form-item label="密  码" prop="password">
     <el-input v-model="ruleForm.password" prefix-icon= "el-icon-lock" type="password"></el-input>
    </el-form-item>
    <el-form-item id="button1">
        <el-button type="primary" round @click="onSubmit" >登录</el-button>
        <el-button type="info" round @click="resetForm">重置</el-button>
  </el-form-item>
  <el-button type="info" round @click="change">短信验证登录</el-button>
  <el-link href="/register" target="_blank">没有账号？注册一个</el-link>
  </el-form>
      </div>
    </div>
     

</template>
  <script>

    export default {
      data() {
        return {
            ruleForm: {
            username:'j2ee',
            password:'j2ee'
          
          },
          rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur'}
          ],
         
        }
        }
        
      },
      methods: {
         resetForm(){
            console.log(this);
            this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields();
      })
         },

        onSubmit() {
            this.$refs['ruleForm'].validate(async vali=>{
                if(!vali)return;
              const result= await this.$http.post('/Account',this.ruleForm);
              console.log(result.data)
              if(result.data.status!=0) this.$message({
          message: '账号或密码错误',
          type: 'warning'})
             else {this.$message({
          message: '登陆成功',
          type: 'success'})
          console.log(result.data.data.userid)
          this.$userid = result.data.data.userid;
          this.$router.push('/index?userid='+result.data.data.userid)
          
             }
              
    
            })
      },
      change(){
        this.$router.push('/phone')
      }
     
    }
}
  </script>
  <style>
.el-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  /* 设置表单项之间的间距 */
  .el-form-item {
    margin-bottom: 30 px;
  }
  
  /* 利用 !important 强制更改样式的圆角为 20px */
  .el-input__inner,
  .el-button {
    border-radius: 20px !important;
  }
  
  /* 设置登录按钮样式 */
  .el-button[type="primary"] {
    width: 100%;
    height: 40px;
    border: none;
    margin-top: 30px;
    background-color: #1189FF;
  }
  
  /* 设置注册链接的样式 */
  .el-link {
    margin-top: 15px;
    display: block;
    text-align: center;
    color: #999;
  }
  
  /* 设置短信登录按钮的样式 */
  .el-button[type="info"] {
    height: 40px;
    margin-right: 10px;
  }

  .el-form-item.is-required:first-child .el-form-item__label {
    display: inline-block;
  }

     
  /* flex布局 */
  .el-form-item__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  /* 调整input的宽度 */
  #authcode {
    width: 100%;
  }
  
  /* 设置发送验证码按钮位置 */
  .el-form-item__content .el-button {
    margin-left: 20px; /* 根据需要更改间距 */
  }

  #button1{
    display: flex;
  }

  .container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-wrapper {
  width: 50%;
  margin: auto;
}
</style>