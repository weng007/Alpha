$(document).ready(function () {

    var dataObject = { typeID: '003' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbProductType').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbProductType').find('option:first-child').attr('selected', true);
                
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '004' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbUnitWeight').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbUnitWeight').find('option:first-child').attr('selected', true);

        },
        failure: function () {
            alert('Error');
        }
    });

    $("#dtReceiveDate").datepicker();
});

function GetData(val) {
    var dataObject = { ID: val}
        //{ ID : @Request.Params["id"]};
    $.ajax(
   {
       url: 'http://localhost:13131/api/Product/',
       type: 'GET',
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtSerialNo").val(data.Table[0].SerialNo),$("#txtMachineNo").val(data.Table[0].MachineNo), $("#cmbProductType").val(data.Table[0].ProductType),
           $("#txtBrand").val(data.Table[0].Brand),$("#txtSize").val(data.Table[0].Size),$("#txtModel").val(data.Table[0].Model),$("#txtLifetime").val(data.Table[0].Lifetime),
           $("#dtReceiveDate").val(data.Table[0].ReceiveDate),$("#cmbUnitWeight").val(data.Table[0].UnitWeight),$("#txtBalance").val(data.Table[0].Balance),$("#txtRemain").val(data.Table[0].Remain),$("#txtLost").val(data.Table[0].Lost),$("#txtRepair").val(data.Table[0].Repair),$("#txtBreak").val(data.Table[0].Break),$("#txtRemark").val(data.Table[0].Remark);
       },
       error: function (msg) {
           alert(msg);
       }

   });
}

function Update(val) {
    var dataObject = {ID: val, SerialNo: $("#txtSerialNo").val(), MachineNo: $("#txtMachineNo").val(), ProductType: $("#cmbProductType").find(":selected").val(), Brand: $("#txtBrand").val(),
        Size: $("#txtSize").val(), Model: $("#txtModel").val(), Lifetime: $("#txtLifetime").val(), ReceiveDate: $("#dtReceiveDate").val(),
        UnitWeight: $("#cmbUnitWeight").find(":selected").val(), Balance: $("#txtBalance").val(), Remain: $("#txtRemain").val(), Lost: $("#txtLost").val(), Repair: $("#txtRepair").val(),
        Break: $("#txtBreak").val(), Remark: $("#txtRemark").val()
    };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/Product/Put',
        type: 'PUT',
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            alert('Update is completed');
            top.location.href = "/Products/IndexProducts";
        }
        ,
        error: function (msg) {
            alert(msg);
        }
    });
}