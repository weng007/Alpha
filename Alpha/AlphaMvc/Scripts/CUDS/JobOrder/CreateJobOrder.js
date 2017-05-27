$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();
    $('.Number').number(true, 2);
    CheckAuthorization();
    var input = window.location.href;
    var after = input.split('?')[1]
    var res = after.split('=');
    var res2 = res[1];
    var res3 = after.split('&');
    var res4 = res3[0].split('=');
    var res5 = res3[1].split('#');
    var BDCID = res4[1];
    var BDCNo = res5[0];
    $('#txtJobReference').val(BDCNo);
    $('#hidBDCID').val(BDCID);;
    BrowseCustomer(BDCID);
    $("#dtJobDate").datepicker({
        inline: true,
        showOtherMonths: true,
        dateFormat: "dd/mm/yy"
    })
    .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');
    $('#dtJobDate').datepicker().datepicker('setDate', 'today');

    $("#dtSWorking").datepicker({
        inline: true,
        showOtherMonths: true,
        dateFormat: "dd/mm/yy"
    })
    .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');
    $('#dtSWorking').datepicker().datepicker('setDate', 'today');

    $("#dtEWorking").datepicker({
        inline: true,
        showOtherMonths: true,
        dateFormat: "dd/mm/yy"
    })
    .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');

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
                            TechnicianID: item.TechnicianNo,
                            PositionID: item.Position,
                            label: item.FirstName,
                            value: item.TechnicianNo
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

    var dataObject = { BID: BDCID };
    $.ajax({
        url: 'http://localhost:13131/api/JobOrder',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbContact').append($('<option></option>').val(data.Table[i].ContactId).html(data.Table[i].ContactName));
            });
            $('#cmbContact').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { BID: BDCID };
    $.ajax({
        url: 'http://localhost:13131/api/JobOrder',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbCoWorker').append($('<option></option>').val(data.Table[i].ContactId).html(data.Table[i].ContactName));
            });
            $('#cmbCoWorker').find('option:first-child').attr('selected', true);

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
//function countPosition()
//{
//    var totalSup = 0;
//    var totalFM = 0;
//    var totalTech = 0;
//    var totalSafety = 0;
//    for (var i = 0; i < $(".RowCal5").length; i++) {

//        if ($('.PositionID:eq(' + i + ')').val() == 11) {
//            totalSup = totalSup + 1;
//            $('#txtManSup').val(totalSup);
//        }
//        if ($('.PositionID:eq(' + i + ')').val() == 22) {
//            totalFM = totalFM + 1
//            $('#txtManFM').val(totalFM);
//        }
//        if ($('.PositionID:eq(' + i + ')').val() == 33) {
//            totalTech = totalTech + 1
//            $('#txtManTech').val(totalTech);
//        }
//        if ($('.PositionID:eq(' + i + ')').val() == 44) {
//            totalSafety = totalSafety + 1
//            $('#txtManSafety').val(totalSafety);
//        }
//    }
//}
$(function () {
    $('.ManDate').eq(row_index).datepicker({
        dateFormat: 'dd/mm/yy'
    });

    $('.RowCal5 td:first').click(function () {
        row_index = $(this).parent().index();
        col_index = $(this).index();
    });

    $('.WorkingFrom').timepicker({ 'timeFormat': 'H:i' });
    $('.WorkingTo').timepicker({ 'timeFormat': 'H:i' });
    $('#tabManpower').dynoTable2();
    $('#tabSaleOrder').dynoTable3();
    $('#tabInvoice').dynoTable4();
    $('#tabReceipt').dynoTable5();
    $('#tabIncome').dynoTable6();
    $('#tabCost').dynoTable7();
});

