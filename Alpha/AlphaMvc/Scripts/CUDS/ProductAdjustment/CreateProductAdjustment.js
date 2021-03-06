﻿$(document).ready(function () {
    CheckAuthorization();
    $("#quotationBody").on("click", "tr", function (e) {
        $("#hidProductID").val($(this).find("td:eq(1)").text());
        $("#txtSerialNo").val($(this).find("td:eq(2)").text());
        $("#txtBrand").val($(this).find("td:eq(3)").text());
        $("#txtSize").val($(this).find("td:eq(5)").text());
        $("#txtModel").val($(this).find("td:eq(4)").text());
        $("#txtRemain").val($(this).find("td:eq(6)").text());
        $("#txtRemain").val($(this).find("td:eq(6)").text());
    })

    $('#txtDeduction').val(0);
    $('#chkAdd').prop('checked', true);
    document.getElementById("txtDeduction").disabled = true;

    //$('#parentHorizontalTab').easyResponsiveTabs({
    //    type: 'default', //Types: default, vertical, accordion
    //    width: 'auto', //auto or any width like 600px
    //    fit: true, // 100% fit in a container
    //    tabidentify: 'hor_1', // The tab groups identifier
    //    activate: function (event) { // Callback function if tab is switched
    //        var $tab = $(this);
    //        var $info = $('#nested-tabInfo');
    //        var $name = $('span', $info);
    //        $name.text($tab.text());
    //        $info.show();
    //    }
    //});

});

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
          async:false,
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
function CheckAdd()
{
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
function GetRemain(val) {
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
               $('#txtRemain').val(data.Table[0].Amount);
           },
           error: function (msg) {
               alert(msg);
           }

       });
}

function CreateData() {
    //var x = new Userlogin()
    //alert(x.UserID);
    var dataObject = {
        ProductID: $("#hidProductID").val(), DocRef: $("#txtDocRef").val(), Added: $("#txtAdded").val(),
        Deduction: $("#txtDeduction").val(),
        CreateBy: localStorage['UserID'], EditBy: localStorage['UserID']
    };
    console.log(dataObject);
        $.ajax(
        {
            url: 'http://localhost:13131/api/ProductAdjustment',
            type: 'POST',
            async: false,
            data: dataObject,
            datatype: 'json',

            success: function (data) {
                //window.location.href = "../ProductAdjust/EditProductAdjust?id=" + data;
                Redirect();
            }
            ,
            error: function (msg) {
                alert(msg)
            }
        });
}
function Redirect() {
    window.location.href = "../ProductAdjust/IndexProductAdjust";
}

