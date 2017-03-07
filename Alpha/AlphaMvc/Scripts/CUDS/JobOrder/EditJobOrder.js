$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();

    $('.Number').number(true, 2);

    $("#customerBody").on("click", "tr", function (e) {
        $("#txtCustomerName").val($(this).find("td:eq(3)").text());
        $("#hidCustID").val($(this).find("td:eq(1)").text());
        $("#txtTel").val($(this).find("td:eq(4)").text());
        $("#txtContact").val($(this).find("td:eq(5)").text());
        $("#txtCoWorker").val($(this).find("td:eq(6)").text());
        $("#txtFax").val($(this).find("td:eq(7)").text());
        $("#txtAddress").val($(this).find("td:eq(8)").text());
    })

    $(window).load(function () {
         //Income
        $('.cloneRowIncome').click(function () {
            $('.RowCal:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal:last').find('td input[type=text]').eq(1).val('');
            CalSum();
        });
        
        //Expense
        $('.cloneRowExpense').click(function () {
            $('.RowCal1:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal1:last').find('td input[type=text]').eq(1).val('');
            CalSumExpense();
        });

        //SaleOrder
        $('.cloneRowSaleOrder').click(function () {
            $('.RowCal2:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal2:last').find('td input[type=text]').eq(1).val('');
            CalSumExpense();
        });
        
        //Invoice
        $('.cloneRowInvoice').click(function () {
            $('.RowCal3:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal3:last').find('td input[type=text]').eq(1).val('');
            CalSumExpense();
        });

        //Receipt
        $('.cloneRowReceipt').click(function () {
            $('.RowCal4:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal4:last').find('td input[type=text]').eq(1).val('');
            CalSumExpense();
        });
    });

    //cmbIncomeMaster(0);

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

