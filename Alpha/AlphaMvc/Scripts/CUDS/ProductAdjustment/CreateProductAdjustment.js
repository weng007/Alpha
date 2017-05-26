$(document).ready(function () {
    CheckAuthorization();
    $("#quotationBody").on("click", "tr", function (e) {
        $("#hidSerialID").val($(this).find("td:eq(1)").text());
        $("#txtSerialNo").val($(this).find("td:eq(2)").text());
        $("#txtBrand").val($(this).find("td:eq(3)").text());
        $("#txtSize").val($(this).find("td:eq(5)").text());
        $("#txtModel").val($(this).find("td:eq(4)").text());
        $("#txtRemain").val($(this).find("td:eq(6)").text());
    })

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
          url: 'http://localhost:13131/api/Product',
          type: 'GET',
          datatype: 'json',
          success: function (data) {
              data = JSON.parse(data);
              var html = '';
              for (var i = 0; i < data.Table.length; i++) {
                  html += '<tr>';
                  html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                  html += '<td data-dismiss="modal" Class="hidecolumn">' + data.Table[i].ID + '</td>';
                  html += '<td data-dismiss="modal">' + data.Table[i].SerialNo + '</td>';
                  html += '<td data-dismiss="modal">' + data.Table[i].Brand + '</td>';
                  html += '<td data-dismiss="modal">' + data.Table[i].Model + '</td>';
                  html += '<td data-dismiss="modal">' + data.Table[i].Size + '</td>';
                  html += '<td data-dismiss="modal">' + data.Table[i].Remain + '</td>';
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

function CreateData() {
    //var x = new Userlogin()
    //alert(x.UserID);
    var dataObject = {
        ProductID: $("#hidSerialID").val(), DocRef: $("#txtDocRef").val(), Added: $("#txtAdded").val(),
        Lost: $("#txtLost").val(), Repair: $("#txtRepair").val(), Break: $("#txtBreak").val(),
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
            alert('Create is completed');
            //alert(data);
            window.location.href = "../ProductAdjust/EditProductAdjust?id=" + data;
        }
        ,
        error: function (msg) {
            alert(msg)
        }
    });
}

