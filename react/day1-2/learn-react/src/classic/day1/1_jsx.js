import React from 'react'
import logo from '../../logo.svg'

// jsx ：babel处理前的jsx语法
/* 
  再JSX中,组件 只能有一个根元素 跟VUE一样
  react中的模板中的变量 是写在 {只能写变量或者表达式 不能写语句} 中的； VUE是写在{{}}中的
  react中的模板（html结构）中的变量值 不能是 对象,可以是数组，但是数组中不能有对象
  结构中的行内属性 也是用的{} 跟普通用发没有区别；
  行内属性 不能使用 JS关键字 class->className  for--> htmlFor
  行内样式的时候 必须写成一个对象的形式

  react中的循环 的核心 就是在对应的位置放一个数组，数组中粗存放的都是各种与对应数据结合好的结构
*/
let a = '我很帅';
let obj = {a:123};
let ary = [100,200,300];
let bol = true;
let sty = {
  color:'red',
  fontSize:'30px'
}

function H1(props){
  console.log(props)
  return <h1 className={props.className || 'box'}>
    这是一个H1组件
  </h1>
}
function fn(n){
  return <i>{n%2?'奇数':'偶数'}</i>
}
var nameAry = [{name:"小红",age:10},{name:"小红2",age:20},{name:"小红3",age:30},{name:"小红4",age:40},]
function List(){
  let a = [];
  for(let i = 0 ; i < nameAry.length; i++){
    a.push(<li key={i}>姓名：{nameAry[i].name}；年龄：{nameAry[i].age}</li>)
  }
  return  (<ul>
    {
      //[<i>100</i>,<i>200</i>,<i>300</i>] 
      //nameAry.map(item=><li key={item.name}>姓名是：{item.name}；年纪是：{item.age}</li>)
      a
    }
  </ul>)
}


function My() {
  let a = '我很帅666';
  return <div className='box'>
    <List/>
    {a}
    <span style={sty}>{obj.a}</span>
    <span style={{color:'blue'}}>{ary}{bol}</span>
    <H1 className='h1'/>
    <H1 qqq='123'/>
    <H1 www='324'/>
    <H1 eee='666'/>
    <div>
      2是{fn(2)};
      3是{fn(3)}
    </div>



    <img src={logo} alt=""/>

    <input type="checkbox" id='ck'/>
    <label htmlFor="ck">点击它就相当于点击了input</label>
  </div>
}
export default My