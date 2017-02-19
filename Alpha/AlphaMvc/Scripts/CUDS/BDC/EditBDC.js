$(document).ready(function () {
    $("#quotationBody").on("click", "tr", function (e) {
        $("#txtQuoNo").val($(this).find("td:eq(2)").text());
        $("#hidQuoID").val($(this).find("td:eq(1)").text());
    })

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
});
function GetDocversion() {
    var x;
    x = parseInt($("#txtDocver").val());
    var Docver = x + 1;
    $("#txtDocver").val(Docver);
}
function GetData(val) {
    var dataObject = { ID: val }
    //alert(val);
    $.ajax(
   {
       url: 'http://localhost:13131/api/BDC',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtDocver").val(data.Table[0].Docver), $("#txtQuoNo").val(data.Table[0].QuoNo), $("#hidQuoID").val(data.Table[0].QuotationNo), $("#txtPrice").val(data.Table[0].Price),$("#txtCost").val(data.Table[0].Cost),$("#txtProfit").val(data.Table[0].Profit),$("#txtRemark").val(data.Table[0].Remark);
       },
       error: function (msg) {
           alert(msg);
       }
   });
}
function Update(val) {
    var dataObject = {
        ID: val, Docver: $("#txtDocver").val(), QuotationNo: $("#hidQuoID").val(), Price: 1, Cost: 2,
        Profit: 3, Remark: $("#txtRemark").val(), EditBy: 1
    };
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