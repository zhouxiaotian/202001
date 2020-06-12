<template>
  <div class="container">
    <!-- HEADER -->
    <header class="headerBox">
      <h2>TASK LIST</h2>
      <el-link type="primary" class="btn-link" @click="dialogVisible=true">新增任务</el-link>
    </header>

    <!-- TAB -->
    <section class="tabBox">
      <el-tag type="success">全部</el-tag>
      <el-tag type="info">未完成</el-tag>
      <el-tag type="info">已完成</el-tag>
    </section>

    <!-- TABLE -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="编号" width="50"></el-table-column>
      <el-table-column prop="task" label="任务描述" width="240"></el-table-column>
      <el-table-column prop="state" label="状态" width="80"></el-table-column>
      <el-table-column prop="time" label="完成时间" width="130" :formatter="formatterTime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope>
          <el-button size="small" type="text">删除</el-button>
          <el-button size="small" type="text">完成</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- DIALOG -->
    <el-dialog title="新增任务" :visible.sync="dialogVisible" width="50%">
      <div>
        <p class="inputDesc">请输入任务的描述信息:</p>
        <el-input type="textarea" :rows="2"></el-input>
        <p class="inputDesc">请设置预期完成时间：</p>
        <el-date-picker type="datetime" v-model="test"></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "task",
  data() {
    return {
      test: "",
      dialogVisible: false,
      tableData: [
        {
          id: 1,
          task: "我今天临时安排的一个任务，下午我们需要进行模拟考试",
          state: 1,
          time: "2020-06-13 18:00:00"
        }
      ]
    };
  },
  methods: {
    formatterTime(row) {
      let time = row.time || "";
      time = time.match(/\d+/g);
      return `${time[1]}-${time[2]} ${time[3]}:${time[4]}`;
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