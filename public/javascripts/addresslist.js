let tbody = document.getElementsByClassName('tbody')[0];

function ajx() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/addresslist', false);
    xhr.onreadystatechange = function() {
        // readyState == 4说明请求已完成
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 304) {
                /*    console.log(xhr.response); */
                let result = xhr.response;
                console.log(result);
                if (result === {}) {

                } else {
                    /*  sucess(); */
                    let mid = Object.keys(JSON.parse(result));
                    console.log(result)
                    sucess(mid, JSON.parse(result));
                }
            }
        }
    }
    xhr.send();
}
ajx();

function sucess(mid, data) {
    for (let i = 0; i < mid.length; i++) {
        let row = tbody.insertRow();
        let key = mid[i];
        row.innerHTML = ` 
        <tr >
          <td>${mid[i]}</td>
          <td>${data[key]}</td>
          <td><a href="#"  onclick='change(this)'>删除</a></td>
         
       </tr>`
    }

}

function change(node) {
    let thistr = node.parentNode.parentNode;
    let tds = thistr.getElementsByTagName('td');
    let message = confirm("确定删除此联系人？");
    let data = "number=" + tds[1].innerHTML;
    if (message) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/deleteUser', false);
        xhr.onreadystatechange = function() {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    /*    console.log(xhr.response); */
                    if (xhr.response == 1) {
                        /*  if (rtc.mid === 1) {
                             console.log("jiance")
                             rtc.mid = 0;
                             location.href = '/';
                         } */
                        alert("删除成功！");
                        window.location.href = "http://localhost:3000/user/addresslist.html";
                    } else {
                        window.location.href = "http://localhost:3000/user/addresslist.html";
                    }
                }
            }
        }
        xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);

    }




}