$(document).ready(function () {
    CheckAuthorization();
    $("#quotationBody").on("click", "tr", function (e) {
        $("#txtQuoNo").val($(this).find("td:eq(1)").text());
        $("#hidQuoID").val($(this).find("td:eq(1)").text());
    })

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

function CreateData() {
    //var x = new Userlogin()
    //alert(x.UserID);
    var dataObject = {
        Docver: 1, QuotationNo: $("#hidQuoID").val(), Remark: $("#txtRemark").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID']
    };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/BDC',
        type: 'POST',
        async: false,
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            alert('Create is completed');
            window.location.href = "../BDC/EditBDC?id=" + data;
        }
        ,
        error: function (msg) {
            alert(msg)
        }
    });
}

