import {
  http
} from '../../utils/util'
Page({
  data: {
    list: [{
      til: "零基础就业课",
      children: []
    }, {
      til: "前端工程化",
      children: []
    }, {
      til: "前端框架课",
      children: []
    }]
  },
  onLoad(options) {
    this.getData();
  },
  getData() {
    http.get('/classList').then(data => {
      console.log(data)
      let temp = [{
        til: "零基础就业课",
        children: []
      }, {
        til: "前端工程化",
        children: []
      }, {
        til: "前端框架课",
        children: []
      }];
      temp[0].children = data.data.level1;
      temp[1].children = data.data.level2;
      temp[2].children = data.data.level3;
      this.setData({
        list:temp
      })
    })
  }
});