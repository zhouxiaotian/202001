<template>

  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="120px"
    class="dePForm"
  >
    <el-form-item
      label="部门名称"
      prop="name"
    >
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    
    <el-form-item
      label="部门创建时间"
      required
    >
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col
        class="line"
				style='text-align:center'
        :span="2"
      >-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
            placeholder="选择时间"
            v-model="ruleForm.date2"
            style="width: 100%;"
          ></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item
      label="部门描述"
      prop="desc"
    >
      <el-input
        type="textarea"
        v-model="ruleForm.desc"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
      >立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
			<el-button @click='back'>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {addDep,getDepInfo,updateDep} from '@/api/api.js'
export default {
  data() {
    return {
      ruleForm: {
        name: "",
       
        date1: "",
        date2: "",
       
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "change" }
        ],
        //日期选择器  value-formate 和 rules不能同时使用
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  created() {
    // this.$router 存放的都是方法
    // this.$route  存放的都是属性
    // 若有id 就是编辑  没有id就是新增
    console.log(this.$route.query.id)
    this.id = this.$route.query.id
    this.id && this.getInfo();//只有在编辑的情况下 才需要获取数据 用来获取对应的部门的数据的
  },
  methods: {
    getInfo(){
      // 这个方法 一进页面就要执行
      // 根据ID 去后台要详细信息
      let id = this.$route.query.id;
      getDepInfo(id).then(data=>{
        console.log(data)
        this.ruleForm.name = data.data.name
        this.ruleForm.desc = data.data.desc
        this.ruleForm.date1 = new Date('2019-12-31')
        this.ruleForm.date2 = new Date('2019-12-31 23:12:21')
      })
    },
    back(){
      this.$router.back();
    },
		formateTime(time){
			// 获取时分秒
			return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
		},
		formateDate(date){
			// 获取年月日
			return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
		},
    submitForm(formName) {
      //validate 是el-ui表单组件自带的一个方法  用来在JS阶段校验用火狐输入是否合法
      //  这个函数接收一个回调函数 合法会给回调函数传true 不合法传false
      this.$refs[formName].validate(valid => {
        // 获取表单组件 然后调用这个方法
        if (valid) {
					// 验证通过
          // 我们要把数据发给后台
          // this.id存在 那么我们调用 update;不存在 才去调用新增
          /* this.id 
          ? 
          updateDep({
            name:this.ruleForm.name,
            desc:this.ruleForm.desc,
            departmentId:this.id,
						time:this.formateDate(this.ruleForm.date1)+' : '+this.formateTime(this.ruleForm.date2)
          }).then(data=>{
            if(data.code ==0){
              // 说明新增成功了
              this.$alert('恭喜您更新成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  //点击确定 我们跳转到 列表页
                  this.$router.push('/org/list')
                }
              });
            }else{
              this.$alert('新增失败', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  
                }
              });
            }
						console.log(data)
					})
          : 
          addDep({
						name:this.ruleForm.name,
						desc:this.ruleForm.desc,
						time:this.formateDate(this.ruleForm.date1)+' : '+this.formateTime(this.ruleForm.date2)
					}).then(data=>{
            if(data.code ==0){
              // 说明新增成功了
              this.$alert('恭喜您新增成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  //点击确定 我们跳转到 列表页
                  this.$router.push('/org/list')
                }
              });
            }else{
              this.$alert('新增失败', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  
                }
              });
            }
						console.log(data)
          }) */
          
          // let f = this.id ? updateDep : addDep;
          let obj = {
            name:this.ruleForm.name,
            desc:this.ruleForm.desc,
						time:this.formateDate(this.ruleForm.date1)+' : '+this.formateTime(this.ruleForm.date2)
          }
          this.id ? obj.departmentId = this.id : null;
          (this.id ? updateDep(obj) : addDep(obj)).then(data=>{
            if(data.code ==0){
              // 说明新增成功了
              let str = this.id ? '更新' : '新增';
              this.$alert('恭喜您'+str+'成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  //点击确定 我们跳转到 列表页
                  this.$router.push('/org/list')
                }
              });
            }else{
              this.$alert(str +'失败', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  
                }
              });
            }
						console.log(data)
          }) 
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //resetFields el-ui自带的 重置数据的方法
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.dePForm {
  text-align: left;
  width: 70%;
}
</style>