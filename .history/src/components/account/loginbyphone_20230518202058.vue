<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" hide-required-asterisk size="medium"
        validate-on-rule-change>
        <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" prefix-icon="el-icon-phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="authcode">
            <el-input v-model="ruleForm.authcode" prefix-icon="el-icon-s-promotion" id="authcode"></el-input>
            <el-button type="primary" round @click="send" size="small">发送验证码</el-button>
        </el-form-item>
        <el-form-item id="button1">
            <el-button type="primary" round @click="onSubmit">登录</el-button>
            <el-button type="info" round @click="resetForm">重置</el-button>
        </el-form-item>
        <el-button type="info" round @click="change">账号密码登录</el-button>
        <el-link href="/register" target="_blank">没有账号？注册一个</el-link>
    </el-form>
</template>
<script>

export default {
    data() {
        return {
            ruleForm: {
                phone: '18710413658',
                authcode: '',
                authcode_1: ''
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                    { min: 4, max: 4, message: '请输入正确的验证码', trigger: 'blur' }
                ],

            }
        }

    },
    methods: {
        resetForm() {
            console.log(this);
            this.$nextTick(() => {
                this.$refs['ruleForm'].resetFields();
            })
        },

        onSubmit() {
            this.$refs['ruleForm'].validate(async vali => {
                if (!vali) return;
                const result = await this.$http.get('/Phone', {
                    params: {
                        Phone: this.ruleForm.phone,
                        Authcode: this.ruleForm.authcode
                    }
                });
                console.log(result.data)
                if (result.data.status != 0) this.$message({
                    message: '验证码错误',
                    type: 'warning'
                })
                else this.$message({
                    message: '登陆成功',
                    type: 'success'
                })
            })
        },

        change() {
            this.$router.push('/')
        },
        send() {
            if (this.ruleForm.phone != '' && this.ruleForm.phone.length == 11) {
                this.$http.get('/message', {
                    params: {
                        Phone: this.ruleForm.phone
                    }
                }).then(
                    succuess => {
                        console.log(succuess.data)
                        this.ruleForm.authcode_1 = 3344
                        this.$message({
                            message: '发送成功',
                            type: 'success'
                        })
                    }
                )

            }

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
</style>