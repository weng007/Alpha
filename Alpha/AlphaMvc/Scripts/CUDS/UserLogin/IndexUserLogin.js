$(document).ready(function () {
    $("#UserLogin").click(function () {
        alert("test0");
        var dataObject = { UserName: $("#txtUserName").val(), Password: $("#txtpassword").val() };
        //console.log(dataObject);
        var IsExists = false;
        var html = '<body>';
        $.ajax(
        {
            url: 'http://localhost:13131/api/UserLogin',
            type: 'GET',
            async: false,
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                for (var i = 0; i < data.Table.length; i++) {
                    if (dataObject.UserName == data.Table[i].UserName) {
                        console.log(dataObject.UserName);
                        IsExists = true;
                        var val = IsExists;
                    }
                }

                if (IsExists) {
                    alert('Insert');
                }
                else {
                    alert('User is not found');
                }

                document.getElementById("result").innerHTML = html;
                alert(html);
            },
            error: function (msg) {
                alert(msg)
            }
        });
    });
});

//function init()
//{
//    window.location = "http://localhost:1042/Technician/indexTechnician";        
//}
