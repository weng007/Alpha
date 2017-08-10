var row_index = 0;//RowCal5 Manpower
var row_index2 = 0;//RowCal Income
var row_index3 = 0;//RowCal1 Expense
var row_index4 = 0;//RowCal2 SaleOrder
var row_index5 = 0;//RowCal3 Invoice
var row_index6 = 0;//RowCal4 Receipt
var row_index7 = 0;//RowCal6 Requisition
var col_index = 0;//RowCal5 Manpower

$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();
    CheckAuthorization();

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

        //Manpower
        $('.cloneRowManpower').click(function () {
            $('.RowCal5:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal5:last').find('td input[type=text]').eq(1).val('');
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

        //Requisition
        $('.cloneRowRequisition').click(function () {
            $('.RowCal6:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal6:last').find('td input[type=text]').eq(1).val('');
        });
    });

    //Autocomplete Manpower
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
            //var totalPosition = 0;
            $(this).val(ui.item.label);
            $('.CardID:last').val(ui.item.IDCard);
            $('.TechnicianType').val(ui.item.TechnicianType);
            $('.TechnicianID').val(ui.item.TechnicianID);
            $('.PositionID').val(ui.item.PositionID);
            return false;
        }
    });

    //Autocomplete Requisition Serial
    var Description;
    var Size;
    var Model;
    var UnitWeight;
    var Brand;
    var Remain;
    var dataitem;
    $('.txtSerial').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: 'http://localhost:13131/api/JobOrderBorrowRefID',
                type: 'GET',
                dataType: 'json',
                data: { Criteria: request.term },
                success: function (data) {
                    data = JSON.parse(data);
                    dataitem = data;
                    response($.map(data.Table, function (item) {
                        return {
                            Description: item.Description,
                            Size: item.Size,
                            Model: item.Model,
                            UnitWeight: item.UnitWeightName,
                            Brand: item.Brand,
                            Remain: item.Remain,
                            label: item.SerialNo,
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
        minLength: 1,
        select: function (event, ui) {
            //var totalPosition = 0;
            $(this).val(ui.item.label);
            $('.hidProductID').val(ui.item.value);
            $('.txtDescription').val(ui.item.Description);
            $('.txtSize').val(ui.item.Size);
            $('.txtModel').val(ui.item.Model);
            $('.txtBrand').val(ui.item.Brand);
            $('.txtRemain').val(ui.item.Remain);
            $('.txtUnitWeight').val(ui.item.UnitWeight);
            return false;
        }
    });

    //Autocomplete Requisition Description
    var Serial;
    var Size;
    var Model;
    var UnitWeight;
    var Brand;
    var Remain;
    var dataitem;
    $('.txtDescription').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: 'http://localhost:13131/api/JobOrderBorrowRefID',
                type: 'GET',
                dataType: 'json',
                data: { Criteria: request.term },
                success: function (data) {
                    data = JSON.parse(data);
                    dataitem = data;
                    response($.map(data.Table, function (item) {
                        return {
                            Serial: item.SerialNo,
                            Size: item.Size,
                            Model: item.Model,
                            UnitWeight: item.UnitWeightName,
                            Brand: item.Brand,
                            Remain: item.Remain,
                            label: item.Description,
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
        minLength: 1,
        select: function (event, ui) {
            //var totalPosition = 0;
            $(this).val(ui.item.label);
            $('.hidProductID').val(ui.item.value);
            $('.txtSerial:last').val(ui.item.Serial);
            $('.txtSize').val(ui.item.Size);
            $('.txtModel').val(ui.item.Model);
            $('.txtBrand').val(ui.item.Brand);
            $('.txtRemain').val(ui.item.Remain);
            $('.txtUnitWeight').val(ui.item.UnitWeight);
            return false;
        }
    });

    //GetContact();

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
    $('#tabManpower').dynoTable2();
    $('#tabSaleOrder').dynoTable3();
    $('#tabInvoice').dynoTable4();
    $('#tabReceipt').dynoTable5();
    $('#tabIncome').dynoTable6();
    $('#tabCost').dynoTable7();
    $('#tabRequisition').dynoTable10();

    //$('.ManDate').datepicker();
    //$('.WorkingFrom').timepicker();
    //$('.WorkingTo').timepicker();

    $('.WorkingFrom').timepicker({ 'timeFormat': 'H:i' });
    $('.WorkingTo').timepicker({ 'timeFormat': 'H:i' });

});

function BrowseCustomer(val) {

    var dataObject = { BDCID: val }
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

function ControlEnable(Isview) {
    //var Isview = val;
    if (Isview) {
        document.getElementById("chkApprove").disabled = true;
        document.getElementById("chkReturn").disabled = true;
        document.getElementById("btnSave").disabled = true;
        document.getElementById("add-row10").style.visibility = "hidden";
    }
}
function GetJobNo(val) {
    $('#txtJobNo1').val(val);
}
function GetData(val) {
    var dataObject = { ID: val }
    console.log(dataObject);
    $.ajax(
   {
       url: 'http://localhost:13131/api/JobOrder',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           localStorage['flagAddRow'] = 0;
           data = JSON.parse(data);
           var JobDate = ChangeformatDate(data.Table[0].JobDate, 0);
           var SWorking = ChangeformatDate(data.Table[0].SWorking, 0);
           var EWorking = ChangeformatDate(data.Table[0].EWorking, 0);

           $("#hidCustID").val(data.Table[0].CustID), $("#txtJobNo").val(data.Table[0].CustID), $("#dtJobDate").val(JobDate), $("#txtCar").val(data.Table[0].Car), $("#dtSWorking").val(SWorking), $("#dtEWorking").val(EWorking), $("#txtJobBy").val(data.Table[0].JobBy), $("#txtIssuedBy").val(data.Table[0].IssuedBy), $("#cmbTypeWorking").val(data.Table[0].TypeWorking), $("#cmbJobStatus").val(data.Table[0].JobStatus), $("#txtDetail").val(data.Table[0].Detail),
             $("#cmbContact").val(data.Table[0].ContactID), $("#cmbCoWorker").val(data.Table[0].CoWorkerID),
             $("#txtCustomerName").val(data.Table[0].Name), $("#txtTel").val(data.Table[0].Tel), $("#txtFax").val(data.Table[0].Fax),
             $("#txtAddress").val(data.Table[0].Address), $("#txtJobReference").val(data.Table[0].BDCNo),
             $("#hidBDCID").val(data.Table[0].JobRef), $("#txtRemark").val(data.Table[0].Remark),
             $("#txtDiscount").val(data.Table[0].Discount), $("#txtJobSite").val(data.Table[0].JobSite), $("#txtLocation").val(data.Table[0].Location);

           BrowseCustomer($("#hidBDCID").val());
           
           SetIncomeMaster();
           SetExpenseType();
           SetUnitWeight();
           SetUnitWeightExpense();

           ////Binding Data Income
           if (data.Table1.length > 0) {          
               $('.RowCal').remove();
               for(var j=0;j< data.Table1.length;j++)
               {
                   $("#add-row6").trigger("click");
                   SetRowIndex();
               }
               $('.RowCal:eq('+ data.Table1.length +')').remove();
               
               SetIncomeMaster();
               SetUnitWeightExpense();
                
               $(".RowCal").each(function (i) {
                   $(this).find('.tdno').val(data.Table1[i].RowNum);
                   $(this).find('.JobID').val(data.Table1[i].JobID);
                   $(this).find('.IncomeID').val(data.Table1[i].ID);
                   $(this).find('.Select1').val(data.Table1[i].IncomeType).change();
                   $(this).find('.Detail').val(data.Table1[i].Detail);
                   $(this).find('.UnitWeight').val(data.Table1[i].UnitWeight).change();
                   $(this).find('.Quantity').val(data.Table1[i].Qty);
                   $(this).find('.PriceList').val(data.Table1[i].PriceList);
                   $(this).find('.UnitPrice').val(data.Table1[i].UnitPrice).formatNumber({ format: "#,###.00", locale: "us" });
                   $(this).find('.Amount').val(data.Table1[i].Amount).formatNumber({ format: "#,###.00", locale: "us" });
               });
               CalSum();
           }
           
           if (data.Table2.length > 0) {
               $('.RowCal1').remove();
               ////Binding Data Expense
               for (var j = 0; j < data.Table2.length; j++) {
                   $("#add-row7").trigger("click");
                   SetRowIndex();
               }
               $('.RowCal1:eq(' + data.Table2.length + ')').remove();
               SetExpenseType();
               SetUnitWeight();

               $(".RowCal1").each(function (i) {
                   $(this).find('.tdno').val(data.Table2[i].RowNum);
                   $(this).find('.ExpenseID').val(data.Table2[i].ID);
                   $(this).find('.JobID').val(data.Table2[i].JobID);
                   $(this).find('.ExpenseSelect').val(data.Table2[i].ExpenseType).change();
                   $(this).find('.ExpenseDetail').val(data.Table2[i].ExpenseDetail);
                   $(this).find('.unitSelect').val(data.Table2[i].UnitWeight).change();
                   $(this).find('.Quantity').val(data.Table2[i].Qty);
                   $(this).find('.PriceList1').val(data.Table2[i].PriceList);
                   $(this).find('.UnitPrice1').val(data.Table2[i].UnitPrice).formatNumber({ format: "#,###.00", locale: "us" });
                   $(this).find('.Amount1').val(data.Table2[i].Amount).formatNumber({ format: "#,###.00", locale: "us" });
               });
               CalSumExpense();
           }
           
           //Binding Data Total
           if (data.Table6[0].TotalIncome >0)
           {
               var SubTotal = data.Table7[0].SubTotalIncome;
               var TotalExpense = data.Table8[0].TotalExpense;
               var Profit = SubTotal - TotalExpense;

               $("#txtTotal").val(data.Table6[0].TotalIncome).formatNumber({ format: "#,###.00", locale: "us" });;
               $("#txtSubTotal").val(data.Table7[0].SubTotalIncome).formatNumber({ format: "#,###.00", locale: "us" });;
               $("#txtNoCompound").val(data.Table7[0].SubTotalIncome).formatNumber({ format: "#,###.00", locale: "us" });;
               $("#txtExpense").val(data.Table8[0].TotalExpense).formatNumber({ format: "#,###.00", locale: "us" });;
               $("#txtTotalExpense").val(data.Table8[0].TotalExpense).formatNumber({ format: "#,###.00", locale: "us" });;
               if (Profit < 0) {
                   $("#txtProfit").val(Profit).css('color', 'red').formatNumber({ format: "#,###.00", locale: "us" });;
               }
               else {
                   $("#txtProfit").val(Profit).css('color', 'black').formatNumber({ format: "#,###.00", locale: "us" });;
               }
           }
           
           //Binding Data Manpower
           if (data.Table9.length > 0) {
               $('.RowCal5').remove();
               ////Binding Data Expense                   
               //setFDate.setHours(data.Table9[i].FromHour, data.Table9[i].FromMinute, 00);
               //setTDate.setHours(data.Table9[i].ToHour, data.Table9[i].ToMinute, 00);
               
               for (var j = 0; j < data.Table9.length; j++) {
                   $("#add-row2").trigger("click");
                   AddrowManpower();
                   //GetManpowerHour();
               }
               $('.RowCal5:eq(' + data.Table9.length + ')').remove();

               $(".RowCal5").each(function (i) {
                   var setFTime = data.Table9[i].FromHour;
                   var setTTime = data.Table9[i].ToHour;

                   var fDate = setFTime.split(":");
                   var tDate = setTTime.split(":");
                   var fHour = fDate[0];
                   var fMinute = fDate[1];
                   var tHour = tDate[0];
                   var tMinute = tDate[1];

                   var setDate = new Date();
                   setDate.setHours(fHour, fMinute, 0);

                   var setDate2 = new Date();
                   setDate2.setHours(tHour, tMinute, 0);
                   var Break1 = data.Table9[i].Break1 == '1' ? true : false;
                   var Break2 = data.Table9[i].Break2 == '1' ? true : false;

                   var ManDate = ChangeformatDate(data.Table9[i].ManDate, 0)
                   //var manDay = GetManDay(ChangeformatDate(data.Table9[i].ManDate, 1));
                   $(this).find('.tdno').val(data.Table9[i].RowNum);
                   $(this).find('.ManpowerID').val(data.Table9[i].ID);
                   $(this).find('.TechnicianID').val(data.Table9[i].TechnicianID);
                   $(this).find('.JobID').val(data.Table9[i].JobID);
                   $(this).find('.FName').val(data.Table9[i].TechnicianName);
                   $(this).find('.CardID').val(data.Table9[i].IDCard);
                   $(this).find('.TechnicianType').val(data.Table9[i].TechnicianTypeName);
                   $(this).find('.ManDate').val(ManDate == '1900-01-01' ? '' : ManDate);
                   $(this).find('.ManDay').val(GetManDay(ManDate));
                   $(this).find('.ManTime').val(data.Table9[i].ManTime);

                   //$(this).find('.WorkingFrom').timepicker('setTime', FTime, { 'timeFormat': 'H:i' });
                   $(this).find('.WorkingFrom').timepicker('setTime', setDate);
                   $(this).find('.WorkingTo').timepicker('setTime', setDate2);
                   $(this).find('.chkBreak1').prop('checked', Break1);
                   $(this).find('.chkBreak2').prop('checked', Break2);

                   //$(this).find('.WorkingTo').timepicker('setTime', TTime, { 'timeFormat': 'H:i' });
                   $(this).find('.TotalHours').val(data.Table9[i].TotalHours);
                   $(this).find('.NormalDay').val(data.Table9[i].NormalDay);
                   $(this).find('.ManNormal').val(data.Table9[i].ManNormal);
                   $(this).find('.ManPremium').val(data.Table9[i].ManPremium);
                   $(this).find('.ManPremium2').val(data.Table9[i].ManPremium2);
                   $(this).find('.ManSpecial').val(data.Table9[i].ManSpecial);

                   
               });
               
               //GetManpowerHour();
               //CalSumExpense();
           }

           if (data.Table10[0].Sup > 0 || data.Table10[0].FM > 0 || data.Table10[0].Tech > 0 || data.Table10[0].TSafety > 0) {
               $("#txtManSup").val(data.Table10[0].Sup),
               $("#txtManFM").val(data.Table10[0].FM),
               $("#txtManTech").val(data.Table10[0].Tech),
               $("#txtManSafety").val(data.Table10[0].tSafety);
           }

           ////Binding Data SaleOrder
           if (data.Table3.length > 0) {
               $('.RowCal2').remove();
               for (var j = 0; j < data.Table3.length; j++) {
                   $("#add-row3").trigger("click");
               }
               $('.RowCal2:eq(' + data.Table3.length + ')').remove();

               $(".RowCal2").each(function (i) {
                   $(this).find('.tdno').val(data.Table3[i].RowNum);
                   $(this).find('.SaleOrderID').val(data.Table3[i].ID);
                   $(this).find('.JobID').val(data.Table3[i].JobID);
                   $(this).find('.SaleOrderNo').val(data.Table3[i].SaleOrderNo);
                   $(this).find('.Amount2').val(data.Table3[i].Amount).formatNumber({ format: "#,###.00", locale: "us" });
               });
           }

           ////Binding Data Invoice
           if (data.Table4.length > 0) {
               $('.RowCal3').remove();
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
                   $(this).find('.Amount3').val(data.Table4[i].Amount).formatNumber({ format: "#,###.00", locale: "us" });
               });
           }

           ////Binding Data Receipt
           if (data.Table5.length > 0) {
               $('.RowCal4').remove();
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
                   $(this).find('.Amount4').val(data.Table5[i].Amount).formatNumber({ format: "#,###.00", locale: "us" });
               });
           }

           
       },
       error: function (msg) {
           alert(msg);
       }
   });
    
    localStorage['flagAddRow'] = 1;
    //alert("localStorage "+localStorage['flagAddRow']);
}