function BrowseCustomer(val) {
    //$.ajax(
    //       {
    //           url: 'http://localhost:13131/api/Customer',
    //           type: 'GET',
    //           datatype: 'json',
    //           success: function (data) {
    //               data = JSON.parse(data);
    //               var html = '';
    //               for (var i = 0; i < data.Table.length; i++) {
    //                   //alert(data.Table[i].CustNo);
    //                   html += '<tr>';
    //                   html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
    //                   html += '<td class="hidecolumn" data-dismiss="modal">' + data.Table[i].ID + '</td>';
    //                   html += '<td data-dismiss="modal">' + data.Table[i].CustNo + '</td>';
    //                   html += '<td data-dismiss="modal">' + data.Table[i].Name + '</td>';
    //                   html += '<td data-dismiss="modal">' + data.Table[i].Tel + '</td>';
    //                   html += '<td data-dismiss="modal">' + data.Table[i].Contact + '</td>';
    //                   html += '<td class="hidecolumn">' + data.Table[i].CoWorker + '</td>';
    //                   html += '<td class="hidecolumn">' + data.Table[i].Fax + '</td>';
    //                   html += '<td class="hidecolumn">' + data.Table[i].Address + '</td>';
    //                   html += '</tr>';
    //               }
    //               document.getElementById("customerBody").innerHTML = html;
    //           },
    //           error: function (msg) {
    //               alert(msg)
    //           }
    //       });
    var dataObject = { BDCID: val}
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/JobOrder',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            
            if (data.Table.length > 0) {
                //$('.RowCal5:eq(' + data.Table.length + ')').remove();
                
                $('#txtCustomerName').val(data.Table[0].Name)
                $('#txtTel').val(data.Table[0].Tel)
                $('#txtFax').val(data.Table[0].Fax)
                $('#txtContact').val(data.Table[0].Contact)
                $('#txtCoWorker').val(data.Table[0].CoWorker)
                $('#txtAddress').val(data.Table[0].Address)

                //CalSumExpense();
            }
        },
        error: function (msg) {
            alert(msg);
        }

    });
}
function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function GetManpowerHour() {
    var TechnicianID = $('.TechnicianID').eq(row_index).val();
    var ManDate = $('.ManDate').eq(row_index).val();
    var FromTime = $('.WorkingFrom').eq(row_index).val();
    var ToTime = $('.WorkingTo').eq(row_index).val();
    var workingFrom = $('.WorkingFrom').eq(row_index).val();
    var workingTo = $('.WorkingTo').eq(row_index).val();

    if (ManDate != '')
    {
        var days = [
        'SUN',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT'
        ];

        var dateParts = ManDate.split("/");
        if (dateParts.length != 3)
            return null;
        var year = dateParts[2];
        var month = dateParts[1];
        var day = dateParts[0];

        var d = new Date(year,month-1,day);

        x = d.getDay();
        $('.ManDay').eq(row_index).val(days[x]);
    }

    if (workingFrom != '')
    {
        var fromHours = workingFrom.split(':')[0]
        var fromMinute = workingFrom.split(':')[1]
        var toHours;
        var toMinute;
        if (workingTo != '')
        {
            toHours = workingTo.split(':')[0]
            toMinute = workingTo.split(':')[1]
        }
        else {
            toHours = 0;
            toMinute = 0;
        }      

        var wfminute = (fromHours * 60) + parseInt(fromMinute);
        var wtminute = (toHours * 60) + parseInt(toMinute);
        var tminute = (wtminute - wfminute) < 0 ? 0 : wtminute - wfminute;
        var totalHours = Math.floor(tminute / 60);
        var totalMinutes = tminute - (totalHours * 60);
        var total = parseInt(totalHours) + ':' + pad(totalMinutes, 2);

        if (total == '0:00')
        {
            $('.TotalHours').eq(row_index).val('0:00');
        }
        else
        {
            $('.TotalHours').eq(row_index).val(total);
        }
    }

    if (TechnicianID != '' && ManDate != '' && FromTime != '' && ToTime != '')
    {
        var dataObject = { technician: TechnicianID + '&' + ManDate + '&' + FromTime + '&' + ToTime }
        console.log(dataObject);
        $.ajax(
        {
            url: 'http://localhost:13131/api/OT',
            type: 'GET',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                if (data.Table.length > 0) {

                    $('.ManNormal').eq(row_index).val(data.Table[0].ManNormal);
                    $('.ManPremium').eq(row_index).val(data.Table[0].ManPremium);
                    $('.ManPremium2').eq(row_index).val(data.Table[0].ManPremium2);
                    $('.ManSpecial').eq(row_index).val(data.Table[0].ManSpecial);
                }
            },
            error: function (msg) {
                alert(msg);
            }

        });
    }
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
    //, CustID: $("#hidCustID").val()
    var JDate = ChangeformatDate($("#dtJobDate").val(),1);
    var SWorkingDate = ChangeformatDate($("#dtSWorking").val(),1);
    var EWorkingDate = ChangeformatDate($("#dtEWorking").val(),1);

    var dataObject = {
        JobRef: $('#hidBDCID').val(), JobDate: JDate, Car: $("#txtCar").val(), SWorking: SWorkingDate, EWorking: EWorkingDate, JobBy: $("#txtJobBy").val(), IssuedBy: $("#txtIssuedBy").val(), TypeWorking: $("#cmbTypeWorking").find(":selected").val(), JobStatus: $("#cmbJobStatus").find(":selected").val(),
        ContactID: $("#cmbContact").find(":selected").val(), CoWorkerID: $("#cmbCoWorker").find(":selected").val(),
        Detail: $("#txtDetail").val(), JobReference: 1, Remark: $("#txtRemark").val(), Discount: $("#txtDiscount").val(), Price: $('#txtSubTotal').val(), Cost: $('#txtExpense').val(), JobSite: $("#txtJobSite").val(), Location: $("#txtLocation").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID']
    };
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
                $('#hidJobID').val(ID);
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
        alert("TestManpower");
        var dataObject = {};
        $(".RowCal5").each(function () {
            alert($(this).find('.FName').val());
            if ($(this).find('.FName').val() != '')
            {
                var workingFrom = $(this).find('.WorkingFrom').val();
                var workingTo = $(this).find('.WorkingTo').val();
                var mDate = ChangeformatDate($(this).find(".ManDate").val(),1);


                alert($(this).find('.TechnicianID').val());
                alert("mDate" + mDate);
                alert($(this).find('.ManDay').val());
                alert("Working Form" + workingFrom);
                alert("To" + workingTo);
                alert("Total" + $(this).find(".TotalHours").val());
                alert("ManNormal" + $(this).find(".ManNormal").val());
                alert("ManPremium" + $(this).find(".ManPremium").val());
                alert("ManSpecial" + $(this).find(".ManSpecial").val());

                dataObject.JobID = ID;
                dataObject.TechnicianID = $(this).find('.TechnicianID').val();
                dataObject.ManDate = mDate;
                dataObject.ManDay = $(this).find('.ManDay').val();
                dataObject.ManTime = $(this).find(".ManTime").val();
                dataObject.FromHour = workingFrom;
                dataObject.ToHour = workingTo;
                dataObject.TotalHours = $(this).find(".TotalHours").val();
                dataObject.ManNormal = $(this).find(".ManNormal").val();
                dataObject.ManPremium = $(this).find(".ManPremium").val();
                dataObject.ManPremium2 = $(this).find(".ManPremium2").val();
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
        RedirectJobOrderBorrow(ID);
        //window.location.href = "../JobOrder/EditJobOrder?id=" + ID;
}
function CalSum() {
    var total = 0;
    var SubTotal = 0;
    var Discount = 0;
    $(".RowCal").each(function () {
        var qty = $(this).find(".Quantity").val();
        var price = $(this).find(".Price").val();
        var amount = qty * price;

        $(this).find('.Amount').val(amount).number(true, 2);
        $(this).find('.Price').val(price);
        $(this).find('.Quantity').val(qty);
        //$(this).find('.Amount').val(amount).number(true, 2);
        //$(this).find('.Price').val(price).number(true, 0);
        //$(this).find('.Quantity').val(qty).number(true, 0);;
    });
    for (var i = 0; i < $(".RowCal").length; i++) {
        total = total + parseFloat($('.Amount:eq(' + i + ')').val());
    }
    Discount = $('#txtDiscount').val();
    SubTotal = total - Discount;
    $('#txtTotal').val(total).number(true, 2);
    $('#txtSubTotal').val(SubTotal).number(true, 2);
    $('#txtNoCompound').val(SubTotal).number(true, 2);
    return SubTotal;
}

function addCommas() {
    
}

function CalSumExpense() {
    var totalExpense = 0;
    var SubTotal = 0;
    var Profit = 0;
    SubTotal = CalSum();
    $(".RowCal1").each(function () {
        var qty = $(this).find(".Quantity").val();
        var price = $(this).find(".Price").val();
        var amount = qty * price;

        $(this).find('.Amount1').val(amount).number(true, 2);
        //$(this).find('.Price').val(price).number(true, 2);
        //$(this).find('.Quantity').val(qty).number(true, 2);
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
function SetRowIndex()
{
    $('.RowCal5 td').click(function () {
        row_index = $(this).parent().index();
        col_index = $(this).index();
    });
}

function AddrowManpower() {     
    
    var i = 0;
    $('.ManDate').each(function () {
        $(this).attr("id", 'date' + i).datepicker({
                dateFormat: 'dd/mm/yy'
            });
        i++;
    });

    $('.WorkingFrom').timepicker({ 'timeFormat': 'H:i' });
    $('.WorkingTo').timepicker({ 'timeFormat': 'H:i' });

    var IDCard;
    var TechnicianType;
    var TechnicianID;
    var PositionID;
    $('.FName').each(function () {
        $(this).autocomplete({
            source: function (request, response) {
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
                                TechnicianID: item.TechnicianNo,
                                PositionID: item.Position,
                                label: item.FirstName,
                                value: item.TechnicianNo
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
    if ($("#dtSWorking").datepicker({ dateFormat: "dd/mm/yy" }).val() > $("#dtEWorking").datepicker({ dateFormat: "dd/mm/yy" }).val()) {
        $("#dtEWorking").val("")
        alert("Please Input Endworking more than Startworking");
    }
}
function RedirectJobOrderBorrow(val)
{
    var IsNewBorrow = $('#hidIsNewBorrow').val();
    if (IsNewBorrow == 1)
    {
        window.location.href = "../Borrow/CreateBorrow?id=" + val;
    }
    else
    {
        window.location.href = "../JobOrder/EditJobOrder?id=" + val;
    }
}





