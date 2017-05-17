$(document).ready(function () {
    CheckAuthorization();
    var dataObject = { typeID: '005' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbTechnicianType').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbTechnicianType').find('option:first-child').attr('selected', true);
                
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '006' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbGrade').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbGrade').find('option:first-child').attr('selected', true);

        },
        failure: function () {
            alert('Error');
        }
    });

    $('#parentHorizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        tabidentify: 'hor_1', // The tab groups identifier
        activate: function (event) { // Callback function if tab is switched
            var $tab = $(this);
            var $info = $('#nested-tabInfo');
            var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();
        }
    });

    $("#dtReceiveDate").datepicker();
});

function GetData(val) {
    var dataObject = { ID: val }
        //{ ID : @Request.Params["id"]};
    $.ajax(
   {
       url: 'http://localhost:13131/api/Technician',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtTechnicianID").val(data.Table[0].TechnicianNo), $("#txtHRCode").val(data.Table[0].HRCode), $("#txtFirstName").val(data.Table[0].FirstName), $("#txtLastName").val(data.Table[0].LastName), $("#cmbTechnicianType").val(data.Table[0].TechnicianType),
            $("#txtIDcard").val(data.Table[0].IDCard), $("#txtPosition").val(data.Table[0].Position), $("#cmbGrade").val(data.Table[0].Grade);
       },
       error: function (msg) {
           alert(msg);
       }

   });
}