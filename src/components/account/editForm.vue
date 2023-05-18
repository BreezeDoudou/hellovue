<template>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" size="medium"
        validate-on-rule-change hide-required-asterisk status-icon>
        <h1>更改你的账号信息</h1>
        <el-form-item label="账  号" prop="userid">
            <el-input v-model="registerForm.userid" prefix-icon="el-icon-user" disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="repetpassword">
            <el-input v-model="registerForm.repetpassword"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email"></el-input>
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
            <el-button type="primary" @click="onSubmit">立即更改</el-button>
            <el-button @click="back">返回首页</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    created(){
           this.getaccount()
    },
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
               const result =await this.$http.post('/changeAccount',this.registerForm,{
                params:{
                    password:this.registerForm.password
                }
               
               })
               this.$message.success("更改成功")
               this.$router.push('/index')
               console.log(result.data)
        }
    
        )
    
    },
        back() {
            this.$router.push('/index')
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
             },
            async getaccount(){
       const res= await this.$http.get('/account_edit')
       console.log(res.data.data)
       this.registerForm=res.data.data
       console.log(this.registerForm)
        }
        }
        
    }

</script>