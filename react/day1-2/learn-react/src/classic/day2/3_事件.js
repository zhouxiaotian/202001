import React from 'react';
import ReactDOM from 'react-dom';
/* 
  在react中 想要更改数据之后 触发视图更新   必须调用  setState
  setState 更新数据（大部分）是一个异步操作，
  异步操作 是为了可以把多次setState 合并成一次 最后再去渲染最终的数据
  类似于VUE的DOM更新
  setState  不能用在render函数中；

*/
class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       count:100
    //     }
    // }
    state = {
      // 等同于 在 constructor中编写 this.state = {}
      count:100,
      name:111
    }
    add = (e)=>{
      // 能够保证当前方法中的this是实例
      // console.log(e.target)
      // console.log("+") 
      // console.log(this)
      // this.state.count++;
      // this.setState({
      //   count:this.state.count ++  // this.state.count ++ 表达式的结果就是100 ；count变成101
      // });
      // console.log(this.state.count)

      /* this.state.count ++;
      this.state.name = '6666';
      this.setState({});
      console.log(this.state.count) */

      this.setState({
        count:this.state.count + 1
      },function(){
        // 数据更新之后触发
        console.log(this.state.count)
      })

    }
    add2(){
      // console.log(arguments)
      // console.log(this)
    }
    minus(){
      // console.log("-") 
      // console.log(this)
      // console.log(arguments)
    }
    render() {
        let {count} = this.state ;
        var q = 0;
        return <div className=''>
            当前数字是{count}
            {/* 
              在react中  事件使用的都是驼峰命名 
              <div onClick={对应的函数体}>
              我们一般把方法放到共有属性上；
            */}
            <button onClick={this.add}>+</button>

            {/* 
              当点击元素的时候  执行的是这个箭头函数；
              这个箭头函数中等个儿this是render中的this 
              通过this.add2() 执行 add2函数  那么 add2中的this 就成看点了
            */}
            <button onClick={(ev)=>{this.add2(ev,12,2,3,4)}}>+</button>


            <button  onClick={this.minus.bind(this,1,2,3,4)}>-</button>
        </div>;
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))