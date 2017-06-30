$(document).ready(function () {
    CheckAuthorization();
    $("#quotationBody").on("click", "tr", function (e) {
        $("#txtQuoNo").val($(this).find("td:eq(1)").text());
        $("#hidQuoID").val($(this).find("td:eq(1)").text());
    })
});
function BrowseQuotation() {
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
          url: 'http://localhost:13131/api/Quotation',
          type: 'GET',
          datatype: 'json',
          success: function (data) {
              data = JSON.parse(data);
              var html = '';
              for (var i = 0; i < data.Table.length; i++) {
                  //alert(data.Table[i].QuoteId);
                  html += '<tr>';
                  html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                  html += '<td data-dismiss="modal">' + data.Table[i].QuoteId + '</td>';
                  html += '<td data-dismiss="modal">' + data.Table[i].PotentialCustomer + '</td>';
                  html += '<td data-dismiss="modal" class="hideANDseek">' + new Intl.NumberFormat('en-IN').format(data.Table[i].TotalAmount) + '</td>';
                  html += '<td data-dismiss="modal" class="hideANDseek">' + data.Table[i].RevisionNumber + '</td>';
                  html += '<td data-dismiss="modal" class="hideANDseek">' + data.Table[i].Owner + '</td>';
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
               $("#txtDocver").val(data.Table[0].Docver), $("#txtQuoNo").val(data.Table[0].QuotationNo), $("#txtBDCNo").val(data.Table[0].BDCNo), $("#hidQuoID").val(data.Table[0].QuotationNo), $("#txtRemark").val(data.Table[0].Remark),
               $("#txtPrice").val(data.Table1[0].Price).formatNumber({ format: "#,###.00", locale: "us" }), $("#txtCost").val(data.Table1[0].Cost).formatNumber({ format: "#,###.00", locale: "us" });
               if (Profit < 0) {
                   $("#txtProfit").formatNumber({ format: "#,###.00", locale: "us" }).val(Profit).css('color', 'red');
               }
               else {
                   $("#txtProfit").formatNumber({ format: "#,###.00", locale: "us" }).val(Profit).css('color', 'black');
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
            Redirect();
        }
        ,
        error: function (msg) {
            alert(msg);
        }
    });
}
function Redirect() {
    window.location.href = "../BDC/IndexBDC";
}
function OpenJobOrder(val) {
    window.location.href = "../JobOrder/CreateJobOrder?id=" + val + '&' + $("#txtBDCNo").val();
}
function OpenRptBDC(val) {
    //alert("test");
    window.location.href = "../Reports/FormReport/RptBDCViewer.aspx?id=" + val;
}