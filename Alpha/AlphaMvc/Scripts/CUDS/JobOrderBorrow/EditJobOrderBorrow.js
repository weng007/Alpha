$(document).ready(function () {
    $("#productBody").on("click", "tr", function (e) {
        $("#hidProductID").val($(this).find("td:eq(1)").text());
        $("#txtSerial").val($(this).find("td:eq(2)").text());
        $("#txtBrand").val($(this).find("td:eq(4)").text());
        $("#txtModel").val($(this).find("td:eq(3)").text());
        $("#txtSize").val($(this).find("td:eq(5)").text());
    });
});
function BrowseProduct() {
    $.ajax(
           {
               url: 'http://localhost:13131/api/Product',
               type: 'GET',
               datatype: 'json',
               success: function (data) {
                   data = JSON.parse(data);
                   var html = '';
                   for (var i = 0; i < data.Table.length; i++) {
                       //alert(data.Table[i].CustNo);
                       html += '<tr>';
                       html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                       html += '<td class="hidecolumn" data-dismiss="modal">' + data.Table[i].ID + '</td>';
                       html += '<td data-dismiss="modal">' + data.Table[i].SerialNo + '</td>';
                       html += '<td data-dismiss="modal">' + data.Table[i].MachineNo + '</td>';
                       html += '<td data-dismiss="modal">' + data.Table[i].Brand + '</td>';
                       html += '<td data-dismiss="modal">' + data.Table[i].Size + '</td>';
                       html += '<td data-dismiss="modal">' + data.Table[i].Model + '</td>';
                       html += '</tr>';
                   }
                   document.getElementById("productBody").innerHTML = html;

               },
               error: function (msg) {
                   alert(msg)
               }
           });
}
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
           $("#hidProductID").val(data.Table[0].ProductID), $("#txtBrand").val(data.Table[0].Brand), $("#txtSerial").val(data.Table[0].SerialNo), $("#txtModel").val(data.Table[0].Model), $("#txtSize").val(data.Table[0].Size), $("#txtAmount").val(data.Table[0].Amount), $("#txtRemark").val(data.Table[0].Remark), $("#txtReturnGood").val(data.Table[0].ReturnGood), $("#txtReturnLost").val(data.Table[0].ReturnLost),
            $("#txtReturnRepair").val(data.Table[0].ReturnRepair), $("#txtReturnBad").val(data.Table[0].ReturnBad), $('#hidJobID').val(data.Table[0].JobID)
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var dataObject = {
        ID: val, ProductID: $("#hidProductID").val(), Amount: $("#txtAmount").val(), Remark: $("#txtRemark").val(), ReturnGood: $("#txtReturnGood").val(), ReturnLost: $("#txtReturnLost").val(),ReturnRepair: $("#txtReturnRepair").val(), ReturnBad: $("#txtReturnBad").val(), EditBy: localStorage['UserID']}

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

    var hidJobID = $('#hidJobID').val();
    window.location.href = "../JobOrder/EditJobOrder?id=" + hidJobID;
}

