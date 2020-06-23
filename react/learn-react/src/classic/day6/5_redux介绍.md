### redux  和 react  没有任何关系  只是redux常使用在react中
### react-redux  是把 redux和react进行了一个链接

redux 和  react-redux 这两者是为了 解决 组件之间的数据交互问题

----
> redux 怎么创建store? 从redux中导入 createStore方法， 执行这个方法 并给他 传一个reducer
> 这个 reducer是我们（使用redux的人） 自己创建的一个函数，里边的写法基本是固定死的
> createStore执行的结果 就是我么你需要的  store
>  以上 就是 redux的基本用法
-----
>创建好store之后  怎么用在 react中？  需要使用  react-redux 这个插件
> react-redux 第一步：  在主入口从 react-redux中 引入 Provider组件，并使用这个组件
> 把 跟组件包起来， 然后在这个组件的行内写一个 store的属性， 对应的值就是 redux产生的那个store
> 第二步  怎么在组件中使用 redux中的数据？
> 把 你要使用redux数据的组件 使用 connect这个高阶组件处理一下
```javascript
  组件名 = conncect(回调函数1,回调函数2)(组件名)
  回调函数1==》 (state)=>{return {属性：属性值}}  会把回调函数1的返回的这个对象 传递给 对应的组件

  回调函数2===》 (dispatch)=>{return {dispatch:dispatch} 这个回调函数返回一个对象 这个对象中 只放了一个 dispatch属性， react-redux也把这对属性 传给 对应的组件

  也就是说 经过这个回调函数  我们对应的组件  会 收到两个回调函数的返回值合并起来的所有属性

  若想更改 redux中的数据 需要 借助 dispatch
  dispatch这个方法执行的时候 需要传一个对象 对象中 有 type和一个自定一的属性，我们一般把这个对象称为 action; 这个type对应的就是我们reducer里写的哪个 action.type
```

> 哪个组件需要使用或者更改redux中的数据  都需要把组件使用 connect处理一下
> 假如 我们要新增一个redux数据的时候， 第一步 去创造对应的reducer
>                 reducer有两个作用  1. 给state初始值  2，修改state
> 第二步  去createStore哪里 合并刚创建的reducer