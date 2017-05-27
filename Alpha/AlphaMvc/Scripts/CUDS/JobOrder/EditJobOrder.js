$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();
    CheckAuthorization();
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

    $('.ManDate').eq(row_index).datepicker({
        dateFormat: 'dd/mm/yy'
    });

    $('.RowCal5 td:first').click(function () {
        row_index = $(this).parent().index();
        col_index = $(this).index();
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

    //$('.ManDate').datepicker();
    //$('.WorkingFrom').timepicker();
    //$('.WorkingTo').timepicker();

    $('.WorkingFrom').timepicker({ 'timeFormat': 'H:i' });
    $('.WorkingTo').timepicker({ 'timeFormat': 'H:i' });

});
function GetContact(val) {
    //alert(val);
    var dataObject = { JobID: val };
    $.ajax({
        url: 'http://localhost:13131/api/JobOrder',
        type: 'GET',
        async:false,
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

    var dataObject = { JobID: val };
    $.ajax({
        url: 'http://localhost:13131/api/JobOrder',
        type: 'GET',
        async: false,
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
}
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
    //alert(val);

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
function GetManDay(val) {
    var ManDate = val;
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
    return days[x];
    //$('.ManDay').eq(row_index).val(days[x]);
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

function ControlEnable(Isview) {
    //var Isview = val;
    if (Isview === true) {
        document.getElementById("imgCustomer").disabled = true;
        document.getElementById("txtJobNo").disabled = true;
        document.getElementById("dtJobDate").disabled = true;
        document.getElementById("txtCar").disabled = true;
        document.getElementById("dtSWorking").disabled = true;
        document.getElementById("dtEWorking").disabled = true;
        document.getElementById("txtJobBy").disabled = true;
        document.getElementById("txtIssuedBy").disabled = true;
        document.getElementById("cmbTypeWorking").disabled = true;
        document.getElementById("cmbJobStatus").disabled = true;
        document.getElementById("txtDetail").disabled = true;
        document.getElementById("txtCustomerName").disabled = true;
        document.getElementById("txtTel").disabled = true;
        document.getElementById("txtFax").disabled = true;
        document.getElementById("txtContact").disabled = true;
        document.getElementById("txtCoWorker").disabled = true;
        document.getElementById("txtAddress").disabled = true;
        document.getElementById("txtJobReference").disabled = true;
        document.getElementById("txtDiscount").disabled = true;
        document.getElementById("txtRemark").disabled = true;
        document.getElementById("btnSave").disabled = true;
        document.getElementById("add-row6").style.visibility = "hidden";
        document.getElementById("add-row7").style.visibility = "hidden";
        document.getElementById("add-row3").style.visibility = "hidden";
        document.getElementById("add-row4").style.visibility = "hidden";
        document.getElementById("add-row5").style.visibility = "hidden";
    }
    else {
        document.getElementById("add-row6").style.visibility = "show";
        document.getElementById("add-row7").style.visibility = "show";
        document.getElementById("add-row3").style.visibility = "show";
        document.getElementById("add-row4").style.visibility = "show";
        document.getElementById("add-row5").style.visibility = "show";
    }
    
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

           $("#hidCustID").val(data.Table[0].CustID), $("#txtJobNo").val(data.Table[0].JobNo), $("#dtJobDate").val(JobDate), $("#txtCar").val(data.Table[0].Car), $("#dtSWorking").val(SWorking), $("#dtEWorking").val(EWorking), $("#txtJobBy").val(data.Table[0].JobBy), $("#txtIssuedBy").val(data.Table[0].IssuedBy), $("#cmbTypeWorking").val(data.Table[0].TypeWorking), $("#cmbJobStatus").val(data.Table[0].JobStatus), $("#txtDetail").val(data.Table[0].Detail),
             $("#cmbContact").val(data.Table[0].ContactID), $("#cmbCoWorker").val(data.Table[0].CoWorkerID),
             $("#txtCustomerName").val(data.Table[0].Name), $("#txtTel").val(data.Table[0].Tel), $("#txtFax").val(data.Table[0].Fax),
             $("#txtAddress").val(data.Table[0].Address), $("#txtJobReference").val(data.Table[0].BDCNo),
             $("#hidBDCID").val(data.Table[0].JobRef), $("#txtRemark").val(data.Table[0].Remark),
             $("#txtDiscount").val(data.Table[0].Discount).number(true, 2), $("#txtJobSite").val(data.Table[0].JobSite), $("#txtLocation").val(data.Table[0].Location);

           BrowseCustomer($("#hidBDCID").val());

           SetIncomeMaster();
           ////Binding Data Income
           //alert('Income '+data.Table1.length);
           if (data.Table1.length > 0) {          
               $('.RowCal').remove();
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
                   $(this).find('.Select1').val(data.Table1[i].IncomeType).change();
                   $(this).find('.UnitWeight').val(data.Table1[i].UnitWeight);
                   $(this).find('.Quantity').val(data.Table1[i].Qty).number(true, 0);
                   $(this).find('.Price').val(data.Table1[i].UnitPrice).number(true, 0);
                   $(this).find('.Amount').val(data.Table1[i].Amount).number(true, 2);
               });
               CalSum();
           }
           
           if (data.Table2.length > 0) {
               $('.RowCal1').remove();
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
                   $(this).find('.ExpenseSelect').val(data.Table2[i].ExpenseType).change();
                   $(this).find('.unitSelect').val(data.Table2[i].UnitWeight).change();
                   $(this).find('.Quantity').val(data.Table2[i].Qty).number(true, 0);
                   $(this).find('.Price').val(data.Table2[i].UnitPrice).number(true, 0);
                   $(this).find('.Amount1').val(data.Table2[i].Amount).number(true, 2);
               });
               CalSumExpense();
           }

           //Binding Data Total
           if (data.Table6[0].TotalIncome >0)
           {
               var SubTotal = data.Table7[0].SubTotalIncome;
               var TotalExpense = data.Table8[0].TotalExpense;
               var Profit = SubTotal - TotalExpense;

               $("#txtTotal").val(data.Table6[0].TotalIncome).number(true, 2), $("#txtSubTotal").val(data.Table7[0].SubTotalIncome).number(true, 2),
               $("#txtNoCompound").val(data.Table7[0].SubTotalIncome).number(true, 2), $("#txtExpense").val(data.Table8[0].TotalExpense).number(true, 2),
               $("#txtTotalExpense").val(data.Table8[0].TotalExpense).number(true, 2);
               if (Profit < 0) {
                   $("#txtProfit").number(true, 2).val(Profit).css('color', 'red');
               }
               else {
                   $("#txtProfit").number(true, 2).val(Profit).css('color', 'black');
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
                
                   //t.setHours = fHour;
                   //t.setMinutes = fMinute;

                   //var ManDate = new Date(data.Table9[i].ManDate);
                   //var day = ("0" + ManDate.getDate()).slice(-2);
                   //var month = ("0" + (ManDate.getMonth() + 1)).slice(-2);
                   //var today = ManDate.getFullYear() + "-" + (month) + "-" + (day);
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
                   //$(this).find('.ManDay').val(manDay);
                   $(this).find('.ManTime').val(data.Table9[i].ManTime);

                   //$(this).find('.WorkingFrom').timepicker('setTime', FTime, { 'timeFormat': 'H:i' });
                   $(this).find('.WorkingFrom').timepicker('setTime', setDate);

                   $(this).find('.WorkingTo').timepicker('setTime', setDate2);
                   //$(this).find('.WorkingTo').timepicker('setTime', TTime, { 'timeFormat': 'H:i' });
                   $(this).find('.TotalHours').val(data.Table9[i].TotalHours);
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
                   $(this).find('.Amount2').val(data.Table3[i].Amount).number(true, 2);
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
                   $(this).find('.Amount3').val(data.Table4[i].Amount).number(true, 2);
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
                   $(this).find('.Amount4').val(data.Table5[i].Amount).number(true, 2);
               });
           }

           
       },
       error: function (msg) {
           alert(msg);
       }
   });
    localStorage['flagAddRow'] = 1;
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
function Update(val) {
    alert("test");
    var JDate = ChangeformatDate($("#dtJobDate").val(),1);
    var SWorkingDate = ChangeformatDate($("#dtSWorking").val(),1);
    var EWorkingDate = ChangeformatDate($("#dtEWorking").val(), 1);

    var dataObject = {
        ID: val, JobDate: JDate, Car: $("#txtCar").val(), SWorking: SWorkingDate, EWorking: EWorkingDate,
        JobBy: $("#txtJobBy").val(), IssuedBy: $("#txtIssuedBy").val(), TypeWorking: $("#cmbTypeWorking").find(":selected").val(),
        JobStatus: $("#cmbJobStatus").find(":selected").val(), Detail: $("#txtDetail").val(), CustID: $("#hidCustID").val(),
        ContactID: $("#cmbContact").find(":selected").val(), CoWorkerID: $("#cmbCoWorker").find(":selected").val(),
        Remark: $("#txtRemark").val(), Discount: $("#txtDiscount").val(), Price: $('#txtSubTotal').val(), Cost: $('#txtExpense').val(), JobSite:$("#txtJobSite").val(), Location: $("#txtLocation").val(), EditBy: localStorage['UserID']
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
            alert("Success JobOrder"+JobID);
            $("#hidJobID").val(data)
        },
        error: function (msg) {
            alert(msg);
        }
    });
    alert("Test" + JobID);
    var dataObject = { JobID: JobID};
    $.ajax(
            {
                url: 'http://localhost:13131/api/JobOrderIncome',
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
    $(".RowCal").each(function () {
        dataObject.JobID = JobID;
        dataObject.IncomeType = $(this).find('.Select1').find(":selected").val();
        dataObject.UnitWeight = $(this).find(".UnitWeight").val();
        dataObject.Qty = $(this).find(".Quantity").val();
        dataObject.UnitPrice = $(this).find(".Price").val();
        dataObject.Amount = ConvertAmount($(this).find(".Amount").val());
        dataObject.EditBy = localStorage['UserID'];

        if (JobID != 0 && $(this).find(".UnitWeight").val() != '' && $(this).find(".Quantity").val() != '' && $(this).find(".Price").val() != '') {
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
    //===================UpdateJobOrderManpower

    alert("TestManpower");
    var dataObject = {};
    $(".RowCal5").each(function () {
        //alert($(this).find('.FName').val());
        //if ($(this).find('.FName').val() != '') {
        alert("test Row5");
            var workingFrom = $(this).find('.WorkingFrom').val();
            var workingTo = $(this).find('.WorkingTo').val();

            var mDate = ChangeformatDate($(this).find(".ManDate").val(), 1);

            dataObject.JobID = JobID;
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
            dataObject.EditBy = localStorage['UserID'];

            
            
        alert("test JobMan")
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
        //}
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
        $(this).find('.Price').val(price).number(true, 0);
        $(this).find('.Quantity').val(qty).number(true, 0);
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
        $(this).find('.Price').val(price).number(true, 0);
        $(this).find('.Quantity').val(qty).number(true, 0);
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
    if (localStorage['flagAddRow'] == 1) {
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
}
function AddRowExpense() {
    if (localStorage['flagAddRow'] == 0) {
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
}
var row_index = 0;
var col_index = 0;
//function SetRowCal5() {
//    $('.RowCal5 td').click(function () {
//        row_index = $(this).parent().index();
//        col_index = $(this).index();
//    });
//}
function SetRowIndex() {
    $('.RowCal5 td').click(function () {
        row_index = $(this).parent().index();
        col_index = $(this).index();
    });
}
function AddrowManpower() {
    alert("Addrow");
    var i = 0;
    $('.ManDate').each(function () {
        $(this).attr("id", 'date' + i).datepicker({
            dateFormat: 'dd/mm/yy'
        });
        i++;
    });

    //$('.RowCal5 td').click(function () {
    //    row_index = $(this).parent().index();
    //    col_index = $(this).index();
    //});

    ////$('.ManDate').removeClass('hasDatepicker').datepicker();

    //$('.WorkingFrom').timepicker();
    //$('.WorkingTo').timepicker();
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
function OpenRptJobOrder(val) {
    window.location.href = "../Reports/FormReport/RptReportViewer.aspx?id=" + val;
}