function GetdataRequisition(val)
{
    var dataObject = { ID: val }
    console.log(dataObject);
    $.ajax({
        url: 'http://localhost:13131/api/JobOrderBorrowRefID',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           localStorage['flagAddRow'] = 0;
           data = JSON.parse(data);
           if (data.Table.length > 0) {
               $('.RowCal6').remove();

               for (var j = 0; j < data.Table.length; j++) {
                   $("#add-row10").trigger("click");
                   AddrowRequisition();
                   //GetManpowerHour();
               }
               $('.RowCal6:eq(' + data.Table.length + ')').remove();

               $(".RowCal6").each(function (i) {
                   $(this).find('.tdno').val(data.Table[i].RowNum);
                   $(this).find('.RequisitionID').val(data.Table[i].ID);
                   $(this).find('.hidProductID').val(data.Table[i].ProductID);
                   $(this).find('.JobID').val(data.Table[i].JobID);
                   $(this).find('.txtSerial').val(data.Table[i].SerialNo);
                   $(this).find('.txtDescription').val(data.Table[i].Description);
                   $(this).find('.txtSize').val(data.Table[i].Size);
                   $(this).find('.txtUnitWeight').val(data.Table[i].UnitWeightName);
                   $(this).find('.txtModel').val(data.Table[i].Model);
                   $(this).find('.txtBrand').val(data.Table[i].Brand);
                   $(this).find('.txtRemain').val(data.Table[i].Remain);
                   //$(this).find('.WorkingFrom').timepicker('setTime', FTime, { 'timeFormat': 'H:i' });
                   $(this).find('.txtQty').val(data.Table[i].Amount);
                   $(this).find('.txtGood').val(data.Table[i].ReturnGood);
                   $(this).find('.txtLost').val(data.Table[i].ReturnLost);
                   $(this).find('.txtRepair').val(data.Table[i].ReturnRepair);
                   $(this).find('.txtBad').val(data.Table[i].ReturnBad);
                   $(this).find('.txtRemark1').val(data.Table[i].Remark);
               });
           }
           var JobOrderDate = ChangeformatDate(data.Table1[0].JobDate, 0);
           $('#txtProject').val(data.Table1[0].TypeWorking);
           $('#txtJobOrderNo').val(data.Table1[0].JobNo);
           $('#dtJobOrderDate').val(JobOrderDate);
           $('#txtJobLocation').val(data.Table1[0].Location);
           $('#txtCustomer').val(data.Table1[0].Name);

           if (data.Table2.length > 0)
           {
               var chkIsApprove = data.Table2[0].IsApprove;
               var chkIsReturn = data.Table2[0].IsReturn;
               if (chkIsApprove == '1') {
                   $('#chkApprove').prop('checked', true);
               }
               if (chkIsReturn == '1') {
                   $('#chkReturn').prop('checked', true);
               }
               $('#hidRequisitionID').val(data.Table2[0].ID);
               $('#hidTaker').val(data.Table2[0].Taker);
               $('#hidApprover').val(data.Table2[0].Approver);
               $('#hidGiver').val(data.Table2[0].Giver);
               $('#hidIsApprove').val(data.Table2[0].IsApprove);
               $('#hidIsReturn').val(data.Table2[0].IsReturn);
               $('#hidJobID').val(data.Table2[0].JobID);
               $('#txtTaker').val(data.Table2[0].TakerName);
               $('#txtApprover').val(data.Table2[0].ApproverName);
               $('#txtReturner').val(data.Table2[0].GiverName);
               
               //alert($('#hidTaker').val());
           }
       }
    });
    //alert("GetAutherize");
    CheckAuthorization();
    localStorage['flagAddRow'] = 1; 
}

