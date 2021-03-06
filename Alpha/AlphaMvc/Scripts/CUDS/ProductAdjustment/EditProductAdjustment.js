﻿$(document).ready(function () {
    CheckAuthorization();
    $("#quotationBody").on("click", "tr", function (e) {
        $("#hidProductID").val($(this).find("td:eq(1)").text());
        $("#txtSerialNo").val($(this).find("td:eq(2)").text());
        $("#txtBrand").val($(this).find("td:eq(3)").text());
        $("#txtSize").val($(this).find("td:eq(5)").text());
        $("#txtModel").val($(this).find("td:eq(4)").text());
        $("#txtRemain").val($(this).find("td:eq(6)").text());
    })
    //$('#txtDeduction').val(0);
    //$('#chkAdd').prop('checked', true);
    //document.getElementById("txtDeduction").disabled = true;
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
                       $('#ShowDialog').modal('show');
                       var html = '<div class="modal-dialog modal-dialog-danger">';
                       html += '<div class="modal-content">';
                       html += '<div class="modal-header modal-header-danger">';
                       html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
                       html += '<h4 class="modal-title">Product Adjust</h4>';
                       html += '</div>';
                       html += '<div class="modal-body modal-body-danger">จำนวนที่ยืมต้องน้อยกว่าหรือเท่ากับจำนวนคงเหลือ</br></br></div>';
                       html += '<div class="modal-footer">';
                       html += '<button type="button" class="btn btn-danger" data-dismiss="modal">OK</button>';
                       html += '</div></div></div>';
                       document.getElementById("ShowDialog").innerHTML = html;
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
        $('#ShowDialog').modal('show');
        var html = '<div class="modal-dialog modal-dialog-danger">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header modal-header-danger">';
        html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        html += '<h4 class="modal-title">Product Adjust</h4>';
        html += '</div>';
        html += '<div class="modal-body modal-body-danger">จำนวนที่คืนจะต้องเท่ากับจำนวนที่ยืม กรุณาใส่ข้อมูลให้ถูกต้อง</br></br></div>';
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btn btn-danger" data-dismiss="modal">OK</button>';
        html += '</div></div></div>';
        document.getElementById("ShowDialog").innerHTML = html;
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
function CheckAdd() {
    var IsAdd = $('#chkAdd').is(":checked");
    if (IsAdd) {
        $('#txtDeduction').val(0);
        $('#chkDeduct').prop('checked', false);
        $('#txtAdded').focus();
        document.getElementById("txtDeduction").disabled = true;
        document.getElementById("txtAdded").disabled = false;
    }
}
function CheckDeduct() {
    var IsDeduct = $('#chkDeduct').is(":checked");

    if (IsDeduct) {
        $('#txtAdded').val(0);
        $('#chkAdd').prop('checked', false);
        $('#txtDeduction').focus();
        document.getElementById("txtAdded").disabled = true;
        document.getElementById("txtDeduction").disabled = false;
    }
}
function BrowseProducts() {
    //-------------------------filter------------------------
    $("#searchInput").keyup(function () {
        //hide all the rows
        $("#quotationBody").find("tr").hide();

        //split the current value of searchInput
        var data = this.value.split(" ");
        //create a jquery object of the rows
        var jo = $("#quotationBody").find("tr");

        //Recusively filter the jquery object to get results.
        $.each(data, function (i, v) {
            //jo = jo.filter("*:contains('" + v + "')");
            jo = jo.filter(function () {
                return $(this).text().toLowerCase().indexOf(v.toLowerCase()) > -1;
            });
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
          url: 'http://localhost:13131/api/Product',
          type: 'GET',
          datatype: 'json',
          success: function (data) {
              data = JSON.parse(data);
              var html = '';
              for (var i = 0; i < data.Table.length; i++) {
                  html += '<tr>';
                  html += '<td data-dismiss="modal" class="bodypadding-10">' + data.Table[i].RowNum + '</td>';
                  html += '<td data-dismiss="modal" Class="hidecolumn">' + data.Table[i].ID + '</td>';
                  html += '<td data-dismiss="modal" class="bodypadding-10">' + data.Table[i].SerialNo + '</td>';
                  html += '<td data-dismiss="modal" class="bodypadding-10">' + data.Table[i].Brand + '</td>';
                  html += '<td data-dismiss="modal" class="bodypadding-10">' + data.Table[i].Model + '</td>';
                  html += '<td data-dismiss="modal" class="bodypadding-10">' + data.Table[i].Size + '</td>';
                  html += '<td data-dismiss="modal" class="bodypadding-10">' + data.Table[i].StockRemain + '</td>';
                  //html += '<td data-dismiss="modal class="hideANDseek">' + data.Table[i].Detail + '</td>';
                  html += '</tr>';
              }
              document.getElementById("quotationBody").innerHTML = html;
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
           
           $("#txtSerialNo").val(data.Table[0].SerialNo),
           $("#txtBrand").val(data.Table[0].Brand), 
           $("#txtModel").val(data.Table[0].Model), 
           $("#txtSize").val(data.Table[0].Size),
           $("#hidProductID").val(data.Table[0].ProductID), 
           $("#txtDocRef").val(data.Table[0].DocRef), 
           $("#txtAdded").val(data.Table[0].Added), 
           $("#txtDeduction").val(data.Table[0].Deduction),
           $('#txtRemain').val(data.Table[0].remain)
           //GetDetail();
       },
       error: function (msg) {
           alert(msg);
       }

   });
    var Add1 = $('#txtAdded').val();
    if (Add1 > 0) {
        $('#chkAdd').prop('checked', true);
        $('#chkDeduct').prop('checked', false);
        $('#txtAdded').focus();
        document.getElementById("txtDeduction").disabled = true;
        document.getElementById("txtAdded").disabled = false;
    }
    else {
        $('#chkAdd').prop('checked', false);
    }
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
                 //alert('Update is completed');
                 Redirect();
             },
             error: function (msg) {
                 alert(msg);
             }
         })
};
function Redirect() {
    window.location.href = "../ProductAdjust/IndexProductAdjust";
}

