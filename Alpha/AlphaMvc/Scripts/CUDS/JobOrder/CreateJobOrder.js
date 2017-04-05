$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();
    //ReplaceNumberWithCommas($('.Number').val());

    var input = window.location.href;
    var after = input.split('?')[1]
    var res = after.split('=');
    var res2 = res[1];
    var res3 = after.split('&');
    var res4 = res3[0].split('=');
    var BDCID = res4[1];
    var BDCNo = res3[1];
    $('#txtJobReference').val(BDCNo);
    $('#hidBDCID').val(BDCID);
    
    $("#dtJobDate").datepicker({
        inline: true,
        showOtherMonths: true
    })
    .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');

    $("#dtSWorking").datepicker({
        inline: true,
        showOtherMonths: true
    })
    .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');

    $("#dtEWorking").datepicker({
        inline: true,
        showOtherMonths: true
    })
    .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');

    $("#dtJobDate").datepicker({ dateFormat: "mm/dd/yy" }).val();
    $('#dtJobDate').datepicker().datepicker('setDate', 'today');

    $("#dtSWorking").datepicker({ dateFormat: "mm/dd/yy" }).val();
    $('#dtSWorking').datepicker().datepicker('setDate', 'today');
    
    $("#dtEWorking").datepicker({ dateFormat: "mm/dd/yy" }).val();


    $("#customerBody").on("click", "tr", function (e) {
        $("#txtCustomerName").val($(this).find("td:eq(3)").text());
        $("#hidCustID").val($(this).find("td:eq(1)").text());
        $("#txtTel").val($(this).find("td:eq(4)").text());
        $("#txtContact").val($(this).find("td:eq(5)").text());
        $("#txtCoWorker").val($(this).find("td:eq(6)").text());
        $("#txtFax").val($(this).find("td:eq(7)").text());
        $("#txtAddress").val($(this).find("td:eq(8)").text());
    });

    var IDCard;
    var TechnicianType;
    var TechnicianID;
    var PositionID;
    var dataitem;
    $('.FName').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: 'http://localhost:13131/api/Technician',
                type: 'GET',
                dataType: 'json',
                data: { name:request.term },
                success: function (data) {
                    data = JSON.parse(data);
                    dataitem = data;
                    response($.map(data.Table, function (item) {
                        return {
                            IDCard: item.IDCard,
                            TechnicianType: item.TechnicianTypeName,
                            TechnicianID: item.ID,
                            PositionID: item.PositionID,
                            label: item.FirstName,
                            value: item.ID
                        }
                    }));
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log('some error occured', textStatus, errorThrown);
                    alert('Error');
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            //var totalPosition = 0;
            $(this).val(ui.item.label);
            $('.CardID:last').val(ui.item.IDCard);
            $('.TechnicianType').val(ui.item.TechnicianType);
            $('.TechnicianID').val(ui.item.TechnicianID);
            $('.PositionID').val(ui.item.PositionID);
            
            return false;
        }
    });

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
var row_index = 0;
var col_index = 0;

$(function () {
    $('.ManDate').datepicker();
    $('.WorkingFrom').timepicker();
    $('.WorkingTo').timepicker();

    //var dates = new Date();
    //$('.WorkingFrom').wickedpicker({ defaultValue: dates.getTime(), twentyFour: true, showSeconds: false });
    //$('.WorkingTo').wickedpicker({ defaultValue: dates.getTime(), twentyFour: true, showSeconds: false });

    $("#dtJobDate").datepicker();
    $("#dtSWorking").datepicker();
    $("#dtEWorking").datepicker();
    $('#tabManpower').dynoTable2();
    $('#tabSaleOrder').dynoTable3();
    $('#tabInvoice').dynoTable4();
    $('#tabReceipt').dynoTable5();
    $('#tabIncome').dynoTable6();
    $('#tabCost').dynoTable7();

    $('.RowCal5 td').click(function () {
        row_index = $(this).parent().index();
        col_index = $(this).index();
    });
});

