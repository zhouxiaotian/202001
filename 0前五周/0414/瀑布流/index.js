var pblModule = (function(){
  // 获取所有的列
  let $columns = $('.column');
  let flag = true;
  let timer = null;
  let count = 0;
  // 从后台获取数据
  let getData = function(){
    // xhr.open('get','./json/data.json',false)
    $.ajax({
      url:'./json/data.json',
      method:'get',// JQ默认是get
      // async:false,
      success:function(mydata){
        // data 就是从后台获取的数据
        console.log(mydata);
        count ++;
        render(mydata)
        lazyLoadImg();
        // flag = true;// 当新数据重新渲染完成之后 才能再次让flag编程true;
      }
    })
  }
  // 获取完数据之后 渲染数据
  let render = function(data=[]){
    console.log(data)
    data.forEach((item,index)=>{
      // item代表数组中的每一项；
      // 230 / item.width = h / item.height
      let h = (230*item.height)/item.width;
      let str = `<div class="card">
                  <a href="${item.link}">
                    <div class="lazyImageBox" style='height:${h}px'>
                      <img src="" alt="" data-image="${item.pic}">
                    </div>
                    <p>${item.title}</p>
                  </a>
                </div>`;
      // $columns  一个有三个元素，   n 只能是 0 1 2；
      // index  0   1   2  3  4  5  6
      //  n     0   1   2  0  1  2  0
      // 有以上规律 我们可以直到 n  是 index取 3  的余数
      // let n = index%3;
      // $columns.eq(n).append(str);
      // 以上的这种方式填充 有可能导致最后会出现明显的长短不一；
      // 我们采用方式： 每次填充时都去查找到最矮的那个 columns；
      // console.log([...$columns])
      let el= [...$columns].sort((a,b)=>{
        return a.offsetHeight - b.offsetHeight
      })[0];// sort的结果 时排好序的数组；数组中第一项才是最矮的哪个；
      $(el).append(str)
    })
  }
  let lazyLoadImg = function(){
      let $imgs = $('.container img');
      // T用来存储 卷去高度 加上 页面的高度 其实就是 页面底边的那块内容距离 body顶部的距离
      let $window = $(window);// 把原生对象转成JQ对象
      // $window.outerHeight() 获取的是一屏幕的高度
      // $window.scrollTop()   获取的是卷去的高度
      let T = $window.outerHeight() + $window.scrollTop();
      [...$imgs].forEach((item,index)=>{
          // item 代表每一个图片 原生ＤＯＭ
          let $item = $(item);
          if($item.css('opacity') == 1)return;//说明这种图已经加载过了；
          let h = $item.offset().top;// 获取的是图片顶边到body顶边的偏移量
          if(h < T){
              // 证明 图片的顶边已经露出来了；
              let src = $item.attr('data-image');// 获取真实图片的地址；
              $item.attr('src',src);// 把真实图片的地址赋给img的src属性；
              $item.on('load',function () {
                  // 代表 图片已经加载完成；
                  $item.css('opacity',1);
              })
          }
      })
  }
  let loadMore = function(){
    let $window = $(window);
    let T = $window.outerHeight() + $window.scrollTop();// 可视窗口底边到body顶边的距离
    let el = [...$columns].sort((a,b)=>{
      return a.offsetHeight - b.offsetHeight
    })[0];
    let $el = $(el);// 原生ODM对象转成JQ对象 $(原生DOM对象)
    // 最矮的这个元素的底边到body顶边的距离
    let h = $el.offset().top + $el.outerHeight();
    if(h < T){
      if(count > 3){
        alert('666')
        return;
      }
      // 证明最矮的column 底边露出来了
      // 重新加载新数据
      // if(!flag)return;
      // flag = false;
      // getData(); 
      clearTimeout(timer);
      timer = setTimeout(() => {
        getData(); 
      }, 200);
    }
  }
  return {
    init(){
      getData();
      window.onscroll = function(){
        // 当页面滚动时 执行图片懒加载
        loadMore();
        lazyLoadImg();
      }
    }
  }
})();
pblModule.init();