<template>
  <div class="container">
    <!-- HEADER -->
    <header class="headerBox">
      <h2>TASK LIST 【 {{$store.getters.num}} 】</h2>
      <el-link type="primary" class="btn-link" @click="dialogVisible=true">新增任务</el-link>
    </header>

    <!-- TAB -->
    <section class="tabBox" @click="changeTab">
      <el-tag
        v-for="(item,index) in ['全部','未完成','已完成']"
        :key="index"
        :type="type==index?'success':'info'"
      >{{item}}</el-tag>
    </section>

    <!-- TABLE -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="编号" width="50"></el-table-column>
      <el-table-column prop="task" label="任务描述" width="240"></el-table-column>
      <el-table-column prop="state" label="状态" width="80" :formatter="formatterType"></el-table-column>
      <el-table-column prop="time" label="完成时间" width="130" :formatter="formatterTime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleDelete(scope)">删除</el-button>
          <el-button size="small" type="text" @click="handleUpdate(scope)">完成</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- DIALOG -->
    <el-dialog title="新增任务" :visible.sync="dialogVisible" width="50%">
      <div>
        <p class="inputDesc">请输入任务的描述信息:</p>
        <el-input type="textarea" :rows="2" v-model="desc"></el-input>
        <p class="inputDesc">请设置预期完成时间：</p>
        <el-date-picker type="datetime" v-model="time"></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelHandle">取 消</el-button>
        <el-button type="primary" @click="confirmHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "task",
  data() {
    return {
      desc: "",
      time: "",
      dialogVisible: false,
      // 表格
      tableData: this.$store.state.data,
      type: 0
    };
  },
  methods: {
    formatterTime(row) {
      let time = row.time || "";
      time = time.match(/\d+/g);
      return `${time[1]}-${time[2]} ${time[3]}:${time[4]}`;
    },
    formatterType(row) {
      return row.state == 1 ? "未完成" : "已完成";
    },
    // 页卡切换
    changeTab(ev) {
      let target = ev.target,
        targetText = target.innerHTML,
        targetTag = target.tagName;
      if (targetTag === "SPAN") {
        this.type = 0;
        if (targetText === "未完成") {
          this.type = 1;
        } else if (targetText === "已完成") {
          this.type = 2;
        }
        this.tableData = this.$store.state.data.filter(item => {
          if (this.type == 0) {
            return true;
          }
          return item.state == this.type;
        });
      }
    },
    // 新增【取消和确定】
    cancelHandle() {
      this.desc = "";
      this.time = "";
      this.dialogVisible = false;
    },
    confirmHandle() {
      // 通知MUTATION中的方法执行
      this.$store.commit("insertDATA", {
        task: this.desc,
        time: this.$utils.queryNowTime(this.time ? this.time : new Date())
      });
      this.cancelHandle();
    },
    // 删除和完成
    handleDelete(scope) {
      this.$store.dispatch("asyncDeleteDATA", {
        id: scope.row.id
      });
    },
    handleUpdate(scope) {
      this.$store.dispatch("asyncUpdateDATA", {
        id: scope.row.id
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  margin: 10px auto;
  width: 600px;

  .headerBox {
    position: relative;
    h2 {
      line-height: 40px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
    }

    .btn-link {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }

  .tabBox {
    padding: 10px 0;
    span {
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .inputDesc {
    line-height: 30px;
  }
}
</style>