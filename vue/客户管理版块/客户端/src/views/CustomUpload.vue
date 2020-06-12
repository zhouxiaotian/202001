<template>
  <div class="customUploadBox">
    <el-upload
      drag
      action
      :auto-upload="false"
      :show-file-list="false"
      accept=".xlsx, .xls"
      :on-change="changeFile"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "CustomUpload",
  methods: {
    changeFile(file) {}
  }
};
</script>

<style lang="less" scoped>
.customUploadBox {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
}
</style>