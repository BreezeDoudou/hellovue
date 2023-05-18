<template>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" size="medium"
        validate-on-rule-change hide-required-asterisk status-icon>
        <h1>注册你的账号</h1>
        <el-form-item label="账  号" prop="userid">
            <el-input v-model="registerForm.userid" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="repetpassword">
            <el-input v-model="registerForm.repetpassword"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email"></el-input>
            <el-button type="primary" @click="send">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="authcode">
            <el-input v-model="registerForm.authcode"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓" prop="firstname">
            <el-input v-model="registerForm.firstname"></el-input>
        </el-form-item>
        <el-form-item label="名" prop="lastname">
            <el-input v-model="registerForm.lastname"></el-input>
        </el-form-item>
        <el-form-item label="地址一" prop="addr1">
            <el-input v-model="registerForm.addr1"></el-input>
        </el-form-item>
        <el-form-item label="地址二" prop="addr2">
            <el-input v-model="registerForm.addr2"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
            <el-input v-model="registerForm.city"></el-input>
        </el-form-item>
        <el-form-item label="区域" prop="state">
            <el-input v-model="registerForm.state"></el-input>
        </el-form-item>
        <el-form-item label="是否为管理员" prop="status">
            <el-input v-model="registerForm.status"></el-input>
        </el-form-item>
        <el-form-item label="地区编号" prop="zip">
            <el-input v-model="registerForm.zip"></el-input>
        </el-form-item>
        <el-form-item label="国家" prop="country">
            <el-input v-model="registerForm.country"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="back">返回登陆</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var validateUserid = (rule, value, callback) => {
            if (value === '') { callback(new Error('请输入账号')) }
            else {
                this.$http.get('/isAccountExit', {
                    params: {
                        account: value
                    }}).then(
                        success => {
                            console.log(success.data)
                            if(success.data.data==='账号已存在'){
                                callback(new Error('账号此存在'))
                            }
                            else{
                                callback()
                            }
                        }
                    )
                
            }

        };
        return {
            registerForm: {
                userid: 'test',
                password: 'test',
                lastname: 'test',
                email: '2210530985@qq.com',
                authcode: '4455',
                authcode_1: 'test',
                firstname: 'test',
                state: 'test',
                status: 'ok',
                repetpassword: 'test',
                city: 'test',
                country: 'test',
                zip: 'test',
                phone: '18710413658',
                addr1: 'test',
                addr2: 'test'
            },
            rules: {
                userid: [
                    {
                        validator: validateUserid, trigger: 'blur'
                    }
                ],

                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                lastname: [
                    { required: true, message: '名不能为空', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                authcode: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                ],
                firstname: [
                    { required: true, message: '姓氏不能为空', trigger: 'blur' },
                ], state: [
                    { required: true, message: '州不能为空', trigger: 'blur' },
                ], status: [
                    { required: true, message: '权限不能为空', trigger: 'blur' },
                ],
                country: [
                    { required: true, message: '国家不能为空', trigger: 'blur' },
                ],
                repetpassword: [
                    {
                        validator: validatePass2, trigger: 'blur'
                    }
                ]


            }
        };
        
        


    },
    methods: {
        onSubmit() {
            console.log(this.registerForm);
            this.$refs['registerForm'].validate(async vali=>{
             if(!vali)
               return;
               const result =await this.$http.post('/newAccount',this.registerForm,{
                params:{
                    authcode:this.registerForm.authcode,
                    password:this.registerForm.password
                }
               })
               console.log(result.data)
        })
    },
        back() {
            this.$router.push('/')
        },
        resetForm() {

            this.$nextTick(() => {
                this.$refs['registerForm'].resetFields();
            })
        },
        send(){
             if(this.registerForm.email!=''){
                this.$http.get('/email',{
                    params:{
                        email:this.registerForm.email}
                    }).then(
                        success=>{console.log(success.data),
                        this.$message({ message: '发送成功',
                            type: 'success'})}
                        
                    )
                }
             }
        }
    }

</script>

<style>
/* 注册表单样式 */
.el-form {
  width: 600px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
}

/* 表单标题样式 */
.el-form h1 {
  margin-bottom: 18px;
  font-size: 24px;
  font-weight: bold;
}

/* 表单输入控件样式 */
.el-input {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
}

/* 输入框prefix-icon样式 */
.el-input__prefix {
  color: #c0c4cc;
}

/* 发送验证码按钮样式 */
.el-button--primary {
  margin-left: 12px;
  height: 40px;
  line-height: 38px;
  font-size: 14px;
}

/* 按钮样式 */
.el-button {
  height: 40px;
  line-height: 20px;
  font-size: 14px;
  margin-right: 16px;
  border-radius: 4px;
}

/* 返回链接样式 */
.el-form-item__content > a {
  color: #409eff;
  font-size: 14px;
}

/* 错误提示样式 */
.el-form-item__error {
  font-size: 14px;
  color: #f56c6c;
}

/* 验证成功图标样式 */
.el-icon-check {
  color: #67c23a;
}

/* 验证失败图标样式 */
.el-icon-close {
  color: #f56c6c;
}

.el-form-item__content {
  display: flex;
  align-items: center;
}

.el-input {
  flex: 1; /* 占据剩余空间 */
}

.el-button--primary {
  margin-left: 10px;
}
</style>