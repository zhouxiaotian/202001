<template>
  <el-container class='container'>
    <el-aside width="200px">
      <el-col
        :span="24"
        class='inner_box'
      >
        <el-menu
          default-active="2"
          class="my-menu"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          
        >
          <el-submenu index="1" v-if='power.indexOf("departhandle")!=-1'>
            <template slot="title">
              <i class="el-icon-s-operation"></i>
              <span>部门管理</span>
            </template>

						<router-link to='/org/list'>
							<el-menu-item index="1-1">部门列表</el-menu-item>
						</router-link>

            <router-link to="/org/add">
							<el-menu-item index="1-2">新增部门</el-menu-item>
						</router-link>
            
          </el-submenu>

          <el-submenu index="2" v-if='power.indexOf("jobhandle")!=-1'>
            <template slot="title">
              <i class="el-icon-receiving"></i>
              <span>职务管理</span>
            </template>
            <el-menu-item index="2-1">职务列表</el-menu-item>
            <el-menu-item index="2-2">新增职务</el-menu-item>
          </el-submenu>

					<el-submenu index="3" v-if='power.indexOf("userhandle")!=-1'>
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>员工管理</span>
            </template>
            <router-link to="/org/user">
              <el-menu-item index="3-1">员工列表</el-menu-item>
            </router-link>
            <router-link to="/org/addUser">
              <el-menu-item index="3-2">新增员工</el-menu-item>
            </router-link>
            
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>

    <el-main>
			<router-view></router-view>
		</el-main>
  </el-container>
</template>
<script>
// @ is an alias to /src
export default {
  name: "ORG",
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
	},
	computed: {
		power(){
			//userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword
			return (this.$store.state.userInfo.power || '').split('|');
			// [userhandle,departhandle,jobhandle,departcustomer,allcustomer,resetpassword]
		}
	},
};
</script>
<style lang="less">
.container {
  .el-aside {
    overflow: hidden;
    background: #545c64;
    .inner_box {
      width: 110%;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
    }
	}
	.el-submenu__title{
		color:#fff
	}
	.my-menu{
		a{
			text-decoration: none;
		}
		.el-menu-item{
			color:#fff;
		}
		.current{
			.el-menu-item{
				color:#ffd04b
			}
			
		}
	}
	
}
</style>