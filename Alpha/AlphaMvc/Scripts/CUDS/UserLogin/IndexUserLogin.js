$(document).ready(function () {
    //$("#UserLogin").click(function () {
        
    //});
    var userName = "Shekhar Shete";
    var mySessionVariable = '@Session["' + userName + '"]';
});
function pasuser() {
    var dataObject = { UserName: $("#txtUserName").val(), Password: $("#txtpassword").val() };
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
                    if (dataObject.Password == data.Table[i].Password) {
                        location = "http://localhost:1042/Home/index";
                    } else {
                        alert("Invalid Password")
                    }
                } else {
                    alert("User is not found")
                }
            }
            
            this.UserID = ID;
        },
        error: function (msg) {
            alert(msg)
        }
    });
}

function GetUserLogin(id,flag)
{
    var dataObject = { ID: id };
    var Flag = flag;
    var login;
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
                if (Flag == 0) // GetUserLogin
                {
                    login = data.Table[0].UserName;
                }
                else if (Flag == 1) // GetLoginID
                {
                    login = data.Table[0].ID;
                }

                return login;
            },
            error: function (msg) {
                alert(msg)
            }
        }); 
}


