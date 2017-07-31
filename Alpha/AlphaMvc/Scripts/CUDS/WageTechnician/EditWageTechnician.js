
//function GetChecked(isCheck)
//{
//    var ShowAll = isCheck.checked;
//    GetData(ShowAll);
//}
$(document).ready(function () {
    
    $("#dtDateFrom").datepicker({
        inline: true,
        showOtherMonths: true,
        dateFormat: "dd/mm/yy"
    })
    $("#dtDateTo").datepicker({
        inline: true,
        showOtherMonths: true,
        dateFormat: "dd/mm/yy"
    })
     .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');
});
function GetData(val)
{
    //alert(val);
    //------------------------- Sorting ------------------------
    $('th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })
    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
        }
    }
    function getCellValue(row, index) { return $(row).children('td').eq(index).html() }
    //------------------------- Sorting ------------------------

    //var ChangeformatDate($("#dtDateFrom").val(),1)
    var fromdate = $("#dtDateFrom").val();
    var TodayFromDate = new Date();
    var Fromyear = TodayFromDate.getFullYear();
    var Frommonth = TodayFromDate.getMonth();
    var Fromday = TodayFromDate.getDate();
    TodayFromDate.setYear = Fromyear;
    TodayFromDate.setMonth = Frommonth;
    TodayFromDate.setDate = Fromday;
    var mDate = (Fromyear - 2) + '/' + (Frommonth+1) + '/' + Fromday;
    var Fdate = fromdate != null && fromdate != '' ? ChangeformatDate(fromdate, 1) : mDate;
    $("#hidFromDate").val(Fdate);
    //alert("test");
    var DateTo = $("#dtDateTo").val();
    var TodayToDate = new Date();
    var ToYear = TodayToDate.getFullYear();
    var ToMonth = TodayToDate.getMonth();
    var ToDay = TodayToDate.getDate();
    TodayToDate.setYear = ToYear;
    TodayToDate.setMonth = ToMonth;
    TodayToDate.setDate = ToDay;
    var ToDate = (ToYear + 1) + '/' + (ToMonth + 1) + '/' + ToDay;
    var Tdate = DateTo != null && DateTo != '' ? ChangeformatDate(DateTo, 1) : ToDate;
    $("#hidToDate").val(Tdate);
    //alert("test2");
    //alert(Fdate);
    //alert(Tdate);
    //alert(val);
    var dataObject = { Datesearh: val+'|'+Fdate+'|'+Tdate };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/WageTechnician',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            //alert(data.Table[0].FullName);

            $('#txtFullName').val(data.Table[0].FullName);
            var html = '<tbody>';
            for (var i = 0; i < data.Table1.length; i++) {
                var MDate = ChangeformatDate(data.Table1[i].ManDate, 0);
                var ManDate = ChangeformatDate(data.Table1[i].ManDate, 1);
                var isBreak1 = data.Table1[i].Break1 == '1' ? 'Checked' : '';
                var isBreak2 = data.Table1[i].Break2 == '1' ? 'Checked' : '';
                MDate = GetManDay(MDate);
                html += '<tr class="RowCal">';
                html += '<td class="hidecolumn"><input type="hidden" class="hidID" value="' + data.Table1[i].ID + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidJobID" value="' + data.Table1[i].ManpowerID + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" Class="hidTechnicianID" value="' + val + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidEmpGroup" value="' + data.Table1[i].EmpGroup + '" /></td>';
                html += '<td class="hidecolumn EmpGroup">' + data.Table1[i].EmpGroup + '</td>';
                html += '<td>' + data.Table1[i].RowNum + '</td>';
                html += '<td>' + data.Table1[i].JobNo + '</td>';
                html += '<td>' + data.Table1[i].CustomerName + '</td>';
                html += '<td>' + data.Table1[i].JobSite + '</td>';
                html += '<td>' + data.Table1[i].JMManDate + '</td>';
                html += '<td>' + MDate + '</td>';
                html += '<td>' + data.Table1[i].WorkingFrom + '</td>';
                html += '<td>' + data.Table1[i].WorkingTo + '</td>';
                html += '<td><input id="isBreak1" type="checkbox" class="isBreak1" ' + isBreak1 + ' disabled></td>';
                html += '<td><input id="isBreak2" type="checkbox" class="isBreak2" ' + isBreak2 + ' disabled></td>';
                html += '<td>' + data.Table1[i].TotalHours + '</td>';
                html += '<td>' + data.Table1[i].NormalDay + '</td>';
                html += '<td class="ManNormal">' + data.Table1[i].ManNormal + '</td>';
                html += '<td class="ManPremium">' + data.Table1[i].ManPremium + '</td>';
                html += '<td class="ManPremium2">' + data.Table1[i].ManPremium2 + '</td>';
                html += '<td class="ManSpecial">' + data.Table1[i].ManSpecial + '</td>';
                html += '<td><input type="text" id="txtAdditional" name="field1"  onchange="SumAdditional();" class="Additional Number field-divided text-size80" value="' + AddComma(parseFloat(data.Table1[i].Additionnal).toFixed(2)) + '"/></td>';
                html += '<td><input type="text" id="txtDeduction" name="field1" onchange="SumAdditional();" class="Deduction Number field-divided text-size80" value="' + AddComma(parseFloat(data.Table1[i].Deduction).toFixed(2)) + '"/></td>';
                html += '<td>' + '' + '</td>';
                html += '<td>' + '' + '</td>';
                html += '</tr>';
            }
            for (var i = 0; i < data.Table2.length; i++) {
                html += '<td class="hidecolumn"><input type="hidden" class="hidSumNormalDay" value="' + data.Table2[i].SumNormalDay + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidSumNormal1" value="' + data.Table2[i].SumNormal1 + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidSumPremium1_5" value="' + data.Table2[i].SumPremium1_5 + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidSumPremium2_0" value="' + data.Table2[i].SumPremium2_0 + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidSumPremium3_0" value="' + data.Table2[i].SumPremium3_0 + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidRateNormalDay" value="' + data.Table2[i].RateNormalDay + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidRateNormal1" value="' + data.Table2[i].RateNormal1 + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidRatePremium1_5" value="' + data.Table2[i].RatePremium1_5 + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidRatePremium2_0" value="' + data.Table2[i].RatePremium2_0 + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidRatePremium3_0" value="' + data.Table2[i].RatePremium3_0 + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidAmountNormalDay" value="' + data.Table2[i].AmountNormalDay + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidAmountNormal1" value="' + data.Table2[i].AmountNormal1 + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidAmountPremium1_5" value="' + data.Table2[i].AmountPremium1_5 + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidAmountPremium2_0" value="' + data.Table2[i].AmountPremium2_0 + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidAmountPremium3_0" value="' + data.Table2[i].AmountPremium3_0 + '" /></td>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            GetTotal();
            alert("Test");
            SumAdditional();
        },
        error: function (msg) {
            alert(msg)
        }
    });
}
function GetTotal() {
    var hidSumNormalDay = $('.hidSumNormalDay').val();
    var hidSumNormal1 = $('.hidSumNormal1').val();
    var hidSumPremium1_5 = $('.hidSumPremium1_5').val();
    var hidSumPremium2_0 = $('.hidSumPremium2_0').val();
    var hidSumPremium3_0 = $('.hidSumPremium3_0').val();

    var hidRateNormalDay = $('.hidRateNormalDay').val();
    var hidRateNormal1 = $('.hidRateNormalDay').val();
    var hidRatePremium1_5 = $('.hidRatePremium1_5').val();
    var hidRatePremium2_0 = $('.hidRatePremium2_0').val();
    var hidRatePremium3_0 = $('.hidRatePremium3_0').val();

    var hidAmountNormalDay = $('.hidAmountNormalDay').val();
    var hidAmountNormal1 = $('.hidAmountNormal1').val();
    var hidAmountPremium1_5 = $('.hidAmountPremium1_5').val();
    var hidAmountPremium2_0 = $('.hidAmountPremium2_0').val();
    var hidAmountPremium3_0 = $('.hidAmountPremium3_0').val();

    var totalAmount = 0;
    var totalVat = 0;

    var totalWH = 0;
    var emGroup = $('.hidEmpGroup').val();

    var html = '<td>' + AddComma(parseFloat(hidSumNormalDay).toFixed(2)) + '</td>';
        document.getElementById("totalNormalDay").innerHTML = html;
        
        var html = '<td>' + AddComma(parseFloat(hidSumNormal1).toFixed(2)) + '</td>';
        document.getElementById("totalNormal").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(hidSumPremium1_5).toFixed(2)) + '</td>';
        document.getElementById("totalPremium").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(hidSumPremium2_0).toFixed(2)) + '</td>';
        document.getElementById("totalPremium2").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(hidSumPremium3_0).toFixed(2)) + '</td>';
        document.getElementById("totalSpecial").innerHTML = html;

    //===================================================================
        var html = '<td>' + AddComma(parseFloat(hidRateNormalDay).toFixed(2)) + '</td>';
        document.getElementById("totalBathNormalDay").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(hidRateNormal1).toFixed(2)) + '</td>';
        document.getElementById("totalBathNormal").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(hidRatePremium1_5).toFixed(2)) + '</td>';
        document.getElementById("totalBathPremium").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(hidRatePremium2_0).toFixed(2)) + '</td>';
        document.getElementById("totalBathPremium2").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(hidRatePremium3_0).toFixed(2)) + '</td>';
        document.getElementById("totalBathSpecial").innerHTML = html;

    //===================================================================
        
        var html = '<td>' + AddComma(parseFloat(hidAmountNormalDay).toFixed(2)) + '</td>';
        document.getElementById("totalAmountNormalDay").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(hidAmountNormal1).toFixed(2)) + '</td>';
        document.getElementById("totalAmountNormal").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(hidAmountPremium1_5).toFixed(2)) + '</td>';
        document.getElementById("totalAmountPremium").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(hidAmountPremium2_0).toFixed(2)) + '</td>';
        document.getElementById("totalAmountPremium2").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(hidAmountPremium3_0).toFixed(2)) + '</td>';
        document.getElementById("totalAmountSpecial").innerHTML = html;

    //===================================================================
        totalAmount = parseFloat(hidAmountNormalDay) + parseFloat(hidAmountNormal1) + parseFloat(hidAmountPremium1_5) + parseFloat(hidAmountPremium2_0) + parseFloat(hidAmountPremium3_0)
        
        if (emGroup == 'Alpha')
        {
            totalVat = 0;
        }
        else
        {
            totalVat = (totalAmount * 3) / 100
        }
        
        totalWH = parseFloat(totalAmount) - parseFloat(totalVat)

        var html = '<td>' + AddComma(parseFloat(totalAmount).toFixed(2)) + '</td>';
        document.getElementById("totalAmount").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(totalVat).toFixed(2)) + '</td>';
        document.getElementById("totalVat").innerHTML = html;

        var html = '<td>' + AddComma(parseFloat(totalWH).toFixed(2)) + '</td>';
        document.getElementById("totalWH").innerHTML = html;
}
function SumAdditional()
{
    alert("SumAdditional");
    var totalAdditionnal = 0;
    var totalDeduction = 0;

    for (var i = 0; i < $(".RowCal").length; i++) {
        alert(i);
        var Additional = $('.Additional').eq(i).val().replace(',', '') != '' && $('.Additional').eq(i).val() != null ? $('.Additional').eq(i).val().replace(',', '') : 0;
        alert(parseFloat(totalAdditionnal));
        totalAdditionnal = parseFloat(totalAdditionnal) + parseFloat(Additional);
        

        //totalDeduction = totalDeduction + parseFloat(parseFloat($('.Deduction.eq(' + i + ')').html() != '' && $('.Deduction.eq(' + i + ')').html() != null ? $('.Deduction.eq(' + i + ')').html() : 0));
    }
    alert(totalAdditionnal);
    var html = '<td>' + AddComma(parseFloat(totalAdditionnal).toFixed(2)) + '</td>';
    document.getElementById("totalAdditionnal").innerHTML = html;

    var html = '<td>' + AddComma(parseFloat(totalDeduction).toFixed(2)) + '</td>';
    document.getElementById("totalDeduction").innerHTML = html;
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
function Update(val) {

    var dataObject = {};
    $(".RowCal").each(function () {
        //alert('test');
        //alert("hidJobID "+$(this).find(".hidJobID").val());
        dataObject.ID = $(this).find(".hidID").val();
        dataObject.ManpowerID = $(this).find(".hidJobID").val();
        dataObject.TechnicianID = $(this).find(".hidTechnicianID").val();
        dataObject.Additionnal = $(this).find('.Additionnal').val().replace(',', '');
        dataObject.Deduction = $(this).find('.Deduction').val().replace(',', '');
        dataObject.EditBy = localStorage['UserID'];
        //alert('test2');
        $.ajax(
        {
            url: 'http://localhost:13131/api/WageTechnician',
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

    });
    //alert('Update is completed')
    window.location.href = "../WageTeachnician/EditWageTeachnician?id=" + $('.hidTechnicianID').val();
}
function OpenRptWageTechnician(val) {
    //alert("test");
    var FromDate = $('#hidFromDate').val();
    var ToDate = $('#hidToDate').val();
    var EmpGroup = $('.hidEmpGroup').val();
    //alert("Emp" + EmpGroup);
    //var FromDate = FromDate.replace("/", "-");
    //alert(FromDate);
    //alert(ToDate);
    if (EmpGroup == 'Alpha')
    {
        window.location.href = "../Reports/FormReport/RptWageTechnicianViewer.aspx?id=" + val + '|' + FromDate + '|' + ToDate;
    }
    else
    {
        window.location.href = "../Reports/FormReport/RptWageTechnicianViewer2.aspx?id=" + val + '|' + FromDate + '|' + ToDate;
    }
}
