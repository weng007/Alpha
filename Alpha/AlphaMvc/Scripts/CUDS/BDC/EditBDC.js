$(document).ready(function () {
    CheckAuthorization();
    $("#quotationBody").on("click", "tr", function (e) {
        $("#txtQuoNo").val($(this).find("td:eq(2)").text());
        $("#hidQuoID").val($(this).find("td:eq(1)").text());
    })
});
function BrowseQuotation() {
    $.ajax(
      {
          url: 'http://localhost:13131/api/Quotation',
          type: 'GET',
          datatype: 'json',
          success: function (data) {
              data = JSON.parse(data);
              var html = '';
              for (var i = 0; i < data.Table.length; i++) {
                  html += '<tr>';
                  html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                  html += '<td class="hidecolumn" data-dismiss="modal">' + data.Table[i].ID + '</td>';
                  html += '<td data-dismiss="modal">' + data.Table[i].QuoNo + '</td>';
                  html += '<td data-dismiss="modal">' + data.Table[i].Detail + '</td>';
                  html += '<td data-dismiss="modal">' + data.Table[i].Name + '</td>';
                  html += '<td data-dismiss="modal">' + data.Table[i].Price + '</td>';
                  html += '</tr>';
              }
              document.getElementById("quotationBody").innerHTML = html;
          },
          error: function (msg) {
              alert(msg)
          }
      });
}

function GetDocversion() {
    var x;
    x = parseInt($("#txtDocver").val());
    var Docver = x + 1;
    $("#txtDocver").val(Docver);
}
function ControlEnable(Isview) {
    //var Isview = val;
    if (Isview) {
        document.getElementById("txtDocver").disabled = true;
        document.getElementById("txtQuoNo").disabled = true;
        document.getElementById("txtRemark").disabled = true;
        document.getElementById("btnSave1").disabled = true;
        document.getElementById("imgQuotation").disabled = true;
        $('#btnversionUpdate').removeClass('btnnewversionUpdate');
        $('#btnversionUpdate').addClass('btnnewversionCreate');
        $('[id="btnversionUpdate"]').prop('onclick', null).off('click');
    }
}
function GetData(val) {
   
    var dataObject = { ID: val }
    //alert('test val '+val);
    $.ajax(
       {
           url: 'http://localhost:13131/api/BDC',
           type: 'GET',
           async: false,
           data: dataObject,
           datatype: 'json',
           success: function (data) {
               data = JSON.parse(data);
               var Price = data.Table1[0].Price;
               var Cost = data.Table1[0].Cost;
               var Profit = Price - Cost;
               $("#txtDocver").val(data.Table[0].Docver), $("#txtQuoNo").val(data.Table[0].QuoNo), $("#txtBDCNo").val(data.Table[0].BDCNo), $("#hidQuoID").val(data.Table[0].QuotationNo), $("#txtRemark").val(data.Table[0].Remark),
               $("#txtPrice").val(data.Table1[0].Price).number(true, 2), $("#txtCost").val(data.Table1[0].Cost).number(true, 2);
               if (Profit < 0) {
                   $("#txtProfit").number(true, 2).val(Profit).css('color', 'red');
               }
               else {
                   $("#txtProfit").number(true, 2).val(Profit).css('color', 'black');
               }
           },
           error: function (msg) {
               alert(msg);
           }
       });
}
function Update(val) {
    var dataObject = {
        ID: val, Docver: $("#txtDocver").val(), QuotationNo: $("#hidQuoID").val(), Remark: $("#txtRemark").val(), EditBy: localStorage['UserID']};
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/BDC',
        type: 'PUT',
        async: false,
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            alert('Update is completed');
        }
        ,
        error: function (msg) {
            alert(msg);
        }
    });
}
function Redirect() {
    window.location = "IndexBDC";
}
function OpenJobOrder(val) {
    window.location.href = "../JobOrder/CreateJobOrder?id=" + val + '&' + $("#txtBDCNo").val();
}