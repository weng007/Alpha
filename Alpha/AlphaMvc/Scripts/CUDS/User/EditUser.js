$(document).ready(function () {
    //CheckAuthorization();
    $.ajax({
        url: 'http://localhost:13131/api/SecurityProfile/',
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
function ControlEnable(Isview) {
    //var Isview = val;
    if (Isview) {
        document.getElementById("cmbSecurityProfile").disabled = true;
        document.getElementById("btnSave").disabled = true;
    }
}
function GetData(val) {
    var dataObject = { userName1: val + '&' + localStorage['UserName'] + '&' + localStorage['Password'] }
    $.ajax(
   {
       url: 'http://localhost:13131/api/UserLogin',
       type: 'GET',
       async: false,
       data : dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtUserName").val(data.ADUser[0].UserName),
           $("#txtFirstName").val(data.ADUser[0].FirstName),
           $("#txtLastName").val(data.ADUser[0].LastName),
           $("#txtEmail").val(data.ADUser[0].Email),
           $("#cmbSecurityProfile").val(data.ADUser[0].SecurityID),
           $("#txtDepartment").val(data.ADUser[0].Department),
           $("#txtCompany").val(data.ADUser[0].Company),
           $("#txtTitle").val(data.ADUser[0].Title);
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    //alert("TestUpdateUser");
    //alert("Value " + val);
    //alert("Profile "+$("#cmbSecurityProfile").find(":selected").val());
    var dataObject = {
        ID: val,
        SecurityID: $("#cmbSecurityProfile").find(":selected").val(),
        UserName: $("#txtUserName").val(),
        FirstName: $("#txtFirstName").val(),
        LastName: $("#txtLastName").val(),
        Email: $("#txtEmail").val(),
        EditBy: localStorage['UserID']
    };
    console.log($("#cmbSecurityProfile").find(":selected").val());
       $.ajax(
        {
            url: 'http://localhost:13131/api/UserLogin',
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

