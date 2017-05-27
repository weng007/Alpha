﻿$(document).ready(function () {
    CheckAuthorization();
    $("#productBody").on("click", "tr", function (e) {
        $("#hidProductID").val($(this).find("td:eq(1)").text());
        $("#txtSerial").val($(this).find("td:eq(2)").text());
        $("#txtBrand").val($(this).find("td:eq(4)").text());
        $("#txtModel").val($(this).find("td:eq(3)").text());
        $("#txtSize").val($(this).find("td:eq(5)").text());
    });
});
function CheckBorrow() {
    var BorrowAmount = $("#txtAmount").val();
    var dataObject = { serialNo: $("#txtSerial").val() + '&' + $("#txtBrand").val() + '&' + $("#txtModel").val() + '&' + $("#txtSize").val() };
    $.ajax(
           {
               url: 'http://localhost:13131/api/JobOrderBorrow',
               type: 'GET',
               datatype: 'json',
               data: dataObject,
               success: function (data) {
                   data = JSON.parse(data);
                   if (data.Table[0].Amount < BorrowAmount) {
                       alert('จำนวนที่ยืมต้องน้อยกว่าหรือเท่ากับจำนวนคงเหลือ');
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
    if (borrowAmount != returnAmount) {
        alert('จำนวนที่คืนจะต้องเท่ากับจำนวนที่ยืม กรุณาใส่ข้อมูลให้ถูกต้อง');
    }
    //else if(borrowAmount == returnAmount)
    //{
    //    $('#hidReturn').val(1);
    //}
}
function GetRemain(val) {
    var remain;
    var dataObject = { ProductID: val };
    $.ajax(
       {
           url: 'http://localhost:13131/api/JobOrderBorrow',
           type: 'GET',
           async: false,
           data: dataObject,
           datatype: 'json',
           success: function (data) {
               data = JSON.parse(data);
               //alert(remain)
               remain = data.Table[0].Amount;
           },
           error: function (msg) {
               alert(msg);
           }

       });

    return remain
}
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
                       html += '<td data-dismiss="modal" class="bodypadding-10">' + data.Table[i].RowNum + '</td>';
                       html += '<td data-dismiss="modal" Class="hidecolumn">' + data.Table[i].ID + '</td>';
                       html += '<td data-dismiss="modal" class="bodypadding-10">' + data.Table[i].SerialNo + '</td>';
                       html += '<td data-dismiss="modal" class="bodypadding-10">' + data.Table[i].Brand + '</td>';
                       html += '<td data-dismiss="modal" class="bodypadding-10">' + data.Table[i].Model + '</td>';
                       html += '<td data-dismiss="modal" class="bodypadding-10">' + data.Table[i].Size + '</td>';
                       html += '<td data-dismiss="modal" class="bodypadding-10">' + GetRemain(data.Table[i].ID) + '</td>';
                       html += '</tr>';
                   }
                   document.getElementById("productBody").innerHTML = html;

               },
               error: function (msg) {
                   alert(msg)
               }
           });
}
function GetDetail()
{
    var dataObject = { ProductID: $("#hidProductID").val() };
    $.ajax(
       {
           url: 'http://localhost:13131/api/JobOrderBorrow',
           type: 'GET',
           async: false,
           data: dataObject,
           datatype: 'json',
           success: function (data) {
               data = JSON.parse(data);
               //alert(remain)
               $('#txtRemain').val(data.Table[0].Amount);
           },
           error: function (msg) {
               alert(msg);
           }

       });
}
function GetData(val) {
    var dataObject = { ID: val }
    //alert("Test"+val);
    $.ajax(
   {
       url: 'http://localhost:13131/api/ProductAdjustment',
       type: 'GET',
       async: false,
       data : dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           //totalremain = remain+
           
           $("#txtSerialNo").val(data.Table[0].SerialNo), $("#txtBrand").val(data.Table[0].Brand), $("#txtModel").val(data.Table[0].Model), $("#txtSize").val(data.Table[0].Size),
           $("#hidProductID").val(data.Table[0].ProductID), $("#txtDocRef").val(data.Table[0].DocRef), $("#txtAdded").val(data.Table[0].Added), $("#txtDeduction").val(data.Table[0].Deduction)
           GetDetail();
       },
       error: function (msg) {
           alert(msg);
       }

   });
}

function Update(val) {
    $("#hidID").val(val);
    var dataObject = {
        ID:val, ProductID: $("#hidProductID").val(), DocRef: $("#txtDocRef").val(), Added: $("#txtAdded").val(),
        Deduction: $("#txtDeduction").val(),
        CreateBy: localStorage['UserID'], EditBy: localStorage['UserID']
    };
    console.log(dataObject);

       $.ajax(
        {
            url: 'http://localhost:13131/api/ProductAdjustment',
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

    var hidAdjustID = $('#hidID').val();
    window.location.href = "../ProductAdjust/EditProductAdjust?id=" + hidAdjustID;
}

