let name = document.getElementsByClassName('name')[0];
let moblephone = document.getElementsByClassName('moblephone')[0];
let submit = document.getElementsByClassName('submit')[0];
var xhr = new XMLHttpRequest();

function ajx() {
    if (name.value == '' || moblephone.value == '') {
        alert('输入信息不能为空，请重新输入');
        return;
    }
    var data = "username=" + name.value + "&number=" + moblephone.value;
    xhr.open('POST', '/addUser', false);
    xhr.onreadystatechange = function() {
        // readyState == 4说明请求已完成
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 304) {
                console.log(xhr.response);
                if (xhr.response == 'faile') {
                    alert("该电话已经被占用,请重新输入电话号码");
                    return;
                }
                alert("添加成功，点击确定将跳转到通讯录界面！");
                window.location.href = "http://localhost:3000/user/addresslist.html";
            }
        }
    }

    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
}
submit.addEventListener('click', ajx, true);