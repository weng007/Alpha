$(document).ready(function () {
    $("#UserLogin").click(function () {
        var dataObject = { UserName: $("#txtUserName").val(), Password: $("#txtpassword").val() };
        //console.log(dataObject);
        var IsExists = false;
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
                    }
                }

                if (IsExists) {
                    alert("test");
                    Redirect();
                }
                else {
                    alert('User is not found');
                }

            },
            error: function (msg) {
                alert(msg)
            }
        });
    });
});

function Redirect()
{
    window.location = "http://localhost:1042/Home/index";        
}
