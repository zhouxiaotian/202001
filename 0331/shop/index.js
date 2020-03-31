// 先去获取数据
let ary = [];
function getData(){
  // 使用 ajax（是用来获取数据的一种技术） 去获取数据
  let xhr = new XMLHttpRequest();// 创造一个ajax实例
  xhr.open('get','./data.json');// 告诉这个实例以一种什么样的方式(get) 去哪里(路径)获取数据
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      //能够进入这个条件中  证明 我们已经获取到了数据
      let data = JSON.parse(xhr.response);// 把JSON字符串 转成 对象
      console.log(data);
      ary = data;
      render(data);// 当获取到数据之后 再去渲染数据；
    }
  }
  xhr.send();
}
getData();

// 渲染数据
function render(data=[]) {
  // 负责把给到的数据渲染到页面上
  // 把数据中的每一条数据转成带结构的li  然后再放到对应的ul中即可
  // innerHTML
  let str = '';// 用来存储拼接的结构（li）
  data.forEach(item=>{
    str += `<li class='li_box'>
              <div class="img_box">
                <img src="${item.img}" alt="">
              </div>
              <h2>${item.title}</h2>
              <div class="price_box">
                <span class="price">￥${item.price.toFixed(2)}</span>
                <span class="select_icon">多款可选</span>
              </div>
              <ul class="feature_box">
                <li>好使</li>
                <li>限时抢购</li>
              </ul>
              <div class="comment_box">
                <span>${item.num}人评价</span>
                <span>99%好评</span>
              </div>
            </li>`
  })
  let ul = document.querySelector('.phone_list_box');
  ul.innerHTML = str;
}

// 点击排序  点击的时候 把数据按照指定的参数进行排序 然后重新render;

let timeBtn = document.getElementsByClassName('sort_btn')[1];
timeBtn.flag = 1;
timeBtn.onclick = function(){
  
  // 把数据按照 时间进行排序  然后 再去执行render函数
  console.log(ary)
  this.flag *= (-1)
  let temp = ary.sort((a,b)=>{
    return (a.time - b.time)*this.flag;
  })
  render(temp);
}
