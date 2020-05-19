let btn = document.querySelector('#btn');
btn.onclick = function(){
  let val = todo.value;
  todo.value = '';
  let xhr = new XMLHttpRequest;
  xhr.open('get','/add?val='+val);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      console.log(xhr.response)
      render();
    }
  }
  xhr.send();
}
function render(){
  let xhr = new XMLHttpRequest;
  xhr.open('get','/list');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      let str = '';
      let ary = JSON.parse(xhr.response);
      ary.forEach(item=>{
        str += `<li>${item}</li>`
      })
      ul.innerHTML = str;
    }
  }
  xhr.send();
}
render();