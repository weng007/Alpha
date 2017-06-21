$(document).ready(function () {
    //CheckAuthorization();
    $.ajax({
        url: 'http://localhost:8082/api/SecurityProfile/',
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbSecurityProfile').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Profile));
            });
            $('#cmbSecurityProfile').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
});
//function ControlEnable(Isview) {
//    //var Isview = val;
//    if (Isview) {
//        document.getElementById("cmbStatus").disabled = true;
//        document.getElementById("cmbSecurityProfile").disabled = true;
//        document.getElementById("btnSave").disabled = true;
//    }
//}
function GetData(val) {
    var dataObject = { UserID: val + '&' + localStorage['UserName'] + '&' + localStorage['Password'] }
    $.ajax(
   {
       url: 'http://localhost:8082/api/UserLogin',
       type: 'GET',
       async: false,
       data : dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtUserName").val(data.Table[0].UserName), $("#txtFirstName").val(data.Table[0].FirstName), $("#txtLastName").val(data.Table[0].LastName), $("#txtEmail").val(data.Table[0].Email), $("#cmbSecurityProfile").val(data.Table[0].SecurityID), $("#txtDepartment").val(data.Table[0].Department), $("#txtCompany").val(data.Table[0].Company);
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var dataObject = { ID: val, Status: $("#cmbStatus").find(":selected").val(), SecurityID: $("#cmbSecurityProfile").find(":selected").val(), EditBy: localStorage['UserID'] }
    console.log($("#cmbSecurityProfile").find(":selected").val());
       $.ajax(
        {
            url: 'http://localhost:8082/api/UserLogin',
            type: 'PUT',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                Redirect();
            },
            error: function (msg) {
                alert(msg);
            }           
        })
};
function Redirect() {
    window.location = "../User/IndexUser";
}

