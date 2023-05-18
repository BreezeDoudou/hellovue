<template>
<el-table :data="tableData" border>
<el-table-column label="用户名" >
  <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.userid }}</span>
      </template>
</el-table-column>
<el-table-column label="邮箱">
  <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.email }}</span>
      </template>
</el-table-column>
<el-table-column label="姓氏">
  <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.firstname }}</span>
      </template>
</el-table-column>
<el-table-column label="名" >
  <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.lastname }}</span>
      </template>
</el-table-column>
<el-table-column label="权限" >
  <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.status }}</span>
      </template>
</el-table-column>
<el-table-column label="地址1">
  <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.addr1 }}</span>
      </template>
</el-table-column>
<el-table-column label="地址2" >
  <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.addr2}}</span>
      </template>
</el-table-column>
<el-table-column label="城市" >
  <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.city }}</span>
      </template>
</el-table-column>
<el-table-column label="地区" >
   <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.state }}</span>
      </template></el-table-column>
<el-table-column label="国家">
  <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.country }}</span>
      </template>
</el-table-column>
<el-table-column label="手机号">
  <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.phone }}</span>
      </template>
</el-table-column>
<el-table-column label="区域" >
  <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.zip }}</span>
      </template>
</el-table-column>
<el-table-column label="操作" >
  <template><el-button @click="edit">修改</el-button></template>
</el-table-column>
</el-table>
  </template>

  
  <script>
    export default {
        created(){
               console.log(1)
                this.getaccount()
        },
      data() {
        return {
          tableData:[],
          search: ''
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        async getaccount(){
       const res= await this.$http.get('/account')
       console.log(res.data.data)
       this.tableData=res.data.data
       console.log(this.tableData)
        },
        edit(){
          this.$router.push('/edit')
        }
      },
    }
  </script>