function BrowseCustomer() {
    $.ajax(
           {
               url: 'http://localhost:13131/api/Customer',
               type: 'GET',
               datatype: 'json',
               success: function (data) {
                   data = JSON.parse(data);
                   var html = '';
                   for (var i = 0; i < data.Table.length; i++) {
                       //alert(data.Table[i].CustNo);
                       html += '<tr>';
                       html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                       html += '<td class="hidecolumn" data-dismiss="modal">' + data.Table[i].ID + '</td>';
                       html += '<td data-dismiss="modal">' + data.Table[i].CustNo + '</td>';
                       html += '<td data-dismiss="modal">' + data.Table[i].Name + '</td>';
                       html += '<td data-dismiss="modal">' + data.Table[i].Tel + '</td>';
                       html += '<td data-dismiss="modal">' + data.Table[i].Contact + '</td>';
                       html += '<td class="hidecolumn">' + data.Table[i].CoWorker + '</td>';
                       html += '<td class="hidecolumn">' + data.Table[i].Fax + '</td>';
                       html += '<td class="hidecolumn">' + data.Table[i].Address + '</td>';
                       html += '</tr>';
                   }
                   document.getElementById("customerBody").innerHTML = html;

               },
               error: function (msg) {
                   alert(msg)
               }
           });
}
function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}
function CalTotalHour() {
    var workingFrom = $('.WorkingFrom').eq(row_index).val();
    var fromHours = workingFrom.split(':')[0]
    var fromMinute = workingFrom.split(':')[1]

    var workingTo = $('.WorkingTo').eq(row_index).val();
    var toHours = workingTo.split(':')[0]
    var toMinute = workingTo.split(':')[1]

    var wfminute = (fromHours * 60) + parseInt(fromMinute);
    var wtminute = (toHours * 60) + parseInt(toMinute);    
    var tminute = wtminute - wfminute;

    var totalHours = Math.floor(tminute / 60);
    var totalMinutes = tminute - (totalHours * 60);
    var total = parseInt(totalHours) + ':' + pad(totalMinutes, 2);
    $('.TotalHours').eq(row_index).val(total);
}
function CreateData() {
      var dataObject = { JobRef: $('#hidBDCID').val(), JobDate: $("#dtJobDate").val(), Car: $("#txtCar").val(), SWorking: $("#dtSWorking").val(), EWorking: $("#dtEWorking").val(), JobBy: $("#txtJobBy").val(), IssuedBy: $("#txtIssuedBy").val(), TypeWorking: $("#cmbTypeWorking").find(":selected").val(), JobStatus: $("#cmbJobStatus").find(":selected").val(), Detail: $("#txtDetail").val(), CustID: $("#hidCustID").val(), JobReference: 1, Remark: $("#txtRemark").val(), Discount: $("#txtDiscount").val(), Price: $('#txtSubTotal').val(), Cost: $('#txtExpense').val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'] };
    console.log(dataObject);
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
        $(".RowCal").each(function () {
            dataObject.JobID = ID;
            dataObject.IncomeType = $(this).find('.Select1').find(":selected").val();
            dataObject.UnitWeight = $(this).find(".UnitWeight").val();
            dataObject.Qty = $(this).find(".Quantity").val();
            dataObject.UnitPrice = $(this).find(".Price").val();
            dataObject.Amount = $(this).find(".Amount").val();
            dataObject.CreateBy = localStorage['UserID'];
            dataObject.EditBy = localStorage['UserID'];
            if ($(this).find(".UnitWeight").val() != '' && $(this).find(".Quantity").val() != '' && $(this).find(".Price").val() != '')
            {
                $.ajax(
                {
                    url: 'http://localhost:13131/api/JobOrderIncome',
                    type: 'POST',
                    async: false,
                    data: dataObject,
                    datatype: 'json',
                    success: function (data) {
                        
                    },
                    error: function (msg) {
                        alert(msg)
                    }
                });
            }
        });

        //===================Insert JobOrderExpense
        var dataObject = {};
        $(".RowCal1").each(function () {
            dataObject.JobID = ID;
            dataObject.ExpenseType = $(this).find('.ExpenseSelect').find(":selected").val();
            dataObject.UnitWeight = $(this).find('.unitSelect').find(":selected").val();
            dataObject.Qty = $(this).find(".Quantity").val();
            dataObject.UnitPrice = $(this).find(".Price").val();
            dataObject.Amount = $(this).find(".Amount1").val();
            dataObject.CreateBy = localStorage['UserID'];
            dataObject.EditBy = localStorage['UserID'];
            if ($(this).find(".UnitWeight").val() != '' && $(this).find(".Quantity").val() != '' && $(this).find(".Price").val() != '')
            {
                $.ajax(
                {
                    url: 'http://localhost:13131/api/JobOrderExpense',
                    type: 'POST',
                    async: false,
                    data: dataObject,
                    datatype: 'json',
                    success: function (data) {
                    },
                    error: function (msg) {
                        alert(msg)
                    }
                });
            }
        });
    //===================Insert JobOrderManpower
        var dataObject = {};
        $(".RowCal5").each(function () {
            if ($(this).find('.FName').val() != '')
            {
                var workingFrom = $(this).find('.WorkingFrom').val();
                var fromHours = workingFrom.split(':')[0]
                var fromMinute = workingFrom.split(':')[1]
                var fromMinute = fromMinute.substring(0, 2);

                var workingTo = $(this).find('.WorkingTo').val();
                var toHours = workingTo.split(':')[0]
                var toMinute = workingTo.split(':')[1]
                var toMinute = toMinute.substring(0, 2);

                dataObject.JobID = ID;
                dataObject.TechnicianID = $(this).find('.TechnicianID').val();
                dataObject.ManDate = $(this).find(".ManDate").val();
                dataObject.ManDay = $(this).find('.ManDay').find(":selected").val();
                dataObject.ManTime = $(this).find(".ManTime").val();
                dataObject.FromHour = fromHours;
                dataObject.FromMinute = fromMinute;
                dataObject.ToHour = toHours;
                dataObject.ToMinute = toMinute;
                dataObject.TotalHours = $(this).find(".TotalHours").val();
                dataObject.ManNormal = $(this).find(".ManNormal").val();
                dataObject.ManPremium = $(this).find(".ManPremium").val();
                dataObject.ManSpecial = $(this).find(".ManSpecial").val();
                dataObject.CreateBy = localStorage['UserID'];
                dataObject.EditBy = localStorage['UserID'];
                if ($(this).find(".TechnicianID").val() != '') {
                    $.ajax(
                    {
                        url: 'http://localhost:13131/api/JobOrderManpower',
                        type: 'POST',
                        async: false,
                        data: dataObject,
                        datatype: 'json',
                        success: function (data) {
                        },
                        error: function (msg) {
                            alert(msg)
                        }
                    });
                }
            }
        });
    ////===================Insert JobOrderSaleOrder 
        var dataObject = {};
        $(".RowCal2").each(function () {
            dataObject.JobID = ID;
            dataObject.SaleOrderNo = $(this).find(".SaleOrderNo").val();
            dataObject.Amount = $(this).find(".Amount2").val();
            dataObject.CreateBy = localStorage['UserID'];
            dataObject.EditBy = localStorage['UserID'];
            if ($(this).find(".SaleOrderNo").val() != '')
            { 
                $.ajax(
                {
                    url: 'http://localhost:13131/api/JobOrderSaleOrder',
                    type: 'POST',
                    async: false,
                    data: dataObject,
                    datatype: 'json',
                    success: function (data) {
                    },
                    error: function (msg) {
                        alert(msg)
                    }
                });
            }
        });
    ////===================Insert JobOrderInvoice
        var dataObject = {};
        $(".RowCal3").each(function () {
            dataObject.JobID = ID;
            dataObject.SaleOrderNo = $(this).find(".SaleOrderNo").val();
            dataObject.InvoiceNo = $(this).find(".InvoiceNo").val();
            dataObject.Amount = $(this).find(".Amount3").val();
            dataObject.CreateBy = localStorage['UserID'];
            dataObject.EditBy = localStorage['UserID'];
            if ($(this).find(".SaleOrderNo").val() != '' && $(this).find(".InvoiceNo").val() != '')
            { 
                $.ajax(
                {
                    url: 'http://localhost:13131/api/JobOrderInvoice',
                    type: 'POST',
                    async: false,
                    data: dataObject,
                    datatype: 'json',
                    success: function (data) {
                    },
                    error: function (msg) {
                        alert(msg)
                    }
                });
            }
        });
    ////===================Insert JobOrderReceipt
        var dataObject = {};
        $(".RowCal4").each(function () {
            dataObject.JobID = ID;
            dataObject.ReceiptNo = $(this).find(".ReceiptNo").val();
            dataObject.InvoiceNo = $(this).find(".InvoiceNo").val();
            dataObject.Amount = $(this).find(".Amount4").val();
            dataObject.CreateBy = localStorage['UserID'];
            dataObject.EditBy = localStorage['UserID'];
            if ($(this).find(".ReceiptNo").val() != '' && $(this).find(".InvoiceNo").val() != '')
            {
                $.ajax(
                {
                    url: 'http://localhost:13131/api/JobOrderReceipt',
                    type: 'POST',
                    async: false,
                    data: dataObject,
                    datatype: 'json',
                    success: function (data) {
                    },
                    error: function (msg) {
                        alert(msg)
                    }
                });
            }
        });
        alert('Create is completed');
        window.location.href = "../JobOrder/EditJobOrder?id=" + ID;
}
function CalSum() {
    var total = 0;
    var SubTotal = 0;
    var Discount = 0;
    $(".RowCal").each(function () {
        var qty = $(this).find(".Quantity").val().replace(',','');
        var price = $(this).find(".Price").val().replace(',', '');
        var amount = qty * price;
        
        $(this).find('.Amount').val(amount).number(true,2);
        $(this).find('.Price').val(ReplaceNumberWithCommas(price));
        $(this).find('.Quantity').val(ReplaceNumberWithCommas(qty));
    });
    for (var i = 0; i < $(".RowCal").length; i++) {
        total = total + parseFloat($('.Amount:eq(' + i + ')').val());
    }

    Discount = $('#txtDiscount').val().replace(',', '');
    SubTotal = total - Discount;

    $('#txtDiscount').val(ReplaceNumberWithCommas(Discount));

    $('#txtTotal').val(total).number(true, 2);
    $('#txtSubTotal').val(SubTotal).number(true, 2);
    $('#txtNoCompound').val(SubTotal).number(true, 2);

    
    return SubTotal;
}
function CalSumExpense() {
    var totalExpense = 0;
    var SubTotal = 0;
    var Profit = 0;
    SubTotal = CalSum();
    $(".RowCal1").each(function () {
        var qty = $(this).find(".Quantity").val().replace(',','');
        var price = $(this).find(".Price").val().replace(',', '');
        var amount = qty * price;

        $(this).find('.Amount1').val(amount).number(true, 2);
        $(this).find('.Price').val(ReplaceNumberWithCommas(price));
        $(this).find('.Quantity').val(ReplaceNumberWithCommas(qty));
    });
    for (var i = 0; i < $(".RowCal1").length; i++) {
        totalExpense = totalExpense + parseFloat($('.Amount1:eq(' + i + ')').val());
    }
    Profit = SubTotal - totalExpense;
    $('#txtTotalExpense').val(totalExpense).number(true, 2);
    $('#txtExpense').val(totalExpense).number(true, 2);
    if (Profit < 0) {
        $("#txtProfit").number(true, 2).val(Profit).css('color', 'red');
    }
    else {
        $("#txtProfit").number(true, 2).val(Profit).css('color', 'black');
    }
}

function AddRowIncome() {
    $.ajax({
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);

            $.each(data.Table, function (i) {
                $('.Select1:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.Select1:last').find('option:first-child').attr('selected', true);
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

            //$('.ExpenseSelect:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.ExpenseSelect:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.ExpenseSelect:last').find('option:first-child').attr('selected', true);

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
            //$('.unitSelect:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.unitSelect:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.unitSelect:last').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}

function AddrowManpower() {
    $('.RowCal5 td').click(function () {
        row_index = $(this).parent().index();
        col_index = $(this).index();
    });

    $(".ManDate").removeClass('hasDatepicker').datepicker();
    $('.WorkingFrom').timepicker();
    $('.WorkingTo').timepicker();

    var IDCard;
    var TechnicianType;
    var TechnicianID;
    var PositionID;
    $('.FName').each(function () {
        $(this).autocomplete({
            source: function (request, response) {
                //alert('inside');
                $.ajax({
                    url: 'http://localhost:13131/api/Technician',
                    type: 'GET',
                    dataType: 'json',
                    data: { name: request.term },
                    success: function (data) {
                        data = JSON.parse(data);
                        dataitem = data;
                        response($.map(data.Table, function (item) {
                            return {
                                IDCard: item.IDCard,
                                TechnicianType: item.TechnicianTypeName,
                                TechnicianID: item.ID,
                                PositionID: item.PositionID,
                                label: item.FirstName,
                                value: item.ID
                            }
                        }));
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log('some error occured', textStatus, errorThrown);
                        alert('Error');
                    }
                });
            },
            minLength: 3,
            select: function (event, ui) {
                $(this).val(ui.item.label);
                $('.CardID').eq(row_index).val(ui.item.IDCard);
                $('.TechnicianType').eq(row_index).val(ui.item.TechnicianType);
                $('.TechnicianID').eq(row_index).val(ui.item.TechnicianID);
                $('.PositionID').eq(row_index).val(ui.item.PositionID);
                return false;
            }
        });
    });
   }
    
function DateWorking()
{
    if ($("#dtSWorking").datepicker({ dateFormat: "mm/dd/yy" }).val() > $("#dtEWorking").datepicker({ dateFormat: "mm/dd/yy" }).val()) {
        $("#dtEWorking").val("")
        alert("Please Input Endworking more than Startworking");
    }
}





