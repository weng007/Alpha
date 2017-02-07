//------------------ Standard --------------------------
hljs.tabReplace = '    '; // 4 spaces
hljs.initHighlightingOnLoad();

$(function () {

    $("#dtJobDate").datepicker();
    $("#dtSWorking").datepicker();
    $("#dtEWorking").datepicker();
    $("#datepicker4").datepicker();
    $("#datepicker5").datepicker();
    $('#tabManpower').dynoTable2();
    $('#tabSaleOrder').dynoTable3();
    $('#tabInvoice').dynoTable4();
    $('#tabReceipt').dynoTable5();
    $('#tabIncome').dynoTable6();
    $('#tabCost').dynoTable7();

    var dates = new Date();
    $('.timepicker').wickedpicker({ defaultValue: dates.getTime(), twentyFour: true, showSeconds: false });
});

//------------------ Custom --------------------------
function CalSum() {
    $(".RowCal").each(function () {
        var qty = $(this).find(".Quantity").val();
        var price = $(this).find(".Price").val();
        var amount = qty * price;


        $(this).find('.Amount').val(amount).number(true, 2);
        $(this).find('.Price').val(price).number(true, 2);
        $(this).find('.Quantity').val(qty).number(true, 2);
    });
}
function AddRowIncome() {
    $.ajax({
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);

            $('.select1').find("option").remove();
            $.each(data.Table, function (i) {
                $('.select1').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
        },
        failure: function () {
            alert('Error');
        }
    });
}

$(document).ready(function () {
    $("#customerBody").on("click", "tr", function (e) {
        $("#txtCustomerName").val($(this).find("td:eq(3)").text());
        $("#hidCustID").val($(this).find("td:eq(1)").text());
    })

    $.ajax({
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbIncomeType').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbIncomeType').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '001' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbTypeWorking').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbTypeWorking').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '002' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbJobStatus').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbJobStatus').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    $.ajax(
        {
            url: 'http://localhost:13131/api/Customer',
            type: 'GET',
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                var html = '';
                for (var i = 0; i < data.Table.length; i++) {
                    html += '<tr>';
                    html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                    html += '<td class="hidecolumn" data-dismiss="modal">' + data.Table[i].ID + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].CustNo + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].Name + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].Tel + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].Contact + '</td>';
                    html += '</tr>';
                }
                document.getElementById("customerBody").innerHTML = html;

            },
            error: function (msg) {
                alert(msg)
            }
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

function GetData(val) {
    var dataObject = { ID: val}
    $.ajax(
   {
       url: 'http://localhost:13131/api/JobOrder',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtJobNo").val(data.Table[0].JobNo),$("#dtJobDate").val(data.Table[0].JobDate),$("#txtCar").val(data.Table[0].Car),$("#dtSWorking").val(data.Table[0].SWorking),$("#dtEWorking").val(data.Table[0].EWorking),$("#txtJobBy").val(data.Table[0].JobBy),$("#txtIssuedBy").val(data.Table[0].IssuedBy), $("#cmbTypeWorking").val(data.Table[0].TypeWorking), $("#cmbJobStatus").val(data.Table[0].JobStatus),$("#txtDetail").val(data.Table[0].Detail),
             $("#txtCustomerName").val(data.Table[0].Customer),$("#txtJobReference").val(data.Table[0].Brand),$("#txtRemark").val(data.Table[0].Remark),
             $("#txtDiscount").val(data.Table[0].Discount);
       },
       error: function (msg) {
           alert(msg);
       }

   });
}

function Update(val) {
    //alert("test0");
    var dataObject = { ID: val, JobNo: "J001", JobDate: $("#dtJobDate").val(), Car: $("#txtCar").val(), SWorking: $("#dtSWorking").val(), EWorking: $("#dtEWorking").val(), JobBy: $("#txtJobBy").val(), IssuedBy: $("#txtIssuedBy").val(), TypeWorking: $("#cmbTypeWorking").find(":selected").val(), TypeWorking: $("#cmbJobStatus").find(":selected").val(), Detail: $("#txtDetail").val(), Customer: $("#hidCustID").val(), JobReference: 1, Remark: $("#txtRemark").val(), Discount: $("#txtDiscount").val() 
    };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/JobOrder',
        type: 'PUT',
        async: false,
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            alert('Update is completed');
            top.location.href = "/JobOrder/IndexJobOrder";
        }
        ,
        error: function (msg) {
            alert(msg);
        }
    });
}

function Redirect() {
    window.location = "IndexJobOrder";
}