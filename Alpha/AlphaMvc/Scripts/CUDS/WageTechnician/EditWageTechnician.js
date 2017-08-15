var SumNormalDay = 0;
var SumNormal1 = 0;
var SumPremium1_5 = 0;
var SumPremium2_0 = 0;
var SumPremium3_0 = 0;
var RateNormalDay = 0;
var RateNormal1 = 0;
var RatePremium1_5 = 0;
var RatePremium2_0 = 0;
var RatePremium3_0 = 0;
var AmountNormalDay = 0;
var AmountNormal1 = 0;
var AmountPremium1_5 = 0;
var AmountPremium2_0 = 0;
var AmountPremium3_0 = 0;
var row_index = 0;//RowCal4 Receipt
$(document).ready(function () {

    //$("#txtDetail").focus();

    
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
                $('#hidEmpGroup').val(data.Table1[i].EmpGroup);
                var MDate = ChangeformatDate(data.Table1[i].ManDate, 0);
                var ManDate = ChangeformatDate(data.Table1[i].ManDate, 1);
                var isBreak1 = data.Table1[i].Break1 == '1' ? 'Checked' : '';
                var isBreak2 = data.Table1[i].Break2 == '1' ? 'Checked' : '';
                var isBreak3 = data.Table1[i].Break3 == '1' ? 'Checked' : '';
                var Remark = data.Table1[i].Remark != null ? data.Table1[i].Remark : '';
                MDate = GetManDay(MDate);
                html += '<tr class="RowCal">';
                html += '<td class="hidecolumn"><input type="hidden" class="hidID" value="' + data.Table1[i].ID + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidJobID" value="' + data.Table1[i].ManpowerID + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" Class="hidTechnicianID" value="' + val + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidEmpGroup" value="' + data.Table1[i].EmpGroup + '" /></td>';
                html += '<td class="hidecolumn EmpGroup">' + data.Table1[i].EmpGroup + '</td>';
                html += '<td Class="nopointer">' + data.Table1[i].RowNum + '</td>';
                html += '<td Class="nopointer"><input type="text" id="txtJobNo" name="field1" class="field-divided text-size120 textleft txttransparent" value="' + data.Table1[i].JobNo + '"/></td>';
                html += '<td Class="nopointer"><input type="text" id="txtCustomerName" name="field1" class="field-divided text-size200 textleft txttransparent" value="' + data.Table1[i].CustomerName + '"/></td>';
                html += '<td Class="nopointer"><input type="text" id="txtJobSite" name="field1" class="field-divided text-size120 textleft txttransparent" value="' + data.Table1[i].JobSite + '"/></td>';
                html += '<td Class="nopointer">' + data.Table1[i].JMManDate + '</td>';
                html += '<td Class="nopointer">' + MDate + '</td>';
                html += '<td Class="nopointer">' + data.Table1[i].WorkingFrom + '</td>';
                html += '<td Class="nopointer">' + data.Table1[i].WorkingTo + '</td>';
                html += '<td Class="nopointer"><input id="isBreak1" type="checkbox" class="isBreak1" ' + isBreak1 + ' disabled></td>';
                html += '<td Class="nopointer"><input id="isBreak2" type="checkbox" class="isBreak2" ' + isBreak2 + ' disabled></td>';
                html += '<td Class="nopointer"><input id="isBreak3" type="checkbox" class="isBreak3" ' + isBreak3 + ' disabled></td>';
                html += '<td Class="nopointer">' + data.Table1[i].TotalHours + '</td>';
                html += '<td Class="nopointer">' + data.Table1[i].NormalDay + '</td>';
                html += '<td class="ManNormal nopointer">' + data.Table1[i].ManNormal + '</td>';
                html += '<td class="ManPremium nopointer">' + data.Table1[i].ManPremium + '</td>';
                html += '<td class="ManPremium2 nopointer">' + data.Table1[i].ManPremium2 + '</td>';
                html += '<td class="ManSpecial nopointer">' + data.Table1[i].ManSpecial + '</td>';
                if (data.Table1[i].EmpGroup == 'Alpha')
                {
                    html += '<td class="hidecolumn nopointer"><input type="text" id="txtAdditional" name="field1" onchange="SumAdditional()" class="Additional Number field-divided text-size80" value="' + AddComma(parseFloat(data.Table1[i].Additionnal).toFixed(2)) + '"/></td>';
                    html += '<td class="hidecolumn nopointer"><input type="text" id="txtDeduction" name="field1" onchange="SumAdditional()" class="Deduction Number field-divided text-size80" value="' + AddComma(parseFloat(data.Table1[i].Deduction).toFixed(2)) + '"/></td>';
                }
                else
                {
                    html += '<td Class="nopointer"><input type="text" id="txtAdditional" name="field1" onchange="SumAdditional()" class="Additional Number field-divided text-size80" value="' + AddComma(parseFloat(data.Table1[i].Additionnal).toFixed(2)) + '"/></td>';
                    html += '<td Class="nopointer"><input type="text" id="txtDeduction" name="field1" onchange="SumAdditional()" class="Deduction Number field-divided text-size80" value="' + AddComma(parseFloat(data.Table1[i].Deduction).toFixed(2)) + '"/></td>';
                }
                
                html += '<td Class="nopointer"><input type="text" id="txtRemark" name="field1" onchange="SumAdditional()" class="Remark field-divided text-size250" value="' + Remark + '"/></td>';
                html += '<td Class="nopointer">' + data.Table1[i].Location + '</td>';
                //html += '<td>' + '' + '</td>';
                html += '</tr>';
            }
            for (var i = 0; i < data.Table2.length; i++) {
                SumNormalDay = data.Table2[i].SumNormalDay;
                SumNormal1 = data.Table2[i].SumNormal1;
                SumPremium1_5 = data.Table2[i].SumPremium1_5;
                SumPremium2_0 = data.Table2[i].SumPremium2_0;
                SumPremium3_0 = data.Table2[i].SumPremium3_0;
                RateNormalDay = data.Table2[i].RateNormalDay;
                RateNormal1 = data.Table2[i].RateNormal1;
                RatePremium1_5 = data.Table2[i].RatePremium1_5;
                RatePremium2_0 = data.Table2[i].RatePremium2_0;
                RatePremium3_0 = data.Table2[i].RatePremium3_0;
                AmountNormalDay = data.Table2[i].AmountNormalDay;
                AmountNormal1 = data.Table2[i].AmountNormal1;
                AmountPremium1_5 = data.Table2[i].AmountPremium1_5;
                AmountPremium2_0 = data.Table2[i].AmountPremium2_0;
                AmountPremium3_0 = data.Table2[i].AmountPremium3_0;
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            GetTotal();
            SumAdditional();
            if($('#hidEmpGroup').val() == 'Alpha')
            {
                $('#thAdditionnal').css('display', 'none');
                $('#thDeduction').css('display', 'none');
                $('#tr1').css('display', 'none');
                $('.td2').css('display', 'none');
                $('#tr3').css('display', 'none');
                $('#tr4').css('display', 'none');
                $('.td4').css('display', 'none');
                $('#tr5').css('display', 'none');
            }
        },
        error: function (msg) {
            alert(msg)
        }
    });
}
function GetTotal() {

        document.getElementById("totalNormalDay").innerHTML = AddComma(parseFloat(SumNormalDay).toFixed(2));
        document.getElementById("totalNormal").innerHTML = AddComma(parseFloat(SumNormal1).toFixed(2));
        document.getElementById("totalPremium").innerHTML = AddComma(parseFloat(SumPremium1_5).toFixed(2));
        document.getElementById("totalPremium2").innerHTML = AddComma(parseFloat(SumPremium2_0).toFixed(2));
        document.getElementById("totalSpecial").innerHTML = AddComma(parseFloat(SumPremium3_0).toFixed(2));

    //===================================================================
        document.getElementById("totalBathNormalDay").innerHTML = AddComma(parseFloat(RateNormalDay).toFixed(2));
        document.getElementById("totalBathNormal").innerHTML = AddComma(parseFloat(RateNormal1).toFixed(2));
        document.getElementById("totalBathPremium").innerHTML = AddComma(parseFloat(RatePremium1_5).toFixed(2));
        document.getElementById("totalBathPremium2").innerHTML = AddComma(parseFloat(RatePremium2_0).toFixed(2));
        document.getElementById("totalBathSpecial").innerHTML = AddComma(parseFloat(RatePremium3_0).toFixed(2));

    //===================================================================
        document.getElementById("totalAmountNormalDay").innerHTML = AddComma(parseFloat(AmountNormalDay).toFixed(2));
        document.getElementById("totalAmountNormal").innerHTML = AddComma(parseFloat(AmountNormal1).toFixed(2));
        document.getElementById("totalAmountPremium").innerHTML = AddComma(parseFloat(AmountPremium1_5).toFixed(2));
        document.getElementById("totalAmountPremium2").innerHTML = AddComma(parseFloat(AmountPremium2_0).toFixed(2));
        document.getElementById("totalAmountSpecial").innerHTML = AddComma(parseFloat(AmountPremium3_0).toFixed(2));

    //===================================================================
}
function SumAdditional()
{
    var totalAdditional = 0;
    var totalDeduction = 0;
    var totalAmount = 0;
    var totalVat = 0;
    var totalWH = 0;
    var emGroup = $('.hidEmpGroup').val();
    var i = 0;

    $(".RowCal").each(function () {
        i++;
        if (i != 1) {
            var Additional = $(this).find(".Additional").val().replace(',', '');
            var Deduction = $(this).find(".Deduction").val().replace(',', '');
            totalAdditional += parseFloat(Additional);
            totalDeduction += parseFloat(Deduction);
        }
    });

    document.getElementById("totalAdditional").innerHTML = AddComma(parseFloat(totalAdditional).toFixed(2));
    document.getElementById("totalDeduction").innerHTML = AddComma(parseFloat(totalDeduction).toFixed(2));

    totalAmount = ((parseFloat(AmountNormalDay) + parseFloat(AmountNormal1) + parseFloat(AmountPremium1_5) + parseFloat(AmountPremium2_0) + parseFloat(AmountPremium3_0)) + parseFloat(totalAdditional)) - totalDeduction;

    if (emGroup == 'Alpha') {
        totalVat = 0;
    }
    else {
        totalVat = (totalAmount * 3) / 100
    }

    totalWH = parseFloat(totalAmount) - parseFloat(totalVat)
    //alert(row_index);
    //$('.Additional').eq(row_index).val($('.Additional').eq(row_index).val()).formatNumber({ format: "#,###.00", locale: "us" });
    document.getElementById("totalAmount").innerHTML = AddComma(parseFloat(totalAmount).toFixed(2));
    document.getElementById("totalVat").innerHTML = AddComma(parseFloat(totalVat).toFixed(2));
    document.getElementById("totalWH").innerHTML = AddComma(parseFloat(totalWH).toFixed(2));
}
function convertFloat(str) {
    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
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
        dataObject.Additionnal = $(this).find('.Additional').val().replace(',', '');
        dataObject.Deduction = $(this).find('.Deduction').val().replace(',', '');
        dataObject.Remark = $(this).find('.Remark').val().replace(',', '');
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
        window.open("../Reports/FormReport/RptWageTechnicianViewer.aspx?id=" + val + '|' + FromDate + '|' + ToDate,'_blank');
    }
    else
    {
        window.open("../Reports/FormReport/RptWageTechnicianViewer2.aspx?id=" + val + '|' + FromDate + '|' + ToDate, '_blank');
    }
}
function Redirect() {
    window.location.href = "../WageTeachnician/IndexWageTeachnician";
}
