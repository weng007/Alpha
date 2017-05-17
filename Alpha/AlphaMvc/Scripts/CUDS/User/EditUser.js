$(document).ready(function () {
    CheckAuthorization();
    var dataObject = { typeID: '012' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbStatus').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbStatus').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

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
        document.getElementById("cmbStatus").disabled = true;
        document.getElementById("cmbSecurityProfile").disabled = true;
        document.getElementById("btnSave").disabled = true;
    }
}
function GetData(val) {
    var dataObject = { ID: val}
    $.ajax(
   {
       url: 'http://localhost:13131/api/UserLogin',
       type: 'GET',
       async: false,
       data : dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtFirstName").val(data.Table[0].FirstName), $("#txtLastName").val(data.Table[0].LastName), $("#txtEmail").val(data.Table[0].Email)
           , $("#cmbStatus").val(data.Table[0].Status), $("#cmbSecurityProfile").val(data.Table[0].SecurityID);
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
            url: 'http://localhost:13131/api/UserLogin',
            type: 'PUT',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                alert('Update is completed');
            },
            error: function (msg) {
                alert(msg);
            }           
        })
};
function Redirect() {
    window.location = "IndexUser";
}

