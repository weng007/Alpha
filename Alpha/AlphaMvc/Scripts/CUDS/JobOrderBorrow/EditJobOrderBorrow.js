
function GetData(val) {
    var dataObject = { ID: val}
    $.ajax(
   {
       url: 'http://localhost:13131/api/JobOrderBorrow',
       type: 'GET',
       async: false,
       data : dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtBrand").val(data.Table[0].Brand), $("#txtSerial").val(data.Table[0].Serial), $("#txtModel").val(data.Table[0].Model), $("#txtSize").val(data.Table[0].Size), $("#txtAmount").val(data.Table[0].Amount), $("#txtRemark").val(data.Table[0].Remark), $("#txtReturnGood").val(data.Table[0].ReturnGood), $("#txtReturnLost").val(data.Table[0].ReturnLost),
            $("#txtReturnRepair").val(data.Table[0].ReturnRepair),  $("#txtReturnBad").val(data.Table[0].ReturnBad)
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var dataObject = {
        ID: val, Brand: $("#txtBrand").val(), Serial: $("#txtSerial").val(), Model: $("#txtModel").val(), Size: $("#txtSize").val(), Amount: $("#txtAmount").val(), Remark: $("#txtRemark").val(), ReturnGood: $("#txtReturnGood").val(), ReturnLost: $("#txtReturnLost").val(),
        ReturnRepair: $("#txtReturnRepair").val(), ReturnBad: $("#txtReturnBad").val()
    }

       $.ajax(
        {
            url: 'http://localhost:13131/api/JobOrderBorrow',
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
    window.location = "IndexIncomeMaster";
}

