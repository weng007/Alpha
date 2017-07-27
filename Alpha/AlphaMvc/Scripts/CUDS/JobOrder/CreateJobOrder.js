var row_index = 0;//RowCal5 Manpower
var row_index2 = 0;//RowCal Income
var row_index3 = 0;//RowCal1 Expense
var row_index4 = 0;//RowCal2 SaleOrder
var row_index5 = 0;//RowCal3 Invoice
var row_index6 = 0;//RowCal4 Receipt
var col_index = 0;//RowCal5 Manpower

$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();

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
        minLength: 1,
        select: function (event, ui) {
            $(this).val(ui.item.label);
            $('.CardID:last').val(ui.item.IDCard);
            $('.TechnicianType').val(ui.item.TechnicianType);
            $('.TechnicianID').val(ui.item.TechnicianID);
            $('.PositionID').val(ui.item.PositionID);
            
            return false;
        }
    });

    var dataObject = { IsJobOrder: 'true' };
    $.ajax({
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
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

    //cmbExpense
    //$.ajax({
    //    url: 'http://localhost:13131/api/ExpenseMaster',
    //    type: 'GET',
    //    dataType: 'json',
    //    success: function (data) {
    //        data = JSON.parse(data);
    //        $.each(data.Table, function (i) {
    //            $('.ExpenseSelect').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
    //        });
    //        $('.ExpenseSelect').find('option:first-child').attr('selected', true);
    //        alert($(".ExpenseSelect").find(":selected").val());
    //    },
    //    failure: function () {
    //        alert('Error');
    //    }
    //});

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

    var dataObject = { typeID: '010' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('.UnitWeight').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.UnitWeight').find('option:first-child').attr('selected', true);
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
        async: false,
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
    GetExpenseGroup();
});

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
    $('.RowCal td:first').click(function () {
        row_index2 = $(this).parent().index();
    });
    $('.RowCal1 td:first').click(function () {
        row_index3 = $(this).parent().index();
    });
    $('.RowCal2 td:first').click(function () {
        row_index4 = $(this).parent().index();
    });
    $('.RowCal3 td:first').click(function () {
        row_index5 = $(this).parent().index();
    });
    $('.RowCal4 td:first').click(function () {
        row_index6 = $(this).parent().index();
    });

    $('.WorkingFrom').timepicker({ 'timeFormat': 'H:i' });
    $('.WorkingTo').timepicker({ 'timeFormat': 'H:i' });
    $('#tabManpower').dynoTable2();
    $('#tabSaleOrder').dynoTable3();
    $('#tabInvoice').dynoTable4();
    $('#tabReceipt').dynoTable5();
    $('#tabIncome').dynoTable6();
    $('#tabCost').dynoTable7();
    //GetPriceList();
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
                $('#txtJobNo').val(data.Table[0].CustID);
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
function GetPriceList()
{
    var IncomeID = $('.Select1').eq(row_index2).val();
    var dataObject = { IsIncome: IncomeID + '&' + '0' }
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/ExpenseMaster',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            if (data.Table.length > 0) {

                $('.PriceList').eq(row_index2).val(data.Table[0].PriceList);
                $('.UnitPrice').eq(row_index2).val(data.Table[0].PriceList).formatNumber({ format: "#,###.00", locale: "us" });
            }
        },
        error: function (msg) {
            alert(msg);
        }

    });
    CalSum();
}
function GetExpensePriceList() {
    var ExpenseID = $('.ExpenseSelect').eq(row_index3).val();
    var dataObject = { IsIncome: ExpenseID + '&' + '1' }
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/ExpenseMaster',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            if (data.Table.length > 0) {

                $('.PriceList1').eq(row_index3).val(data.Table[0].PriceList);
                $('.UnitPrice1').eq(row_index3).val(data.Table[0].PriceList).formatNumber({ format: "#,###.00", locale: "us" });
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
    CalSumExpense();
}
function GetManpowerHour(isCheckBreak) {
    var TechnicianID = $('.TechnicianID').eq(row_index).val();
    var ManDate = $('.ManDate').eq(row_index).val();
    var FromTime = $('.WorkingFrom').eq(row_index).val();
    var ToTime = $('.WorkingTo').eq(row_index).val();
    var workingFrom = $('.WorkingFrom').eq(row_index).val();
    var workingTo = $('.WorkingTo').eq(row_index).val();
    var isBreak1 = $(this).find('.chkBreak1').eq(row_index).is(":checked");
    var isBreak2 = $(this).find('.chkBreak2').eq(row_index).is(":checked");

    alert(isCheckBreak);
    if (isCheckBreak == '1')
    {
        alert(11);
        if (isBreak1 = 'false') {
            isBreak1 = true;
        }
        else {
            isBreak1 = false;
        }
    }
    else
    {
        alert(22);
        if (isBreak2 = 'false') {
            isBreak2 = true;
        }
        else {
            isBreak2 = false;
        }
    }
    

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

    if (TechnicianID != '' && ManDate != '' && FromTime != '' && ToTime != '')
    {
        var dataObject = { technician: TechnicianID + '&' + ManDate + '&' + FromTime + '&' + ToTime + '&' + isBreak1 + '&' + isBreak2 }
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
                    //alert("Test");
                    //alert(data.Table[0].NormalDay);
                    $('.NormalDay').eq(row_index).val(data.Table[0].NormalHour);
                    $('.ManNormal').eq(row_index).val(data.Table[0].Normal1);
                    $('.ManPremium').eq(row_index).val(data.Table[0].Premium1_5);
                    $('.ManPremium2').eq(row_index).val(data.Table[0].Premium2_0);
                    $('.ManSpecial').eq(row_index).val(data.Table[0].Premium3_0);
                    $('.TotalHours').eq(row_index).val(data.Table[0].TotalHours);
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
function GetExpenseGroup() {
    var WorkingType = $("#cmbTypeWorking").find(":selected").val();
    $('#hidTypeWorking').val(WorkingType);

    var dataObject = { TypeWorking: WorkingType };
    $.ajax({
        url: 'http://localhost:13131/api/JobOrderExpense',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //$('.ExpenseSelect:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.ExpenseSelect').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.ExpenseSelect').find('option:first-child').attr('selected', true);

        },
        failure: function () {
            alert('Error');
        }
    });
}
function ChangeExpenseGroup()
{
    //alert('Test ' + $("#cmbTypeWorking").find(":selected").val());

    var WorkingType = $("#cmbTypeWorking").find(":selected").val();
    $('#hidTypeWorking').val(WorkingType);

    var dataObject = { TypeWorking: WorkingType };
    $.ajax({
        url: 'http://localhost:13131/api/JobOrderExpense',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
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
}

function CreateData() {
    //, CustID: $("#hidCustID").val()
    var JDate = ChangeformatDate($("#dtJobDate").val(),1);
    var SWorkingDate = ChangeformatDate($("#dtSWorking").val(),1);
    var EWorkingDate = ChangeformatDate($("#dtEWorking").val(), 1);
    //parsefloat($("#txtDiscount").val() != '' ? $("#txtDiscount").val() : 0);
    var discount = $("#txtDiscount").val();
    var price = $("#txtSubTotal").val();
    var cost = $('#txtExpense').val();

    var dataObject = {
        JobRef: $('#hidBDCID').val(), JobNo: $('#txtJobNo').val(), JobDate: JDate, Car: $("#txtCar").val(), SWorking: SWorkingDate, EWorking: EWorkingDate, JobBy: $("#txtJobBy").val(), IssuedBy: $("#txtIssuedBy").val(), TypeWorking: $("#cmbTypeWorking").find(":selected").val(), JobStatus: $("#cmbJobStatus").find(":selected").val(),
        ContactID: $("#cmbContact").find(":selected").val(), CoWorkerID: $("#cmbCoWorker").find(":selected").val(),
        Detail: $("#txtDetail").val(), JobReference: 1, Remark: $("#txtRemark").val(), Discount: discount, Price: price, Cost: cost, JobSite: $("#txtJobSite").val(), Location: $("#txtLocation").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID']
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
            dataObject.Detail = $(this).find(".Detail").val();
            dataObject.UnitWeight = $(this).find('.UnitWeight').find(":selected").val();
            dataObject.Qty = $(this).find(".Quantity").val();
            //alert("PriceList " + $(this).find(".PriceList").val());
            //alert("UnitPrice " + $(this).find(".UnitPrice").val());
            dataObject.PriceList = ConvertAmount($(this).find(".PriceList").val());
            dataObject.UnitPrice = ConvertAmount($(this).find(".UnitPrice").val());
            dataObject.Amount = ConvertAmount($(this).find(".Amount").val());
            dataObject.CreateBy = localStorage['UserID'];
            dataObject.EditBy = localStorage['UserID'];
            if ($(this).find(".UnitWeight").val() != '' && $(this).find(".Quantity").val() != '' && $(this).find(".UnitPrice").val() != '')
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
            dataObject.ExpenseDetail = $(this).find(".ExpenseDetail").val();
            dataObject.UnitWeight = $(this).find('.unitSelect').find(":selected").val();
            dataObject.Qty = $(this).find(".Quantity").val();
            //alert("PriceList1 " + $(this).find(".PriceList1").val());
            //alert("UnitPrice1 " + $(this).find(".UnitPrice1").val());
            dataObject.PriceList = ConvertAmount($(this).find(".PriceList1").val());
            dataObject.UnitPrice = ConvertAmount($(this).find(".UnitPrice1").val());
            dataObject.Amount = ConvertAmount($(this).find(".Amount1").val());
            dataObject.CreateBy = localStorage['UserID'];
            dataObject.EditBy = localStorage['UserID'];
            if ($(this).find(".UnitWeight").val() != '' && $(this).find(".Quantity").val() != '' && $(this).find(".UnitPrice1").val() != '')
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
        //alert("TestManpower");
        var dataObject = {};
        $(".RowCal5").each(function () {
            //alert($(this).find('.FName').val());
            if ($(this).find('.FName').val() != '')
            {
                var workingFrom = $(this).find('.WorkingFrom').val();
                var workingTo = $(this).find('.WorkingTo').val();
                var mDate = ChangeformatDate($(this).find(".ManDate").val(),1);

                dataObject.JobID = ID;
                dataObject.TechnicianID = $(this).find('.TechnicianID').val();
                dataObject.ManDate = mDate;
                dataObject.ManDay = $(this).find('.ManDay').val();
                dataObject.ManTime = $(this).find(".ManTime").val();
                dataObject.FromHour = workingFrom;
                dataObject.ToHour = workingTo;
                dataObject.Break1 = $(this).find('.chkBreak1').is(":checked") == true ? 1 : 0;
                dataObject.Break2 = $(this).find('.chkBreak2').is(":checked") == true ? 1 : 0;
                dataObject.TotalHours = $(this).find(".TotalHours").val();
                dataObject.NormalDay = $(this).find(".NormalDay").val();
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
            dataObject.Amount = ConvertAmount($(this).find(".Amount2").val());
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
            dataObject.Amount = ConvertAmount($(this).find(".Amount3").val());
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
            dataObject.Amount = ConvertAmount($(this).find(".Amount4").val());
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
        //alert('Create is completed');
        RedirectJobOrderBorrow(ID);
        //window.location.href = "../JobOrder/EditJobOrder?id=" + ID;
}
function CalSum() {
    var total = 0;
    var SubTotal = 0;
    var Discount = 0;
    $(".RowCal").each(function () {
        var qty = $(this).find(".Quantity").val().replace(',', '');
        var price = $(this).find(".UnitPrice").val().replace(',', '');
        var amount = qty * price;

        $(this).find('.Amount').val(amount);
        total = total + parseFloat($(this).find('.Amount').val());
    });

    $('.Amount').formatNumber({ format: "#,###.00", locale: "us" });
    Discount = $('#txtDiscount').val();
    $('#txtDiscount').val(Discount).formatNumber({ format: "#,###.00", locale: "us" });

    SubTotal = total - Discount;
    $('#txtTotal').val(total).formatNumber({ format: "#,###.00", locale: "us" });
    $('#txtSubTotal').val(SubTotal).formatNumber({ format: "#,###.00", locale: "us" });
    $('#txtNoCompound').val(SubTotal).formatNumber({ format: "#,###.00", locale: "us" });

    Profit = SubTotal - parseFloat($('#txtTotalExpense').val());

    if (Profit < 0) {
        $("#txtProfit").val(Profit).css('color', 'red').formatNumber({ format: "#,###.00", locale: "us" });
    }
    else {
        $("#txtProfit").val(Profit).css('color', 'black').formatNumber({ format: "#,###.00", locale: "us" });
    }
}
function ConvertAmount(val) {
    var Amount = 0;
    Amount = val;
    Amount = Amount.replace(/,/g, "");
    if (Amount % 1 == 0) {
        Amount = parseFloat(Amount, 10);
    }

    return Amount;
}

function CalSumExpense() {
    var totalExpense = 0;
    var SubTotal = 0;
    var Profit = 0;
    
    $(".RowCal1").each(function () {
        var qty = $(this).find(".Quantity").val().replace(',', '');
        var price = $(this).find(".UnitPrice1").val().replace(',', '');
        var amount = parseFloat(qty) * parseFloat(price);

        $(this).find('.Amount1').val(amount);
        totalExpense = totalExpense + parseFloat($(this).find('.Amount1').val());
    });

    $('.Amount1').formatNumber({ format: "#,###.00", locale: "us" });
    SubTotal = ConvertAmount($('#txtSubTotal').val());

    Profit = SubTotal - totalExpense;
    $('#txtTotalExpense').val(totalExpense).formatNumber({ format: "#,###.00", locale: "us" })
    $('#txtExpense').val(totalExpense).formatNumber({ format: "#,###.00", locale: "us" });

    if (Profit < 0) {
        $("#txtProfit").val(Profit).css('color', 'red').formatNumber({ format: "#,###.00", locale: "us" });
    }
    else {
        $("#txtProfit").val(Profit).css('color', 'black').formatNumber({ format: "#,###.00", locale: "us" });
    }
}

function AddRowIncome() {
    var dataObject = { IsJobOrder: 'true' };
    $.ajax({
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
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

    var dataObject = { typeID: '010' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('.UnitWeight:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.UnitWeight:last').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function AddRowExpense() {

    var WorkingType = $('#hidTypeWorking').val();
    var dataObject = { TypeWorking: WorkingType };
    $.ajax({
        url: 'http://localhost:13131/api/JobOrderExpense',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $('.ExpenseSelect:last').find("option").remove();
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
    $('.RowCal td').click(function () {
        row_index2 = $(this).parent().index();
    });
    $('.RowCal1 td').click(function () {
        row_index3 = $(this).parent().index();
    });
    $('.RowCal2 td').click(function () {
        row_index4 = $(this).parent().index();
    });
    $('.RowCal3 td').click(function () {
        row_index5 = $(this).parent().index();
    });
    $('.RowCal4 td').click(function () {
        row_index6 = $(this).parent().index();
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
            minLength: 1,
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

function convertFloat(str, num) {

    if (num == 2) {
        $(str).eq(row_index2).val($(str).eq(row_index2).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
    }
    else if (num == 3) {
        $(str).eq(row_index3).val($(str).eq(row_index3).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
    }
    else if (num == 4) {
        $(str).eq(row_index4).val($(str).eq(row_index4).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
    }
    else if (num == 5) {
        $(str).eq(row_index5).val($(str).eq(row_index5).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
    }
    else if (num == 6) {
        $(str).eq(row_index6).val($(str).eq(row_index6).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
    }
    else {
        $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
    }
}

function ValidateJobOrder()
{
    var validatehtml = '';
    //alert("Isvalidate");
    $(".RowCal5").each(function () {
        var fName = $(this).find('.FName').val();
        var manDate = $(this).find('.ManDate').val();
        var workingFrom = $(this).find('.WorkingFrom').val();
        var WorkingTo = $(this).find('.WorkingTo').val();

        if (fName != '') {
            if (manDate == '') {
                validatehtml += '<div class="modal-body modal-body-Warning">Please input Date.</div>';
            }
            if (workingFrom == '') {
                validatehtml += '<div class="modal-body modal-body-Warning">Please input FROM.</div>';
            }
            if (WorkingTo == '') {
                validatehtml += '<div class="modal-body modal-body-Warning">Please input TO.</div>';
            }
        }
    });
    if ($("#dtJobDate").val() == '') {
        validatehtml += '<div class="modal-body modal-body-Warning">Please input วันที่.</div>';
    }
    if ($("#dtSWorking").val() == '') {
        validatehtml += '<div class="modal-body modal-body-Warning">Please input วันเริ่มทำงาน.</div>';
    }
    if ($("#dtEWorking").val() == '') {
        validatehtml += '<div class="modal-body modal-body-Warning">Please input วันจบงาน.</div>';
    }
    if ($("#txtJobBy").val() == '') {
        validatehtml += '<div class="modal-body modal-body-Warning">Please input รับงานโดย.</div>';
    }
    if ($("#txtIssuedBy").val() == '') {
        validatehtml += '<div class="modal-body modal-body-Warning">Please input ออกโดย.</div>';
    }
    if (validatehtml != '') {
        $('#ShowDialog').modal('show');
        var html = '<div class="modal-dialog modal-dialog-warning">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header modal-header-warning">';
        html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        html += '<h4 class="modal-title">JobOrder</h4>';
        html += '</div>';
        html += validatehtml;
        html += '</div></div>';
        document.getElementById("ShowDialog").innerHTML = html;
    }
    else {
        CreateData();
    }
}



