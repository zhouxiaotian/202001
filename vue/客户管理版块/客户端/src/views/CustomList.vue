<template>
  <div class="customListBox">
    <!-- 搜索区域 -->
    <div class="searchBox">
      <el-input v-model="searchText" placeholder="请输入内容"></el-input>
      <el-select v-model="type">
        <el-option label="全部客户" value></el-option>
        <el-option label="重点客户" value="重点客户"></el-option>
        <el-option label="一般客户" value="一般客户"></el-option>
        <el-option label="放弃客户" value="放弃客户"></el-option>
      </el-select>
      <el-button type="primary" @click="searchHandle">搜索</el-button>
      <el-button type="success" @click="exportExcel">导出EXCEL</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table
      stripe
      height="78vh"
      size="small"
      ref="table"
      v-loading="loading"
      element-loading-text="小主，奴家正在努力加载中"
      @selection-change="selectionChange"
      :data="tableList"
    >
      <el-table-column type="selection" min-width="5%" header-align="center" align="center"></el-table-column>
      <el-table-column prop="id" label="编号" min-width="5%"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="10%"></el-table-column>
      <el-table-column prop="sex" label="性别" min-width="8%" :formatter="formatterSex"></el-table-column>
      <el-table-column prop="phone" label="电话" min-width="15%"></el-table-column>
      <el-table-column prop="weixin" label="微信" min-width="15%" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="类别" min-width="10%"></el-table-column>
      <el-table-column prop="userName" label="业务员" min-width="10%"></el-table-column>
      <el-table-column label="操作" min-width="20%">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="goToVisit(scope)">回访</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div class="pageBox" v-if="tableList.length">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :small="true"
        :total="total"
        :page-size.sync="limit"
        :current-page.sync="page"
        @current-change="changePage"
        @prev-click="changePage"
        @next-click="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import xlsx from "xlsx";

export default {
  name: "CustomList",
  data() {
    return {
      searchText: "",
      type: "",
      tableList: [],
      selectionData: [],
      loading: false,
      // 分页控制
      limit: 15,
      total: 0,
      page: 1
    };
  },
  created() {
    this.queryData();
  },
  methods: {
    // qq:()=>{},
    // 性别格式化
    formatterSex(row, column, cellValue) {
      return row.sex == 0 ? "男" : "女";
    },
    // 选择多个数据
    selectionChange(val) {
      // val存储是选中的值
      this.selectionData = val;
    },
    // 跳转到回访详情
    goToVisit(scope) {
      this.$router.push(`/visit/${scope.row.id}`);
    },
    // 获取数据
    async queryData() {
      this.loading = true;
      await this.$utils.delay(500);

      let { limit, page, searchText: search, type } = this;
      let result = await this.$api.custom.queryCustomList({
        limit,
        page,
        type,
        search
      });
      this.selectionData = [];
      if (result.code != 0) {
        this.tableList = [];
        return;
      }
      this.tableList = result.data;
      this.total = +result.total;
      this.page = +result.page;
      this.limit = +result.limit;

      this.loading = false;
    },
    // 搜索操作
    searchHandle() {
      this.page = 1;
      this.queryData();
    },
    // 分页处理
    changePage(num) {
      this.page = num;
      this.queryData();
    },
    // 批量导出EXCEL
    async exportExcel() {
      let selectionData = this.selectionData;
      if (selectionData.length === 0) {
        this.$utils.message(this, {
          message: "小主，请您先选择要导出的数据~~"
        });
        return;
      }
      let loading = this.$loading({
        text: "小主，请您稍后，奴家正在玩命为您处理中...",
        background: "rgba(0,0,0,.5)"
      });
      await this.$utils.delay();

      selectionData = this.$utils.formatJSONWeet(selectionData);
      let sheet = xlsx.utils.json_to_sheet(selectionData),
        book = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(book, sheet, "客户列表");
      xlsx.writeFile(book, `customlist${new Date().getTime()}.xlsx`);

      loading.close();
      this.selectionData = [];
      this.$refs.table.clearSelection();
    }
  },
  watch: {
    $route(to, from) {
      if (from.path === "/upload") {
        // 从批量上传页面回来的
        this.page = 1;
        this.searchText = "";
        this.type = "";
        this.queryData();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.searchBox {
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  padding: 10px 60px;
  height: 12vh;

  .el-input,
  .el-select,
  .el-button {
    margin-right: 10px;
    margin-left: 0 !important;
  }

  .el-input {
    width: 30% !important;
  }

  .el-select {
    width: 20% !important;
    .el-input {
      width: 100% !important;
    }
  }
}

.pageBox {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  height: 10vh;
}
</style>