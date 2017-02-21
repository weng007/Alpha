$(document).ready(function () {
    $("#btnCancel").click(function () {
        $("#txtUserName").val("")
        $("#txtPassword").val("")
    });

});
function UserLogin() {
    alert('test');
    var dataObject = { Password: $("#txtUserName").val()+'-'+ $("#txtPassword").val() };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/UserLogin',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            alert('test2');
            alert(data.Table.length);
            if (data.Table.length > 0)
            {
                localStorage['UserID'] = data.Table[0].ID;
                localStorage['UserName'] = data.Table[0].UserName;
                alert(localStorage['UserID']);
                alert(localStorage['UserName']);
                location = "http://localhost:1042/Home/index";
            }else 
            {
                alert("User is not found");
            }
        },
        error: function (msg) {
            alert(msg)
        }
    });
}
//function GetUserName() {
//    document.getElementById("lblUserName").innerHTML = localStorage['UserName'];
//}

