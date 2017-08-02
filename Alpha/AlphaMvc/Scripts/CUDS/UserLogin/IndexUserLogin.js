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

            //alert(data.ADUser.length);
            if (data != null && data.ADUser.length > 0)
            {
                localStorage['UserID'] = data.ADUser[1].ID;
                localStorage['UserName'] = data.ADUser[1].UserName;
                    localStorage['Password'] = $("#txtPassword").val();
                    localStorage['IsTechnician'] = data.ADUser[1].Technician;
                    localStorage['FirstName'] = data.ADUser[1].FirstName;
                    localStorage['LastName'] = data.ADUser[1].LastName;
                
                    
                 //location = "../Home/DashBoard";
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
    var dataObject = { UserID: String(localStorage['UserID']) };
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

                if (data.Table[i].MenuDetailID == "MN001") {
                    //if (data.Table[i].Role > 0) {
                        //ถ้าไม่มีสิทธ์ Dashboard ให้ Redirect ไปหน้า IncomeMaster
                        location = "../Home/DashBoard";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN002") {
                    //if (data.Table[i].Role > 0) {
                        //ถ้ามีสิทธ์ดู IncomeMaster ให้ Redirect ไปหน้า IndexIncomeMaster (Admin)
                        location = "../IncomeMaster/IndexIncomeMaster";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN003") {
                    //if (data.Table[i].Role > 0) {
                        //ถ้ามีสิทธ์ดู ExpenseMaster ให้ Redirect ไปหน้า IndexExpenseMaster (Admin)
                        location = "../ExpenseMaster/IndexExpenseMaster";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN004") {
                    //if (data.Table[i].Role > 0) {
                        //ถ้ามีสิทธ์ดู SecurityProfile ให้ Redirect ไปหน้า IndexSecurityProfile (Admin)
                        location = "../SecurityProfile/IndexSecurityProfile";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN005") {
                    //if (data.Table[i].Role > 0) {
                        //ถ้ามีสิทธ์ดู User ให้ Redirect ไปหน้า IndexUser (Admin)
                        location = "../User/IndexUser";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN006") {
                    //if (data.Table[i].Role > 0) {
                        //ถ้ามีสิทธ์ดู User ให้ Redirect ไปหน้า IndexUser (Admin)
                        location = "../AllActivity/AllActivity";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN007") {
                    //if (data.Table[i].Role > 0) {
                        location = "../CalendarJob/IndexCalendarJob";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN008") {
                    //if (data.Table[i].Role > 0) {
                        location = "../CalendarManPower/IndexCMP";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN009") {
                    //if (data.Table[i].Role > 0) {
                        location = "../Technician/IndexTechnician";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN010") {
                    //if (data.Table[i].Role > 0) {
                        location = "../ExpiredTechnician1/ExpiredTechnician1";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN011") {
                    //if (data.Table[i].Role > 0) {
                        //ถ้ามีสิทธ์ดู Technician ให้ Redirect ไปหน้า IndexProducts(Products)
                        location = "../Products/IndexProducts";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN012") {
                    //if (data.Table[i].Role > 0) {
                        location = "../ProductAdjust/IndexProductAdjust";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN013") {
                    //if (data.Table[i].Role > 0) {
                        location = "../Requisition/IndexRequisition";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN014") {
                    //if (data.Table[i].Role > 0) {
                        //ถ้ามีสิทธ์ดู Technician ให้ Redirect ไปหน้า IndexBDC (BDC)
                        location = "../BDC/IndexBDC";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN015") {
                    //if (data.Table[i].Role > 0) {
                        location = "../JobOrder/IndexJobOrder";
                        break;
                    //}
                }
                else if (data.Table[i].MenuDetailID == "MN017") {
                    //if (data.Table[i].Role > 0) {
                        //ถ้ามีสิทธ์ Technician ให้ Redirect ไปหน้า IndexWageTeachnician (WageTeachnician)
                        location = "../WageTeachnician/IndexWageTeachnician";
                        break;
                    //}
                }
                    //ReportJobOrder
                else if (data.Table[i].MenuDetailID == "MN018") {

                    //if (data.Table[i].Role > 0) {
                        //ถ้ามีสิทธ์ ReportJobOrder ให้ Redirect ไปหน้า IndexReportJobOrder (ReportJobOrder)
                        location = "../ReportJobOrder/IndexReportJobOrder";
                        break;
                    //}
                }
                    //ReportJobOrder
                else if (data.Table[i].MenuDetailID == "MN019") {
                    //if (data.Table[i].Role > 0) {
                        location = "../ReportBorrow/IndexRptBorrow";
                        break;
                    //}
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

