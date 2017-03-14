$(document).ready(function () {
    $("#btnCancel").click(function () {
        $("#txtUserName").val("")
        $("#txtPassword").val("")
    });

});
function UserLogin() {
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
            if (data.Table.length > 0)
            {
                localStorage['UserID'] = data.Table[0].ID;
                localStorage['UserName'] = data.Table[0].UserName;
                location = "../Technician/ExpiredTechnician";
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

