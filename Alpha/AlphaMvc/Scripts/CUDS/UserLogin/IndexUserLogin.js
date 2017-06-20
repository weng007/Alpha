$(document).ready(function () {
    $("#btnCancel").click(function () {
        $("#txtUserName").val("")
        $("#txtPassword").val("")
    });


    $('#txtUserName').keypress(function (e) {
        if (e.keyCode == 13) {  // detect the enter key
            $('#btnLogin').click();
        }
    });
    $('#txtPassword').keypress(function (e) {
        if (e.keyCode == 13) {  // detect the enter key
            $('#btnLogin').click();
        }
    });
});
function UserLogin() {
    var dataObject = { userName: $("#txtUserName").val() + '&' + $("#txtPassword").val() };
    //alert($("#txtUserName").val());
    //alert($("#txtPassword").val());
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

            if (data != null && data.Table.length > 0)
            {
                    localStorage['UserID'] = data.Table[0].ID;
                    localStorage['UserName'] = data.Table[0].UserName;
                    localStorage['Password'] = $("#txtPassword").val();
                    localStorage['IsTechnician'] = data.Table[0].Technician;
                    //location = "../Technician/ExpiredTechnician";
                    CheckAuthorization();
            }
            else
            {
                alert("Username is not found or invalid username or password");
            }
        },
        error: function (msg) {
            alert(msg)
        }
    });
}
function CheckAuthorization() {
    var dataObject = { ID: localStorage['UserID'] };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/CheckAuthorization',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            //alert(data.Table.length);
            for (var i = 0; i < data.Table.length; i++) {
                if (data.Table[i].MenuName == "Dashboard") {

                    if (data.Table[i].Role > 0) {
                        //���������Է�� Dashboard ��� Redirect �˹�� IncomeMaster
                        location = "../Technician/ExpiredTechnician";
                        break;
                    }
                }
                else if (data.Table[i].MenuName == "Administration") {
                    if (data.Table[i].Role >= 0) {
                        //������Է��� Administration ��� Redirect �˹�� IndexIncomeMaster (Admin)
                        location = "../IncomeMaster/IndexIncomeMaster";
                        break;
                    }
                }
                else if (data.Table[i].MenuName == "Carlendar") {
                    if (data.Table[i].Role > 0) {
                        //������Է��� Carlendar ��� Redirect �˹�� IndexIncomeMaster (Calendar)
                        location = "../CalendarJob/IndexCalendarJob";
                        break;
                    }
                }
                else if (data.Table[i].MenuName == "Technician") {
                    if (data.Table[i].Role > 0) {
                        //������Է��� Technician ��� Redirect �˹�� IndexTechnician (Technician)
                        location = "../Technician/IndexTechnician";
                        break;
                    }
                }
                else if (data.Table[i].MenuName == "Products") {
                    if (data.Table[i].Role > 0) {
                        //������Է��� Technician ��� Redirect �˹�� IndexProducts(Products)
                        location = "../Products/IndexProducts";
                        break;
                    }
                }
                else if (data.Table[i].MenuName == "BDC") {
                    if (data.Table[i].Role > 0) {
                        //������Է��� Technician ��� Redirect �˹�� IndexBDC (BDC)
                        location = "../BDC/IndexBDC";
                        break;
                    }
                }
                else if (data.Table[i].MenuName == "Payment") {
                    
                    if (data.Table[i].Role > 0) {
                        //������Է�� Technician ��� Redirect �˹�� IndexWageTeachnician (WageTeachnician)
                        location = "../WageTeachnician/IndexWageTeachnician";
                        break;
                    }
                }
                else {
                    location = "../Login/IndexLogin";
                }
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

