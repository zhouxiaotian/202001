<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :border='true'
    :stripe='true'
    max-height="450">
    <!-- prop 对应的那个字符串  就是 这一列用来展示对象的对应属性名 -->
    <!-- <el-table-column
      fixed
      prop="date"
      label="日期"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column> -->
    <el-table-column
      type='index'
      :index='indexFn' 
      label="编号"
      width="120">
    </el-table-column>
    <!-- :index='indexFn'  自定义索引 -->
    <el-table-column
      prop="name"
      label="名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="desc"
      align='center'
      label="描述"
      >
    </el-table-column>
    <el-table-column
      
      label="操作"
      width="150">
      <template slot-scope="qqq">
        <!-- qqq 对应的是 当前这一行所对应的那一条数据 -->
        <el-button
          @click="edit(qqq)"
          type="default"
          size="small">
          编辑
        </el-button>
        <el-button
          @click="deleteRow(qqq)"
          type="danger"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// 把数据从后台请求回来 然后渲染到当前页面；
  import {getDepList,removeDep} from '@/api/api.js'
  export default {
    methods: {
      edit(obj){
        //点击编辑的时候 我们要跳到新增页 并且把对应的这条数据展示到新增页的表单中
        // this.$router.push('/org/add?id='+obj.row.id)
        this.$router.push({path:'/org/add',query:{id:obj.row.id}})
      },
      deleteRow(obj) {
        // obj $index 对应的是这条数据索引
        // obj.row  对应的是这一条数据
        console.log(obj);
        // this.tableData.splice(obj.$index,1)
        // 点击删除的时候 要先询问是否删除
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 点击确定的时候 执行的函数
          // obj.row 是当前这一条数据  
          removeDep(obj.row.id).then(data=>{
            // 删除成功之后再给用户提示
            this.tableData.splice(obj.$index,1);// 把这条数据从前端删除
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          
        }).catch(() => {
          //点击取消的时候 执行的函数
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      indexFn(n){
        // n 是从0开始的
        return '索引是:'+(n+1)
      }
    },
    created(){
      getDepList().then(data=>{
        console.log(data)
        // 获取到数据之后 把后台给的数据赋给 tableData
        this.tableData = data.data;
      })
    },
    data() {
      return {
        tableData: []
      }
    }
  }
</script>