function SetIncomeMaster()
{
    var dataObject = { IsJobOrder: 'true' };
    $.ajax({
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'GET',
        async:false,
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
}

function SetExpenseType() {
    var dataObject = { IsJobOrder: true };
    $.ajax({
        url: 'http://localhost:13131/api/ExpenseMaster',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);

            $.each(data.Table, function (i) {
                $(".ExpenseSelect").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.ExpenseSelect').find('option:first-child').attr('selected', true);
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
        },
        failure: function () {
            alert('Error');
        }
    });
}
function SetUnitWeightExpense() {

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
                $(".UnitWeight").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.UnitWeight').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function ApproveRequisition()
{
    var IsApprove = $('#chkApprove').is(":checked") == true ? '1' : '0';
    //alert(IsApprove);
    var Approver = localStorage['UserID'];
    if (IsApprove == '1') {
        //alert("Approve")
        var dataObject = {
            ID: $('#hidRequisitionID').val(), Taker: $('#hidTaker').val(), IsApprove: IsApprove, Approver: localStorage['UserID'], Giver: $('#hidGiver').val(), IsReturn: '0', EditBy: localStorage['UserID']
        };
    }
    else
    {
        //alert("UnApprove")
        var dataObject = {
            ID: $('#hidRequisitionID').val(), Taker: $('#hidTaker').val(), IsApprove: '0', Approver: 0, Giver: $('#hidGiver').val(), IsReturn: '0', EditBy: localStorage['UserID']
        };
    }
    //alert("UpdateRequisitionApprove");
    $.ajax(
    {
        url: 'http://localhost:13131/api/Requisition',
        type: 'POST',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            //alert("Approve success");
        },
        error: function (msg) {
            alert(msg)
        }
    });
    //alert($('#hidJobID').val());
    window.location.href = "../Requisition/EditRequisition?id=" + $('#hidJobID').val();
}
function ReturnStock() {
    var IsReturn = $('#chkReturn').is(":checked") == true ? '1' : '0';
    //alert(IsReturn);
    var Giver = localStorage['UserID'];
    if (IsReturn == '1')
    {
        //alert("Return")
        var dataObject = {
            ID: $('#hidRequisitionID').val(), Taker: $('#hidTaker').val(), Approver: $('#hidApprover').val(), Giver: Giver, IsApprove: $('#hidIsApprove').val(), IsReturn: IsReturn, EditBy: localStorage['UserID']
        };
    }
    else {
        //alert("UnReturn")
        var dataObject = {
            ID: $('#hidRequisitionID').val(), Taker: $('#hidTaker').val(), Approver: $('#hidApprover').val(), Giver: '0', IsApprove: $('#hidIsApprove').val(), IsReturn: 0, EditBy: localStorage['UserID']
        };
    }
    
    //alert("UpdateRequisitionReturn");
    $.ajax(
    {
        url: 'http://localhost:13131/api/Requisition',
        type: 'POST',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            //$('#hidRequisitionID').val(data);
        },
        error: function (msg) {
            alert(msg)
        }
    });
    //alert($('#hidJobID').val());
    window.location.href = "../Requisition/EditRequisition?id=" + $('#hidJobID').val();
}
function Update(val)
{
    //===================UpdateJobOrderBorrow
    //alert(val);
    var dataObject = { ID: val };
    $.ajax({
                url: 'http://localhost:13131/api/JobOrderBorrow',
                type: 'DELETE',
                async: false,
                data: dataObject,
                datatype: 'json',
                success: function (data) {
                },
                error: function (msg) {
                    alert(msg)
                }
    });

    var dataObject = {};
    //alert("hidRequisitionID " + $('#hidRequisitionID').val());
    if ($('#hidRequisitionID').val() == '')
    {
        
        if ($(".RowCal6").eq(0).find('.hidProductID').val() != '') {
            //alert("InsertRequisition");
            var Requisitiondata = {
                JobID: val, Taker: localStorage['UserID'], CreateBy: localStorage['UserID'], EditBy: localStorage['UserID']
            };
            $.ajax(
            {
                url: 'http://localhost:13131/api/Requisition',
                type: 'POST',
                async: false,
                data: Requisitiondata,
                datatype: 'json',
                success: function (data) {
                    $('#hidRequisitionID').val(data);
                    //alert($('#hidRequisitionID').val());
                },
                error: function (msg) {
                    alert(msg)
                }
            });
        }
    }
    else {
            //alert("UpdateRequisition");
            var Requisitiondata = {
                ID: $('#hidRequisitionID').val(), Taker: localStorage['UserID'], Approver: $('#hidApprover').val(), Giver: $('#hidGiver').val(), IsApprove: $('#hidIsApprove').val(), IsReturn: $('#hidIsReturn').val(), EditBy: localStorage['UserID']
            };
            $.ajax(
            {
                url: 'http://localhost:13131/api/Requisition',
                type: 'POST',
                async: false,
                data: Requisitiondata,
                datatype: 'json',
                success: function (data) {
                    //alert("Data " + data);
                    //$('#hidRequisitionID').val(data);
                },
                error: function (msg) {
                    alert(msg)
                }
            });
    }

        $(".RowCal6").each(function () {
            //alert("RequistionID "+$('#hidRequisitionID').val());
            dataObject.RequisitionID = $('#hidRequisitionID').val();
            dataObject.ProductID = $(this).find('.hidProductID').val();
            dataObject.Amount = $(this).find('.txtQty').val();
            dataObject.ReturnGood = $(this).find(".txtGood").val();
            dataObject.ReturnLost = $(this).find(".txtLost").val();
            dataObject.ReturnRepair = $(this).find(".txtRepair").val();
            dataObject.ReturnBad = $(this).find(".txtBad").val();
            dataObject.Remark = $(this).find(".txtRemark1").val();
            dataObject.CreateBy = localStorage['UserID'];
            dataObject.EditBy = localStorage['UserID'];

            if ($(this).find(".hidProductID").val() != '') {
                $.ajax(
                {
                    url: 'http://localhost:13131/api/JobOrderBorrow',
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
    
    $('#hidJobID').val(val);
    //alert("JobID "+$('#hidJobID').val());
    window.location.href = "../Requisition/EditRequisition?id=" + val;
}
function CheckBorrow() {
    var BorrowAmount = $('.txtQty').eq(row_index7).val();
    var Remain = $('.txtRemain').eq(row_index7).val();
    if (Remain < BorrowAmount) {
        alert('จำนวนที่ยืมต้องน้อยกว่าหรือเท่ากับจำนวนคงเหลือ');
        $('.txtQty').eq(row_index7).val(0);
    }
}

//function Update1(val) {
//    //alert("test");
//    var JDate = ChangeformatDate($("#dtJobDate").val(),1);
//    var SWorkingDate = ChangeformatDate($("#dtSWorking").val(),1);
//    var EWorkingDate = ChangeformatDate($("#dtEWorking").val(), 1);
//    var dataObject = {
//        ID: val, JobDate: JDate, Car: $("#txtCar").val(), SWorking: SWorkingDate, EWorking: EWorkingDate,
//        JobBy: $("#txtJobBy").val(), IssuedBy: $("#txtIssuedBy").val(), TypeWorking: $("#cmbTypeWorking").find(":selected").val(),
//        JobStatus: $("#cmbJobStatus").find(":selected").val(), Detail: $("#txtDetail").val(), CustID: $("#hidCustID").val(),
//        ContactID: $("#cmbContact").find(":selected").val(), CoWorkerID: $("#cmbCoWorker").find(":selected").val(),
//        Remark: $("#txtRemark").val(), Discount: $("#txtDiscount").val(), Price: $('#txtSubTotal').val(), Cost: $('#txtExpense').val(), JobSite:$("#txtJobSite").val(), Location: $("#txtLocation").val(), EditBy: localStorage['UserID']
//    };
//    console.log(dataObject);
//    var JobID;
//    $.ajax(
//    {
//        url: 'http://localhost:13131/api/JobOrder',
//        type: 'PUT',
//        async: false,
//        data: dataObject,
//        datatype: 'json',
//        success: function (data) {
//            JobID = data;
//            //alert("Success JobOrder"+JobID);
//            $("#hidJobID").val(data)
//        },
//        error: function (msg) {
//            alert(msg);
//        }
//    });
//    //alert("Test JobID" + JobID);
//    var dataObject = { JobID: JobID};
//    $.ajax(
//            {
//                url: 'http://localhost:13131/api/JobOrderIncome',
//                type: 'DELETE',
//                async: false,
//                data: dataObject,
//                datatype: 'json',
//                success: function (data) {
//                },
//                error: function (msg) {
//                    alert(msg)
//                }
//            });  
//    var dataObject = {};
//    $(".RowCal").each(function () {
//        dataObject.JobID = JobID;
//        dataObject.IncomeType = $(this).find('.Select1').find(":selected").val();
//        dataObject.Detail = $(this).find(".Detail").val();
//        dataObject.UnitWeight = $(this).find('.UnitWeight').find(":selected").val();
//        dataObject.Qty = $(this).find(".Quantity").val();
//        dataObject.PriceList = ConvertAmount($(this).find(".PriceList").val());
//        dataObject.UnitPrice = ConvertAmount($(this).find(".UnitPrice").val());
//        dataObject.Amount = ConvertAmount($(this).find(".Amount").val());
//        dataObject.EditBy = localStorage['UserID'];
//        if (JobID != 0 && $(this).find(".UnitWeight").val() != '' && $(this).find(".Quantity").val() != '' && $(this).find(".UnitPrice").val() != '') {
//            $.ajax(
//            {
//                url: 'http://localhost:13131/api/JobOrderIncome',
//                type: 'POST',
//                async: false,
//                data: dataObject,
//                datatype: 'json',
//                success: function (data) {
//                },
//                error: function (msg) {
//                    alert(msg)
//                }
//            });
//        }
//    });
//    //===================Insert JobOrderExpense
//    var dataObject = {};
//    $(".RowCal1").each(function () {
//        dataObject.ID = $(this).find(".ExpenseID").val();
//        dataObject.JobID = JobID;
//        dataObject.ExpenseType = $(this).find('.ExpenseSelect').find(":selected").val();
//        dataObject.ExpenseDetail = $(this).find(".ExpenseDetail").val();
//        dataObject.UnitWeight = $(this).find('.unitSelect').find(":selected").val();
//        dataObject.Qty = $(this).find(".Quantity").val();
//        dataObject.PriceList = ConvertAmount($(this).find(".PriceList1").val());
//        dataObject.UnitPrice = ConvertAmount($(this).find(".UnitPrice1").val());
//        dataObject.Amount = ConvertAmount($(this).find(".Amount1").val());
//        dataObject.EditBy = localStorage['UserID'];
//        if (JobID != 0 && $(this).find(".UnitWeight").val() != '' && $(this).find(".Quantity").val() != '' && $(this).find(".UnitPrice1").val() != '') {
//            $.ajax(
//            {
//                url: 'http://localhost:13131/api/JobOrderExpense',
//                type: 'POST',
//                async: false,
//                data: dataObject,
//                datatype: 'json',
//                success: function (data) {
//                },
//                error: function (msg) {
//                    alert(msg)
//                }
//            });
//        }
//    });
//    //===================UpdateJobOrderManpower
//    //alert("TestManpower");
//    var dataObject = {};
//    $(".RowCal5").each(function () {
//        //alert($(this).find('.FName').val());
//        //if ($(this).find('.FName').val() != '') {
//        //alert("test Row5");
//            var workingFrom = $(this).find('.WorkingFrom').val();
//            var workingTo = $(this).find('.WorkingTo').val();
//            var mDate = ChangeformatDate($(this).find(".ManDate").val(), 1);
//            dataObject.JobID = JobID;
//            dataObject.TechnicianID = $(this).find('.TechnicianID').val();
//            dataObject.ManDate = mDate;
//            dataObject.ManDay = $(this).find('.ManDay').val();
//            dataObject.ManTime = $(this).find(".ManTime").val();
//            dataObject.FromHour = workingFrom;
//            dataObject.ToHour = workingTo;
//            dataObject.Break1 = $(this).find('.chkBreak1').is(":checked") == true ? 1 : 0;
//            dataObject.Break2 = $(this).find('.chkBreak2').is(":checked") == true ? 1 : 0;
//            dataObject.TotalHours = $(this).find(".TotalHours").val();
//            dataObject.NormalDay = $(this).find(".NormalDay").val();
//            dataObject.ManNormal = $(this).find(".ManNormal").val();
//            dataObject.ManPremium = $(this).find(".ManPremium").val();
//            dataObject.ManPremium2 = $(this).find(".ManPremium2").val();
//            dataObject.ManSpecial = $(this).find(".ManSpecial").val();
//            dataObject.EditBy = localStorage['UserID'];          
//        //alert("test JobMan")
//            if ($(this).find(".TechnicianID").val() != '') {
//                $.ajax(
//                {
//                    url: 'http://localhost:13131/api/JobOrderManpower',
//                    type: 'POST',
//                    async: false,
//                    data: dataObject,
//                    datatype: 'json',
//                    success: function (data) {
//                    },
//                    error: function (msg) {
//                        alert(msg)
//                    }
//                });
//            }
//        //}
//    });
//    ////===================Insert JobOrderSaleOrder 
//    var dataObject = {};
//    $(".RowCal2").each(function () {
//        dataObject.ID = $(this).find(".SaleOrderID").val();
//        dataObject.JobID = JobID;
//        dataObject.SaleOrderNo = $(this).find(".SaleOrderNo").val();
//        dataObject.Amount = ConvertAmount($(this).find(".Amount2").val());
//        dataObject.EditBy = localStorage['UserID'];
//        if (JobID != 0 && $(this).find(".SaleOrderNo").val() != '') {
//            $.ajax(
//            {
//                url: 'http://localhost:13131/api/JobOrderSaleOrder',
//                type: 'POST',
//                async: false,
//                data: dataObject,
//                datatype: 'json',
//                success: function (data) {
//                },
//                error: function (msg) {
//                    alert(msg)
//                }
//            });
//        }
//    });
//    ////===================Insert JobOrderInvoice
//    var dataObject = {};
//    $(".RowCal3").each(function () {
//        dataObject.ID = $(this).find(".InvoiceID").val();
//        dataObject.JobID = JobID;
//        dataObject.SaleOrderNo = $(this).find(".SaleOrderNo").val();
//        dataObject.InvoiceNo = $(this).find(".InvoiceNo").val();
//        dataObject.Amount = ConvertAmount($(this).find(".Amount3").val());
//        dataObject.EditBy = localStorage['UserID'];
//        if (JobID != 0 && $(this).find(".SaleOrderNo").val() != '' && $(this).find(".InvoiceNo").val() != '') {
//            $.ajax(
//            {
//                url: 'http://localhost:13131/api/JobOrderInvoice',
//                type: 'POST',
//                async: false,
//                data: dataObject,
//                datatype: 'json',
//                success: function (data) {
//                },
//                error: function (msg) {
//                    alert(msg)
//                }
//            });
//        }
//    });
//    ////===================Insert JobOrderReceipt
//    var dataObject = {};
//    $(".RowCal4").each(function () {
//        dataObject.ID = $(this).find(".ReceiptID").val();
//        dataObject.JobID = JobID;
//        dataObject.ReceiptNo = $(this).find(".ReceiptNo").val();
//        dataObject.InvoiceNo = $(this).find(".InvoiceNo").val();
//        dataObject.Amount = ConvertAmount($(this).find(".Amount4").val());
//        dataObject.EditBy = localStorage['UserID'];
//        if (JobID != 0 && $(this).find(".ReceiptNo").val() != '' && $(this).find(".InvoiceNo").val() != '') {
//            $.ajax(
//            {
//                url: 'http://localhost:13131/api/JobOrderReceipt',
//                type: 'POST',
//                async: false,
//                data: dataObject,
//                datatype: 'json',
//                success: function (data) {
//                },
//                error: function (msg) {
//                    alert(msg)
//                }
//            });
//        }
//    });
//    //alert('Update is completed');
//    window.location.href = "../JobOrder/EditJobOrder?id=" + $("#hidJobID").val();
//}
function ConvertAmount(val)
{
    var Amount = 0;
    Amount = val;
    Amount = Amount.replace(/,/g, "");
    if (Amount % 1 == 0)
    {
        Amount = parseFloat(Amount, 10);
    }   

    return Amount;
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

    Profit =  SubTotal - parseFloat($('#txtTotalExpense').val());
    if (Profit < 0) {
        $("#txtProfit").val(Profit).css('color', 'red').formatNumber({ format: "#,###.00", locale: "us" });
    }
    else {
        $("#txtProfit").val(Profit).css('color', 'black').formatNumber({format:"#,###.00", locale:"us"});
    }
}
function CalSumExpense() {
    var totalExpense = 0;
    var SubTotal = 0;
    var Profit = 0;

    $(".RowCal1").each(function () {
        var qty = $(this).find(".Quantity").val().replace(',','');
        var price = $(this).find(".UnitPrice1").val().replace(',','');
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
    if (localStorage['flagAddRow'] == 1) {
        var dataObject = { IsJobOrder: 'true' };
        $.ajax({
            url: 'http://localhost:13131/api/IncomeMaster',
            type: 'GET',
            dataType: 'json',
            data: dataObject,
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

        var dataObject = { typeID: '010' };
        $.ajax({
            url: 'http://localhost:13131/api/MasterService/',
            type: 'GET',
            dataType: 'json',
            data: dataObject,
            success: function (data) {
                data = JSON.parse(data);
                $('.UnitWeight:last').find("option").remove();
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
}
function AddRowExpense() {
    if (localStorage['flagAddRow'] == 1) {
        var dataObject = { IsJobOrder: true };
        $.ajax({
            url: 'http://localhost:13131/api/ExpenseMaster',
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
function AddrowRequisition() {

    //Autocomplete Requisition Serial
    var Description;
    var Size;
    var Model;
    var UnitWeight;
    var Brand;
    var Remain;
    var dataitem;
    $('.txtSerial').each(function () {
        $(this).autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: 'http://localhost:13131/api/JobOrderBorrowRefID',
                    type: 'GET',
                    dataType: 'json',
                    data: { Criteria: request.term },
                    success: function (data) {
                        data = JSON.parse(data);
                        dataitem = data;
                        response($.map(data.Table, function (item) {
                            return {
                                Description: item.Description,
                                Size: item.Size,
                                Model: item.Model,
                                UnitWeight: item.UnitWeightName,
                                Brand: item.Brand,
                                Remain: item.Remain,
                                label: item.SerialNo,
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
            minLength: 1,
            select: function (event, ui) {
                //var totalPosition = 0;
                $(this).val(ui.item.label);
                $('.hidProductID').eq(row_index7).val(ui.item.value);
                $('.txtDescription').eq(row_index7).val(ui.item.Description);
                $('.txtSize').eq(row_index7).val(ui.item.Size);
                $('.txtModel').eq(row_index7).val(ui.item.Model);
                $('.txtBrand').eq(row_index7).val(ui.item.Brand);
                $('.txtRemain').eq(row_index7).val(ui.item.Remain);
                $('.txtUnitWeight').eq(row_index7).val(ui.item.UnitWeight);
                return false;
            }
        });
    });

    //Autocomplete Requisition Description
    var Serial;
    var Size;
    var Model;
    var UnitWeight;
    var Brand;
    var Remain;
    var dataitem;
    $('.txtDescription').each(function () {
        $(this).autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: 'http://localhost:13131/api/JobOrderBorrowRefID',
                    type: 'GET',
                    dataType: 'json',
                    data: { Criteria: request.term },
                    success: function (data) {
                        data = JSON.parse(data);
                        dataitem = data;
                        response($.map(data.Table, function (item) {
                            return {
                                Serial: item.SerialNo,
                                Size: item.Size,
                                Model: item.Model,
                                UnitWeight: item.UnitWeightName,
                                Brand: item.Brand,
                                Remain: item.Remain,
                                label: item.Description,
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
            minLength: 1,
            select: function (event, ui) {
                //var totalPosition = 0;
                $(this).val(ui.item.label);
                $('.hidProductID').eq(row_index7).val(ui.item.value);
                $('.txtSerial:last').eq(row_index7).val(ui.item.Serial);
                $('.txtSize').eq(row_index7).val(ui.item.Size);
                $('.txtModel').eq(row_index7).val(ui.item.Model);
                $('.txtBrand').eq(row_index7).val(ui.item.Brand);
                $('.txtRemain').eq(row_index7).val(ui.item.Remain);
                $('.txtUnitWeight').eq(row_index7).val(ui.item.UnitWeight);
                return false;
            }
        });
    });
}
function SetRowIndex() {
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
    //Requisition
    $('.RowCal6 td').click(function () {
        row_index7 = $(this).parent().index();
    });
}


//function countPosition() {

//    var totalSup = 0;
//    var totalFM = 0;
//    var totalTech = 0;
//    var totalSafety = 0;
//    //alert(tSup)
//    for (var i = 0; i < $(".RowCal5").length; i++) {

//        if ($('.PositionID:eq(' + i + ')').val() == 11) {
//            totalSup = totalSup + 1;
//            $('#txtManSup').val(totalSup);
//        }
//        if ($('.PositionID:eq(' + i + ')').val() == 22) {
//            totalFM = totalFM + tFM;
//            $('#txtManFM').val(totalFM);
//        }
//        if ($('.PositionID:eq(' + i + ')').val() == 33) {
//            totalTech = totalTech + tTech;
//            $('#txtManTech').val(totalTech);
//        }
//        if ($('.PositionID:eq(' + i + ')').val() == 44) {
//            totalSafety = totalSafety + tSafety;
//            $('#txtManSafety').val(totalSafety);
//        }
//    }
//}
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
function GetManpowerHour() {
    var TechnicianID = $('.TechnicianID').eq(row_index).val();
    var ManDate = $('.ManDate').eq(row_index).val();
    var FromTime = $('.WorkingFrom').eq(row_index).val();
    var ToTime = $('.WorkingTo').eq(row_index).val();
    var workingFrom = $('.WorkingFrom').eq(row_index).val();
    var workingTo = $('.WorkingTo').eq(row_index).val();

    if (ManDate != '') {
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

        var d = new Date(year, month - 1, day);

        x = d.getDay();
        $('.ManDay').eq(row_index).val(days[x]);
    }

    if (workingFrom != '') {
        var fromHours = workingFrom.split(':')[0]
        var fromMinute = workingFrom.split(':')[1]
        var toHours;
        var toMinute;
        if (workingTo != '') {
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

        if (total == '0:00') {
            $('.TotalHours').eq(row_index).val('0:00');
        }
        else {
            $('.TotalHours').eq(row_index).val(total);
        }
    }
    if (TechnicianID != '' && ManDate != '' && FromTime != '' && ToTime != '') {
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
                    $('.NormalDay').eq(row_index).val(data.Table[0].NormalDay);
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

function Redirect() {
    window.location.href = "../JobOrder/EditJobOrder?id=" + $("#hidJobID").val();
}
function convertFloat(str, num)
{
    if (num == 2) {
        $(str).eq(row_index2).val($(str).eq(row_index2).val().replace(',','')).formatNumber({ format: "#,###.00", locale: "us" });
    }
    else if (num == 3) {
        $(str).eq(row_index3).val($(str).eq(row_index3).val().replace(',','')).formatNumber({ format: "#,###.00", locale: "us" });
    }
    else if (num == 4) {
        $(str).eq(row_index4).val($(str).eq(row_index4).val().replace(',','')).formatNumber({ format: "#,###.00", locale: "us" });
    }
    else if (num == 5) {
        $(str).eq(row_index5).val($(str).eq(row_index5).val().replace(',','')).formatNumber({ format: "#,###.00", locale: "us" });
    }
    else if (num == 6) {
        $(str).eq(row_index6).val($(str).eq(row_index6).val().replace(',','')).formatNumber({ format: "#,###.00", locale: "us" });
    }
    else {
        $(str).val($(str).val().replace(',','')).formatNumber({ format: "#,###.00", locale: "us" });
    }
}
function DateWorking() {
    if ($("#dtSWorking").datepicker({ dateFormat: "mm/dd/yy" }).val() > $("#dtEWorking").datepicker({ dateFormat: "mm/dd/yy" }).val()) {
        $("#dtEWorking").val("")
        alert("Please Input Endworking more than Startworking");
    }
}
function OpenRptJobOrder(val) {
    window.location.href = "../Reports/FormReport/RptReportViewer.aspx?id=" + val;
}
