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
function CalSumExpense() {
    $(".RowCal1").each(function () {
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

            $('.Select1').find("option").remove();
            $.each(data.Table, function (i) {
                $('.Select1').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.Select1').find('option:first-child').attr('selected', true);

        },
        failure: function () {
            alert('Error');
        }
    });
}
function AddRowExpense() {
    $.ajax({
        url: 'http://localhost:13131/api/ExpenseMaster',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);

            $('.ExpenseSelect').find("option").remove();
            $.each(data.Table, function (i) {
                $('.ExpenseSelect').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.ExpenseSelect').find('option:first-child').attr('selected', true);

        },
        failure: function () {
            alert('Error');
        }
    });
    var dataObject = { typeID: '010' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $('.unitSelect').find("option").remove();
            $.each(data.Table, function (i) {
                $('.unitSelect').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.unitSelect').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}

function DateWorking()
{
    if ($("#dtSWorking").val() > $("#dtEWorking").val()) {
        $("#dtEWorking").val("")
        alert("Please Input Endworking more than Startworking");
    }
}


$(document).ready(function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = mm + '/' + dd + '/' + yyyy;
    $("#dtSWorking").val(today)
    $("#dtJobDate").val(today)

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
                $('.Select1').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.Select1').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
    $.ajax({
        
        url: 'http://localhost:13131/api/ExpenseMaster',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('.ExpenseSelect').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.ExpenseSelect').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '010' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('.unitSelect').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.unitSelect').find('option:first-child').attr('selected', true);
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

    $("#Create").click(function () {
        var dataObject = { JobDate: $("#dtJobDate").val(), Car: $("#txtCar").val(), SWorking: $("#dtSWorking").val(), EWorking: $("#dtEWorking").val(), JobBy: $("#txtJobBy").val(), IssuedBy: $("#txtIssuedBy").val(), TypeWorking: $("#cmbTypeWorking").find(":selected").val(), TypeWorking: $("#cmbJobStatus").find(":selected").val(), Detail: $("#txtDetail").val(), Customer: $("#hidCustID").val(), JobReference: 1, Remark: $("#txtRemark").val(), Discount: $("#txtDiscount").val() };
        var ID;
        $.ajax(
        {
            url: 'http://localhost:13131/api/JobOrder',
            type: 'POST',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                ID = data;
            }
            ,
            error: function (msg) {
                alert(msg)
            }
        });

        var dataObject = {};
        alert(ID)
        $(".RowCal").each(function () {
                dataObject.JobID = ID;
                dataObject.IncomeType = $(this).find('.Select1').find(":selected").val();
                dataObject.UnitWeight = $(this).find(".UnitWeight").val();
                dataObject.Qty = $(this).find(".Quantity").val();
                dataObject.UnitPrice = $(this).find(".Price").val();
                dataObject.Amount = $(this).find(".Amount").val();

                $.ajax(
                {
                    url: 'http://localhost:13131/api/JobOrderIncome',
                    type: 'POST',
                    async: false,
                    data: dataObject,
                    datatype: 'json',
                    success: function (data) {
                        //ID = data;
                        alert('Create is completed');
                    },
                    error: function (msg) {
                        alert(msg)
                    }
                });
        });
        //var dataObject = { JobID: ID };
        
        //console.log(dataObject);
        //alert('Test');
        ////while (1) { }
        
        //$.ajax(
        //{
        //    url: 'http://localhost:13131/api/JobOrderIncome',
        //    type: 'GET',
        //    async: false,
        //    data: dataObject,
        //    datatype: 'json',
        //    success: function (data) {
        //        data = JSON.parse(data);
        //        alert(data.Table[2].ID);
        //        alert('Test2');
        //        console.log(data);
        //        //while (1) { }
        //        //if (data.Table[2].ID > 0) {
        //        //    //alert(data.Table[2].ID);
        //        //    //$('.Select1').find("option").remove();
        //        //    var html = '<tbody>';
        //        //    for (var i = 0; i < data.Table.length; i++) {
        //        //        html += '<tr class="RowCal">';
        //        //        html += '<td>';
        //        //        html += '<img class="drag-handle" src="/Images/drag.png" alt="click and drag to rearrange" />';
        //        //        html += '</td>';
        //        //        html += '<td> <input id="No" type="text" value="' + data.Table[i].RowNum + '" class="tdno" disabled /></td>';
        //        //        html += '<td class="hidecolumn"><input id="No" type="text" value="' + data.Table[i].ID + '" class="tdID" disabled /></td>';
        //        //        html += '<td> <select id="cmbIncomeType" class="Select1" value="' + data.Table[0].IncomeType + '"></select></td>';
        //        //        html += '<td> <input type="text" id="txtUnitWeight" value="' + data.Table[i].UnitWeight + '" class="UnitWeight text-size80 textright"></td>';
        //        //        html += '<td> <input type="text" id="txtQty" class="Quantity text-size80 textright" value="' + data.Table[i].QuoNo + '" placeholder="0" onchange="CalSum()" /></td>';
        //        //        html += '<td> <input type="text" id="txtUnitPrice" class="Price text-size130 textright" value="' + data.Table[i].UnitPrice + '" placeholder="0" onchange="CalSum()" /></td>';
        //        //        html += '<td> <input type="text" id="txtAmount"  class="Amount text-size165 txtdisablerow" value="' + data.Table[i].Amount + '" disabled></td>';
        //        //        html += '<td> <div class="clone-1"><img class="row-cloner" src="/images/clone.png" alt="Clone Row" /></div></td>';
        //        //        html += '<td> <img class="row-remover" src="@Url.Content("~/images/remove.png")" alt="Remove Row" /></td>';
        //        //        html += '</tr>';
        //        //    }
        //        //    html += '</tbody>';
        //        //}
        //        //document.getElementById("result").innerHTML = html;
        //    },
        //    error: function (msg) {
        //        alert(msg)
        //    }
        //});

        //===================insertJobOrder Expense
        var dataObject = {};
        alert(ID)
        $(".RowCal1").each(function () {
            dataObject.JobID = ID;
            dataObject.ExpenseType = $(this).find('.ExpenseSelect').find(":selected").val();
            dataObject.UnitWeight = $(this).find('.unitSelect').find(":selected").val();
            dataObject.Qty = $(this).find(".Quantity").val();
            dataObject.UnitPrice = $(this).find(".Price").val();
            dataObject.Amount = $(this).find(".Amount").val();

            console.log($(this).find('.unitSelect').find(":selected").val());
            $.ajax(
            {
                url: 'http://localhost:13131/api/JobOrderExpense',
                type: 'POST',
                async: false,
                data: dataObject,
                datatype: 'json',
                success: function (data) {
                    //ID = data;
                    alert('Create is completed');
                },
                error: function (msg) {
                    alert(msg)
                }
            });
        });

        });
    });

