$(document).ready(function () {
    $("#productBody").on("click", "tr", function (e) {
        $("#hidProductID").val($(this).find("td:eq(1)").text());
        $("#txtSerial").val($(this).find("td:eq(2)").text());
        $("#txtBrand").val($(this).find("td:eq(4)").text());
        $("#txtModel").val($(this).find("td:eq(6)").text());
        $("#txtSize").val($(this).find("td:eq(5)").text());
    });
});
function BrowseProduct() {
    //-------------------------filter------------------------
    $("#searchInput").keyup(function () {
        //hide all the rows
        $("#productBody").find("tr").hide();

        //split the current value of searchInput
        var data = this.value.split(" ");
        //create a jquery object of the rows
        var jo = $("#productBody").find("tr");

        //Recusively filter the jquery object to get results.
        $.each(data, function (i, v) {
            jo = jo.filter("*:contains('" + v + "')");
        });
        //show the rows that match.
        jo.show();
        //Removes the placeholder text

    }).focus(function () {
        this.value = "";
        $(this).css({ "color": "black" });
        $(this).unbind('focus');
    }).css({ "color": "#C0C0C0" });
    //-------------------------filter------------------------
    $.ajax(
           {
               url: 'http://alphagroup.co.th:8082/api/Product',
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
function CheckBorrow()
{
    var BorrowAmount = $("#txtAmount").val();
    var dataObject = { ProductID: $("#hidProductID").val()};
    $.ajax(
           {
               url: 'http://alphagroup.co.th:8082/api/JobOrderBorrow',
               type: 'GET',
               datatype: 'json',
               data: dataObject,
               success: function (data) {
                   data = JSON.parse(data);
                   if (data.Table[0].Amount < BorrowAmount) {
                       alert('จำนวนที่ยืมต้องน้อยกว่าหรือเท่ากับจำนวนคงเหลือ');
                       $("#txtAmount").val(0);
                   }

               },
               error: function (msg) {
                   alert(msg)
               }
           });
}
function CheckReturn() {
    var borrowAmount = $('#txtAmount').val();
    var returnAmount = ($('#txtReturnGood').val() + $('#txtReturnLost').val() + $('#txtReturnRepair').val() + $('#txtReturnBad').val())
    if (borrowAmount != returnAmount)
    {
        alert('จำนวนที่คืนจะต้องเท่ากับจำนวนที่ยืม กรุณาใส่ข้อมูลให้ถูกต้อง');
    }
}
function CreateData() {
    var input = window.location.href;
    var after = input.split('?')[1]
    var ID = after.split('-');
    var dataObject = {
        JobID: ID, ProductID: $("#hidProductID").val(), Amount: $("#txtAmount").val(), Remark: $("#txtRemark").val(), ReturnGood: $("#txtReturnGood").val(), ReturnLost: $("#txtReturnLost").val(), ReturnRepair: $("#txtReturnRepair").val(), ReturnBad: $("#txtReturnBad").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID']
    };
    $.ajax(
    {
        url: 'http://alphagroup.co.th:8082/api/JobOrderBorrow',
        type: 'POST',
        async: false,
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            //alert(data);
            //alert('Create is completed')
            window.location.href = "../Borrow/EditBorrow?id=" + data;
        }
        ,
        error: function (msg) {
            alert(msg)
        }
    });
}