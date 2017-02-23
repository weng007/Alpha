$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();

    $("#customerBody").on("click", "tr", function (e) {
        $("#txtCustomerName").val($(this).find("td:eq(3)").text());
        $("#hidCustID").val($(this).find("td:eq(1)").text());
        $("#txtTel").val($(this).find("td:eq(4)").text());
        $("#txtContact").val($(this).find("td:eq(5)").text());
        $("#txtCoWorker").val($(this).find("td:eq(6)").text());
        $("#txtFax").val($(this).find("td:eq(7)").text());
        $("#txtAddress").val($(this).find("td:eq(8)").text());
    })

    cmbIncomeMaster(0);

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
function cmbIncomeMaster(val) {
    $.ajax({
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);
            //alert(val);
            $.each(data.Table, function (i) {
                //alert('master');
                //alert(data.Table[i].ID);
                //alert(data.Table[i].Detail); 
                $('.Select1').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            if (val == 0) {
                //alert('000');
                $('.Select1').find('option:first-child').attr('selected', true);
            }
            else {
                //alert('111');
                //alert(val);
                $(".Select1").val(val);
            }
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetData(val) {
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
           EWorking = SWorking = $.datepicker.formatDate('mm/dd/yy', EWorking);

           $("#hidCustID").val(data.Table[0].Customer), $("#txtJobNo").val(data.Table[0].JobNo), $("#dtJobDate").val(JobDate), $("#txtCar").val(data.Table[0].Car), $("#dtSWorking").val(SWorking), $("#dtEWorking").val(EWorking), $("#txtJobBy").val(data.Table[0].JobBy), $("#txtIssuedBy").val(data.Table[0].IssuedBy), $("#cmbTypeWorking").val(data.Table[0].TypeWorking), $("#cmbJobStatus").val(data.Table[0].JobStatus), $("#txtDetail").val(data.Table[0].Detail),
             $("#txtCustomerName").val(data.Table[0].Name), $("#txtTel").val(data.Table[0].Tel), $("#txtFax").val(data.Table[0].Fax),
             $("#txtContact").val(data.Table[0].Contact), $("#txtCoWorker").val(data.Table[0].CoWorker), $("#txtAddress").val(data.Table[0].Address),
             $("#txtJobReference").val(data.Table[0].JobRef), $("#hidBDCID").val(data.Table[0].JobRef), $("#txtRemark").val(data.Table[0].Remark),
             $("#txtDiscount").val(data.Table[0].Discount);

           ////Binding Data Income
           if (data.Table1.length > 0) {
               $('.Select1').find("option").remove();
               var html = '<tbody>';
               for (var i = 0; i < data.Table1.length; i++) {
                   html += '<tr class="RowCal">';
                   html += '<td>';
                   html += '<img class="drag-handle" src="/Images/drag.png" alt="click and drag to rearrange" />';
                   html += '</td>';
                   html += '<td> <input id="No" type="text" value="' + data.Table1[i].RowNum + '" class="tdno" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="IncomeID" type="text" value="' + data.Table1[i].ID + '" class="IncomeID" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="JobID" type="text" value="' + data.Table1[i].JobID + '" class="JobID" disabled /></td>';
                   
                   html += '<td> <select id="cmbIncomeType" class="Select1" value = "'+data.Table1.IncomeType+'"></select></td>';

                   html += '<td> <input type="text" id="txtUnitWeight" value="' + data.Table1[i].UnitWeight + '" class="UnitWeight text-size80 textright"></td>';
                   html += '<td> <input type="text" id="txtQty" class="Quantity text-size80 textright" value="' + parseFloat(data.Table1[i].Qty).toFixed(2) + '" placeholder="0" onchange="CalSum()" /></td>';
                   html += '<td> <input type="text" id="txtUnitPrice" class="Price text-size130 textright" value="' + parseFloat(data.Table1[i].UnitPrice).toFixed(2) + '" placeholder="0" onchange="CalSum()" /></td>';
                   html += '<td> <input type="text" id="txtAmount"  class="Amount text-size165 txtdisablerow" value="' + parseFloat(data.Table1[i].Amount).toFixed(2) + '" disabled></td>';
                   html += '<td> <div class="clone-1"><img class="row-cloner" src="/images/clone.png" alt="Clone Row" /></div></td>';
                   html += '<td> <img class="row-remover" src="/images/remove.png" alt="Remove Row" /></td>';
                   html += '</tr>';
               }
               html += '</tbody>';
               document.getElementById("tBodyRowIncome").innerHTML = html;                        
               SetIncomeMaster(data.Table1);            
           }

           if (data.Table2.length > 0) {
               ////Binding Data Expense
               $('.ExpenseSelect').find("option").remove();
               $('.unitSelect').find("option").remove();
               var html = '<tbody>';
               for (var i = 0; i < data.Table2.length; i++) {
                   html += '<tr class="RowCal1">';
                   html += '<td>';
                   html += '<img class="drag-handle" src="/Images/drag.png" alt="click and drag to rearrange" />';
                   html += '</td>';
                   html += '<td> <input id="No" type="text" value="' + data.Table2[i].RowNum + '" class="tdno" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="ExpenseID" type="text" value="' + data.Table2[i].ID + '" class="ExpenseID" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="JobID" type="text" value="' + data.Table2[i].JobID + '" class="JobID" disabled /></td>';
                   html += '<td> <select id="cmbExpenseType" class="ExpenseSelect" value="' + data.Table2[i].ExpenseType + '"></select></td>';
                   html += '<td> <select  class="unitSelect" value="' + data.Table2[i].UnitWeight + '"></select></td>';
                   html += '<td> <input type="text" id="txtQty" class="Quantity text-size80 textright" value="' + parseFloat(data.Table2[i].Qty).toFixed(2) + '" placeholder="0" onchange="CalSumExpense()" /></td>';
                   html += '<td> <input type="text" id="txtUnitPrice" class="Price text-size130 textright" value="' + parseFloat(data.Table2[i].UnitPrice).toFixed(2) + '" placeholder="0" onchange="CalSumExpense()" /></td>';
                   html += '<td> <input type="text" id="txtAmount"  class="Amount text-size165 txtdisablerow" value="' + parseFloat(data.Table2[i].Amount).toFixed(2) + '" disabled></td>';
                   html += '<td> <div class="clone-1"><img class="row-cloner" src="/images/clone.png" alt="Clone Row" /></div></td>';
                   html += '<td> <img class="row-remover" src="/images/remove.png" alt="Remove Row" /></td>';
                   html += '</tr>';
               }
               html += '</tbody>';
               document.getElementById("tBodyRowExpense").innerHTML = html;
           }

           ////Binding Data Total
           alert('test Bind Total');
           var SubTotal = data.Table7[0].SubTotelIncome;
           var TotalExpense = data.Table8[0].TotelExpense;
           var Profit = SubTotal - TotalExpense;

           $("#txtTotal").val(data.Table6[0].TotelIncome).number(true, 2), $("#txtSubTotal").val(data.Table7[0].SubTotelIncome).number(true, 2),
           $("#txtNoCompound").val(data.Table7[0].SubTotelIncome).number(true, 2), $("#txtExpense").val(data.Table8[0].TotelExpense).number(true, 2),
           $("#txtTotalExpense").val(data.Table8[0].TotelExpense).number(true, 2),
           $("#txtProfit").val(Profit).number(true, 2);

           ////Binding Data SaleOrder
           if (data.Table3.length > 0) {
               var html = '<tbody>';
               for (var i = 0; i < data.Table3.length; i++) {
                   html += '<tr class="RowCal2">';
                   html += '<td>';
                   html += '<img class="drag-handle" src="/Images/drag.png" alt="click and drag to rearrange" />';
                   html += '</td>';
                   html += '<td> <input id="No" type="text" value="' + data.Table3[i].RowNum + '" class="tdno" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="SaleOrderID" type="text" value="' + data.Table3[i].ID + '" class="SaleOrderID" /></td>';
                   html += '<td class="hidecolumn"><input id="JobID" type="text" value="' + data.Table3[i].JobID + '" class="JobID" disabled /></td>';
                   html += '<td> <input type="text" id="txtSaleOrderNo" value="' + data.Table3[i].SaleOrderNo + '" class="SaleOrderNo text-size180 textleft"></td>';
                   html += '<td> <input type="text" id="txtAmount"  class="Amount text-size180 textright" value="' + parseFloat(data.Table3[i].Amount).toFixed(2) + '"></td>';
                   html += '<td> <div class="clone-1"><img class="row-cloner" src="/images/clone.png" alt="Clone Row" /></div></td>';
                   html += '<td> <img class="row-remover" src="/images/remove.png" alt="Remove Row" /></td>';
                   html += '</tr>';
               }
               html += '</tbody>';
               document.getElementById("tBodyRowSaleOrder").innerHTML = html;
           }

           ////Binding Data Invoice
           if (data.Table4.length > 0) {
               var html = '<tbody>';
               for (var i = 0; i < data.Table4.length; i++) {
                   html += '<tr class="RowCal3">';
                   html += '<td>';
                   html += '<img class="drag-handle" src="/Images/drag.png" alt="click and drag to rearrange" />';
                   html += '</td>';
                   html += '<td> <input id="No" type="text" value="' + data.Table4[i].RowNum + '" class="tdno" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="InvoiceID" type="text" value="' + data.Table4[i].ID + '" class="InvoiceID" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="JobID" type="text" value="' + data.Table4[i].JobID + '" class="JobID" disabled /></td>';
                   html += '<td> <input type="text" id="txtInvoiceNo" value="' + data.Table4[i].InvoiceNo + '" class="InvoiceNo text-size165 textleft" ></td>';
                   html += '<td> <input type="text" id="txtSaleOrderNo" value="' + data.Table4[i].SaleOrderNo + '" class="SaleOrderNo text-size165 textleft" ></td>';
                   html += '<td> <input type="text" id="txtAmount"  class="Amount text-size165 textright" value="' + parseFloat(data.Table4[i].Amount).toFixed(2) + '" ></td>';
                   html += '<td> <div class="clone-1"><img class="row-cloner" src="/images/clone.png" alt="Clone Row" /></div></td>';
                   html += '<td> <img class="row-remover" src="/images/remove.png" alt="Remove Row" /></td>';
                   html += '</tr>';
               }
               html += '</tbody>';
               document.getElementById("tBodyRowInvoice").innerHTML = html;
           }

           ////Binding Data Receipt
           if (data.Table5.length > 0) {
               var html = '<tbody>';
               for (var i = 0; i < data.Table5.length; i++) {
                   html += '<tr class="RowCal4">';
                   html += '<td>';
                   html += '<img class="drag-handle" src="/Images/drag.png" alt="click and drag to rearrange" />';
                   html += '</td>';
                   html += '<td> <input id="No" type="text" value="' + data.Table5[i].RowNum + '" class="tdno" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="ReceiptID" type="text" value="' + data.Table5[i].ID + '" class="ReceiptID" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="JobID" type="text" value="' + data.Table5[i].JobID + '" class="JobID" disabled /></td>';
                   html += '<td> <input type="text" id="txtReceiptNo" value="' + data.Table5[i].ReceiptNo + '" class="ReceiptNo text-size165 textleft"></td>';
                   html += '<td> <input type="text" id="txtInvoiceNo" value="' + data.Table5[i].InvoiceNo + '" class="InvoiceNo text-size165 textleft" ></td>';
                   html += '<td> <input type="text" id="txtAmount"  class="Amount text-size165 textright" value="' + parseFloat(data.Table5[i].Amount).toFixed(2) + '" ></td>';
                   html += '<td> <div class="clone-1"><img class="row-cloner" src="/images/clone.png" alt="Clone Row" /></div></td>';
                   html += '<td> <img class="row-remover" src="/images/remove.png" alt="Remove Row" /></td>';
                   html += '</tr>';
               }
               html += '</tbody>';
               document.getElementById("tBodyRowReceipt").innerHTML = html;
           }
       },
       error: function (msg) {
           alert(msg);
       }
   });
}
function Update(val) {
    var dataObject = {
        ID: val, JobDate: $("#dtJobDate").val(), Car: $("#txtCar").val(), SWorking: $("#dtSWorking").val(), EWorking: $("#dtEWorking").val(),
        JobBy: $("#txtJobBy").val(), IssuedBy: $("#txtIssuedBy").val(), TypeWorking: $("#cmbTypeWorking").find(":selected").val(),
        TypeWorking: $("#cmbJobStatus").find(":selected").val(), Detail: $("#txtDetail").val(), Customer: $("#hidCustID").val(),
        Remark: $("#txtRemark").val(), Discount: $("#txtDiscount").val(), EditBy: localStorage['UserID']
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
        dataObject.UnitWeight = $(this).find(".UnitWeight").val();
        dataObject.Qty = $(this).find(".Quantity").val();
        dataObject.UnitPrice = $(this).find(".Price").val();
        dataObject.Amount = $(this).find(".Amount").val();
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
        dataObject.Amount = $(this).find(".Amount").val();
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
        dataObject.Amount = $(this).find(".Amount").val();
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
        dataObject.Amount = $(this).find(".Amount").val();
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
        dataObject.Amount = $(this).find(".Amount").val();
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
    window.location.href = "../BDC/EditBDC?id=" + $("#hidBDCID").val();
}
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
function AddRowIncome(row) {
    $.ajax({
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);

            $('.Select1:last').find("option").remove();
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
function Redirect() {
    window.location = "../BDC/EditBDC?id=" + $("#hidBDCID").val();
}

function SetIncomeMaster(tmp) {
    
     $.ajax({
    url: 'http://localhost:13131/api/IncomeMaster',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        data = JSON.parse(data);

        $.each(data.Table, function (i) {
            $(".Select1").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));       
        });

        for(i=0;i<tmp.length;i++)
        {
            $(".Select1:eq("+i+")").val(tmp[i].IncomeType).change();
        }
    },
    failure: function () {
        alert('Error');
    }
});
}

function DateWorking() {
    if ($("#dtSWorking").datepicker({ dateFormat: "mm/dd/yy" }).val() > $("#dtEWorking").datepicker({ dateFormat: "mm/dd/yy" }).val()) {
        $("#dtEWorking").val("")
        alert("Please Input Endworking more than Startworking");
    }
}