$(function () {

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
//function cmbIncomeMaster(val) {
//    $.ajax({
//        url: 'http://localhost:13131/api/IncomeMaster',
//        type: 'GET',
//        async: false,
//        dataType: 'json',
//        success: function (data) {
//            data = JSON.parse(data);
//            //alert(val);
//            $.each(data.Table, function (i) {
//                //alert('master');
//                //alert(data.Table[i].ID);
//                //alert(data.Table[i].Detail); 
//                $('.Select1').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
//            });
//            if (val == 0) {
//                //alert('000');
//                $('.Select1').find('option:first-child').attr('selected', true);
//            }
//            else {
//                //alert('111');
//                //alert(val);
//                $(".Select1").val(val);
//            }
//        },
//        failure: function () {
//            alert('Error');
//        }
//    });
//}
function GetData(val) {
    localStorage['flagAddRowIncome'] = 1;
    var dataObject = { ID: val }
    $.ajax(
   {
       url: 'http://localhost:13131/api/JobOrder',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           var JobDate = new Date(data.Table[0].JobDate);
           JobDate = $.datepicker.formatDate('mm/dd/yy', JobDate);
           var SWorking = new Date(data.Table[0].SWorking);
           SWorking = $.datepicker.formatDate('mm/dd/yy', SWorking);
           var EWorking = new Date(data.Table[0].EWorking);
           EWorking =  $.datepicker.formatDate('mm/dd/yy', EWorking);

           $("#hidCustID").val(data.Table[0].CustID), $("#txtJobNo").val(data.Table[0].JobNo), $("#dtJobDate").val(JobDate), $("#txtCar").val(data.Table[0].Car), $("#dtSWorking").val(SWorking), $("#dtEWorking").val(EWorking), $("#txtJobBy").val(data.Table[0].JobBy), $("#txtIssuedBy").val(data.Table[0].IssuedBy), $("#cmbTypeWorking").val(data.Table[0].TypeWorking), $("#cmbJobStatus").val(data.Table[0].JobStatus), $("#txtDetail").val(data.Table[0].Detail),
             $("#txtCustomerName").val(data.Table[0].Name), $("#txtTel").val(data.Table[0].Tel), $("#txtFax").val(data.Table[0].Fax),
             $("#txtContact").val(data.Table[0].Contact), $("#txtCoWorker").val(data.Table[0].CoWorker), $("#txtAddress").val(data.Table[0].Address),
             $("#txtJobReference").val(data.Table[0].JobRef), $("#hidBDCID").val(data.Table[0].JobRef), $("#txtRemark").val(data.Table[0].Remark),
             $("#txtDiscount").val(data.Table[0].Discount).number(true, 2);

           ////Binding Data Income
           if (data.Table1.length > 0) {
               for(var j=0;j< data.Table1.length;j++)
               {
                   $("#add-row6").trigger("click");
               }
               $('.RowCal:eq('+ data.Table1.length +')').remove();
               
               SetIncomeMaster();
                
                $(".RowCal").each(function (i) {
                    $(this).find('.tdno').val(data.Table1[i].RowNum);
                    $(this).find('.JobID').val(data.Table1[i].JobID);
                    $(this).find('.IncomeID').val(data.Table1[i].ID);
                    alert('GetData IncomeType ' +data.Table1[i].IncomeType);
                    $(this).find('.Select1').val(data.Table1[i].IncomeType).change();
                    $(this).find('.UnitWeight').val(data.Table1[i].UnitWeight).number(true, 2);
                    $(this).find('.Quantity').val(data.Table1[i].Qty).number(true, 2);
                    $(this).find('.Price').val(data.Table1[i].UnitPrice).number(true, 2);
                    $(this).find('.Amount').val(data.Table1[i].Amount).number(true, 2);
               });
                CalSum();
           }

           if (data.Table2.length > 0) {
               ////Binding Data Expense
               for (var j = 0; j < data.Table2.length; j++) {
                   $("#add-row7").trigger("click");
               }
               $('.RowCal1:eq(' + data.Table2.length + ')').remove();
               SetExpenseType();
               SetUnitWeight();

               $(".RowCal1").each(function (i) {
                   $(this).find('.tdno').val(data.Table2[i].RowNum);
                   $(this).find('.ExpenseID').val(data.Table2[i].ID);
                   $(this).find('.JobID').val(data.Table2[i].JobID);
                   //alert(data.Table2[i].ExpenseType);
                   $(this).find('.ExpenseSelect').val(data.Table2[i].ExpenseType).change();
                   //alert(data.Table2[i].UnitWeight);
                   $(this).find('.unitSelect').val(data.Table2[i].UnitWeight).change();
                   $(this).find('.Quantity').val(data.Table2[i].Qty).number(true, 2);
                   $(this).find('.Price').val(data.Table2[i].UnitPrice).number(true, 2);
                   $(this).find('.Amount1').val(data.Table2[i].Amount).number(true, 2);
               });
               CalSumExpense();
           }

           ////Binding Data Total
           var SubTotal = data.Table7[0].SubTotelIncome;
           var TotalExpense = data.Table8[0].TotelExpense;
           var Profit = SubTotal - TotalExpense;

           $("#txtTotal").val(data.Table6[0].TotelIncome).number(true, 2), $("#txtSubTotal").val(data.Table7[0].SubTotelIncome).number(true, 2),
           $("#txtNoCompound").val(data.Table7[0].SubTotelIncome).number(true, 2), $("#txtExpense").val(data.Table8[0].TotelExpense).number(true, 2),
           $("#txtTotalExpense").val(data.Table8[0].TotelExpense).number(true, 2);
           if (Profit < 0) {
               $("#txtProfit").number(true, 2).val(Profit).css('color', 'red');
           }
           else {
               $("#txtProfit").number(true, 2).val(Profit).css('color', 'black');
           }

           ////Binding Data SaleOrder
           if (data.Table3.length > 0) {
               for (var j = 0; j < data.Table3.length; j++) {
                   $("#add-row3").trigger("click");
               }
               $('.RowCal2:eq(' + data.Table3.length + ')').remove();

               $(".RowCal2").each(function (i) {
                   $(this).find('.tdno').val(data.Table3[i].RowNum);
                   $(this).find('.SaleOrderID').val(data.Table3[i].ID);
                   $(this).find('.JobID').val(data.Table3[i].JobID);
                   $(this).find('.SaleOrderNo').val(data.Table3[i].SaleOrderNo);
                   $(this).find('.Amount2').val(data.Table3[i].Amount).number(true, 2);
               });
           }

           ////Binding Data Invoice
           if (data.Table4.length > 0) {
               for (var j = 0; j < data.Table4.length; j++) {
                   $("#add-row4").trigger("click");
               }
               $('.RowCal3:eq(' + data.Table4.length + ')').remove();
               $(".RowCal3").each(function (i) {
                   $(this).find('.tdno').val(data.Table4[i].RowNum);
                   $(this).find('.InvoiceID').val(data.Table4[i].ID);
                   $(this).find('.JobID').val(data.Table4[i].JobID);
                   $(this).find('.SaleOrderNo').val(data.Table4[i].SaleOrderNo);
                   $(this).find('.InvoiceNo').val(data.Table4[i].InvoiceNo);
                   $(this).find('.Amount3').val(data.Table4[i].Amount).number(true, 2);
               });
           }

           ////Binding Data Receipt
           if (data.Table5.length > 0) {
               for (var j = 0; j < data.Table5.length; j++) {
                   $("#add-row5").trigger("click");
               }
               $('.RowCal4:eq(' + data.Table5.length + ')').remove();
               $(".RowCal4").each(function (i) {
                   $(this).find('.tdno').val(data.Table5[i].RowNum);
                   $(this).find('.ReceiptID').val(data.Table5[i].ID);
                   $(this).find('.JobID').val(data.Table5[i].JobID);
                   $(this).find('.ReceiptNo').val(data.Table5[i].ReceiptNo);
                   $(this).find('.InvoiceNo').val(data.Table5[i].InvoiceNo);
                   $(this).find('.Amount4').val(data.Table5[i].Amount).number(true, 2);
               });
           }
       },
       error: function (msg) {
           alert(msg);
       }
   });
    localStorage['flagAddRowIncome'] = 0;
}
function SetIncomeMaster()
{
    $.ajax({
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'GET',
        async:false,
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);
            alert('SetIncomeMaster');
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
function SetExpenseType() {
    $.ajax({
        url: 'http://localhost:13131/api/ExpenseMaster',
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);

            $.each(data.Table, function (i) {
                $(".ExpenseSelect").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.ExpenseSelect').find('option:first-child').attr('selected', true);
            //for (i = 0; i < tmp.length; i++) {
            //    $(".ExpenseSelect:eq(" + i + ")").val(tmp[i].ExpenseType).change();
            //}
        },
        failure: function () {
            alert('Error');
        }
    });
}

function SetUnitWeight() {

    var dataObject = { typeID: '010' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);

            $.each(data.Table, function (i) {
                $(".unitSelect").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.unitSelect').find('option:first-child').attr('selected', true);
            //for (i = 0; i < tmp.length; i++) {
            //    $(".unitSelect:eq(" + i + ")").val(tmp[i].UnitWeight).change();
            //}
        },
        failure: function () {
            alert('Error');
        }
    });
}
function Update(val) {
    var dataObject = {
        ID: val, JobDate: $("#dtJobDate").val(), Car: $("#txtCar").val(), SWorking: $("#dtSWorking").val(), EWorking: $("#dtEWorking").val(),
        JobBy: $("#txtJobBy").val(), IssuedBy: $("#txtIssuedBy").val(), TypeWorking: $("#cmbTypeWorking").find(":selected").val(),
        JobStatus: $("#cmbJobStatus").find(":selected").val(), Detail: $("#txtDetail").val(), CustID: $("#hidCustID").val(),
        Remark: $("#txtRemark").val(), Discount: $("#txtDiscount").val(), Price: $('#txtSubTotal').val(), Cost: $('#txtExpense').val(), EditBy: localStorage['UserID']
    };
    console.log(dataObject);
    var JobID;
    $.ajax(
    {
        url: 'http://localhost:13131/api/JobOrder',
        type: 'PUT',
        async: false,
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            JobID = data;
            $("#hidJobID").val(data)
        },
        error: function (msg) {
            alert(msg);
        }
    });
    
    var dataObject = {};
    $(".RowCal").each(function () {
        dataObject.ID = $(this).find(".IncomeID").val();
        dataObject.JobID = JobID;
        dataObject.IncomeType = $(this).find('.Select1').find(":selected").val();
        alert($(this).find('.Select1').find(":selected").val())
        dataObject.UnitWeight = $(this).find(".UnitWeight").val();
        dataObject.Qty = $(this).find(".Quantity").val();
        dataObject.UnitPrice = $(this).find(".Price").val();
        dataObject.Amount = ConvertAmount($(this).find(".Amount").val());
        dataObject.EditBy = localStorage['UserID'];

        if (JobID != 0 && $(this).find(".UnitWeight").val() != '' && $(this).find(".Quantity").val() != '' && $(this).find(".Price").val() != '') {
            $.ajax(
            {
                url: 'http://localhost:13131/api/JobOrderIncome',
                type: 'PUT',
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
        dataObject.ID = $(this).find(".ExpenseID").val();
        dataObject.JobID = JobID;
        dataObject.ExpenseType = $(this).find('.ExpenseSelect').find(":selected").val();
        dataObject.UnitWeight = $(this).find('.unitSelect').find(":selected").val();
        dataObject.Qty = $(this).find(".Quantity").val();
        dataObject.UnitPrice = $(this).find(".Price").val();
        dataObject.Amount = ConvertAmount($(this).find(".Amount1").val());
        dataObject.EditBy = localStorage['UserID'];
        if (JobID != 0 && $(this).find(".UnitWeight").val() != '' && $(this).find(".Quantity").val() != '' && $(this).find(".Price").val() != '') {
            $.ajax(
            {
                url: 'http://localhost:13131/api/JobOrderExpense',
                type: 'PUT',
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
    ////===================Insert JobOrderSaleOrder 
    var dataObject = {};
    $(".RowCal2").each(function () {
        dataObject.ID = $(this).find(".SaleOrderID").val();
        dataObject.JobID = JobID;
        dataObject.SaleOrderNo = $(this).find(".SaleOrderNo").val();
        dataObject.Amount = ConvertAmount($(this).find(".Amount2").val());
        dataObject.EditBy = localStorage['UserID'];
        if (JobID != 0 && $(this).find(".SaleOrderNo").val() != '') {
            $.ajax(
            {
                url: 'http://localhost:13131/api/JobOrderSaleOrder',
                type: 'PUT',
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
        dataObject.ID = $(this).find(".InvoiceID").val();
        dataObject.JobID = JobID;
        dataObject.SaleOrderNo = $(this).find(".SaleOrderNo").val();
        dataObject.InvoiceNo = $(this).find(".InvoiceNo").val();
        dataObject.Amount = ConvertAmount($(this).find(".Amount3").val());
        dataObject.EditBy = localStorage['UserID'];
        if (JobID != 0 && $(this).find(".SaleOrderNo").val() != '' && $(this).find(".InvoiceNo").val() != '') {
            $.ajax(
            {
                url: 'http://localhost:13131/api/JobOrderInvoice',
                type: 'PUT',
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
        dataObject.ID = $(this).find(".ReceiptID").val();
        dataObject.JobID = JobID;
        dataObject.ReceiptNo = $(this).find(".ReceiptNo").val();
        dataObject.InvoiceNo = $(this).find(".InvoiceNo").val();
        dataObject.Amount = ConvertAmount($(this).find(".Amount4").val());
        dataObject.EditBy = localStorage['UserID'];
        if (JobID != 0 && $(this).find(".ReceiptNo").val() != '' && $(this).find(".InvoiceNo").val() != '') {
            $.ajax(
            {
                url: 'http://localhost:13131/api/JobOrderReceipt',
                type: 'PUT',
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
    alert('Update is completed');
    
    window.location.href = "../JobOrder/EditJobOrder?id=" + $("#hidJobID").val();
}
function ConvertAmount(val)
{
    var Amount = 0;
    Amount = val;
    Amount = Amount.replace(/,/g, "");
    if (Amount % 1 == 0)
    {
        Amount = parseInt(Amount, 10);
    }   
    //alert(Amount);
    return Amount;
}
function CalSum() {
    var total = 0;
    var SubTotal = 0;
    var Discount = 0;
    $('.Number').number(true, 2);

    $(".RowCal").each(function () {
        var qty = $(this).find(".Quantity").val();
        var price = $(this).find(".Price").val();
        var amount = qty * price;


        $(this).find('.Amount').val(amount).number(true, 2);
        $(this).find('.Price').val(price).number(true, 2);
        $(this).find('.Quantity').val(qty).number(true, 2);
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
function CalSumExpense() {
    var totalExpense = 0;
    var SubTotal = 0;
    var Profit = 0;
    SubTotal = CalSum();
    $('.Number').number(true, 2);
    $(".RowCal1").each(function () {
        var qty = $(this).find(".Quantity").val();
        var price = $(this).find(".Price").val();
        var amount = qty * price;

        $(this).find('.Amount1').val(amount).number(true, 2);
        $(this).find('.Price').val(price).number(true, 2);
        $(this).find('.Quantity').val(qty).number(true, 2);
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
    if (localStorage['flagAddRowIncome'] == 0) {
        $.ajax({
            url: 'http://localhost:13131/api/IncomeMaster',
            type: 'GET',
            async:false,
            dataType: 'json',
            success: function (data) {
                alert('AddRowIncome');
                
                data = JSON.parse(data);
                $('.Select1:last').find("option").remove();
                $.each(data.Table, function (i) {
                    alert(data.Table[i].ID);
                    $('.Select1:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
                });
                $('.Select1:last').find('option:first-child').attr('selected', true);
            },
            failure: function () {
                alert('Error');
            }
        });
    }
}
function AddRowExpense() {
    if (localStorage['flagAddRowIncome'] == 0) {
        $.ajax({
            url: 'http://localhost:13131/api/ExpenseMaster',
            type: 'GET',
            dataType: 'json',
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
                $('.unitSelect:last').find("option").remove();
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
    localStorage['flagAddRowIncome'] = 0;
}
function Redirect() {
    window.location.href = "../JobOrder/EditJobOrder?id=" + $("#hidJobID").val();
}
function convertFloat()
{
    $('.Number').number(true, 2);
}
function DateWorking() {
    if ($("#dtSWorking").datepicker({ dateFormat: "mm/dd/yy" }).val() > $("#dtEWorking").datepicker({ dateFormat: "mm/dd/yy" }).val()) {
        $("#dtEWorking").val("")
        alert("Please Input Endworking more than Startworking");
    }
}