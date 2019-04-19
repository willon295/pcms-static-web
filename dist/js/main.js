function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function signOut() {
    $.removeCookie('user', {path: "/"});
    $(window).attr("location", "login.html")
}

function checkUser() {
    var user = $.cookie('user');
    if (user == null) {
        $(window).attr("location", "login.html");
    }

}


function deployDev(v) {
    var v1 = $(v);
    // 取得值
    let attr = v1.attr("value");
    var reg = new RegExp("'", "g");
    var v2 = attr.replace(reg, "\"");
    var deployCondition = JSON.parse(v2);
    var requestHost = "http://localhost:8080";
    // 异步发送处理

    $.ajax({
        url: requestHost + "/deploy",
        type: "POST",
        data: JSON.stringify(deployCondition),
        dataType: "JSON",
        contentType: "application/json",
        success: function (res) {
            alert("成功")
        },
        error: function (res) {
            alert("部署失败原因：" + res)
        }

    })
}

/**
 * 测试通过
 * @param v 参数
 */
function devTestPass(v) {
    var v1 = $(v);
    var hostname = v1.attr("value");
    var requestHost = "http://localhost:8080";
    $.ajax({
        url: requestHost + "/testPass/" + hostname,
        type: "PUT",
        success: function (res) {
            console.log(res)
        },
        error: function (res) {
            alert("部署失败原因：" + res)
        }

    })
}

