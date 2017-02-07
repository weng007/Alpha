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

    $("#Create").click(function () {
        alert("test0");
        var dataObject = {
            Docver: 1, QuotationNo: $("#hidQuoID").val(), Price: $("#txtPrice").val(), Cost: $("#txtCost").val(),
            Profit: $("#txtProfit").val(), Remark: $("#txtRemark").val()
        };
        console.log(dataObject);
        $.ajax(
        {
            url: 'http://localhost:13131/api/BDC',
            type: 'POST',
            data: dataObject,
            datatype: 'json',

            success: function (data) {
                alert(data);
                if (data == true) {
                    alert('Create is completed');
                    window.location = "http://localhost:1042/BDC/IndexBDC";
                }
                //alert('Create is completed')
                //window.location.href = 'http://localhost:1042/BDC/IndexBDC';
            }
            ,
            error: function (msg) {
                alert(msg)
            }
        });
    });

    $('#parentHorizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        tabidentify: 'hor_1', // The tab groups identifier
        activate: function (event) { // Callback function if tab is switched
            var $tab = $(this);
            var $info = $('#nested-tabInfo');
            var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();
        }
    });

});