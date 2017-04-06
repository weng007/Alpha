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
function CreateData() {
    var input = window.location.href;
    var after = input.split('?')[1]
    var ID = after.split('-');
    //alert(ID);
    alert($("#hidProductID").val());
    var dataObject = {
        JobID: ID, ProductID: $("#hidProductID").val(), Amount: $("#txtAmount").val(), Remark: $("#txtRemark").val(), ReturnGood: $("#txtReturnGood").val(), ReturnLost: $("#txtReturnLost").val(), ReturnRepair: $("#txtReturnRepair").val(), ReturnBad: $("#txtReturnBad").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID']
    };
    $.ajax(
    {
        url: 'http://localhost:13131/api/JobOrderBorrow',
        type: 'POST',
        async: false,
        data: dataObject,
        datatype: 'json',

        success: function (result) {
            alert('Create is completed')
            window.location.href = "../Borrow/EditBorrow?id=" + ID;
        }
        ,
        error: function (msg) {
            alert(msg)
        }
    });
}