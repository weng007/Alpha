
//function GetChecked(isCheck)
//{
//    var ShowAll = isCheck.checked;
//    GetData(ShowAll);
//}
function GetData(val)
{
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

    alert(val);
    var dataObject = { id: val };
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

            $('#txtFullName').val(data.Table[0].FullName);
            var html = '<tbody>';
            for (var i = 0; i < data.Table1.length; i++) {
                var MDate = ChangeformatDate(data.Table1[i].ManDate, 0);
                var ManDate = ChangeformatDate(data.Table1[i].ManDate, 1);
                MDate = GetManDay(MDate);
                html += '<tr class="RowCal">';
                html += '<td class="hidecolumn"><input type="hidden" class="hidID" value="' + data.Table1[i].ID + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidJobID" value="' + data.Table1[i].ManpowerID + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" Class="hidTechnicianID" value="' + val + '" /></td>';
                html += '<td>' + data.Table1[i].RowNum + '</td>';
                html += '<td>' + data.Table1[i].JobNo + '</td>';
                html += '<td>' + data.Table1[i].CustomerName + '</td>';
                html += '<td>' + data.Table1[i].JobSite + '</td>';
                html += '<td>' + data.Table1[i].JMManDate + '</td>';
                html += '<td>' + MDate + '</td>';
                html += '<td>' + data.Table1[i].WorkingFrom + '</td>';
                html += '<td>' + data.Table1[i].WorkingTo + '</td>';
                html += '<td>' + data.Table1[i].TotalHours + '</td>';
                html += '<td class="ManNormal">' + data.Table1[i].ManNormal + '</td>';
                html += '<td class="ManPremium">' + data.Table1[i].ManPremium + '</td>';
                html += '<td class="ManPremium2">' + data.Table1[i].ManPremium2 + '</td>';
                html += '<td class="ManSpecial">' + data.Table1[i].ManSpecial + '</td>';
                html += '<td><input type="text" id="txtAdditionnal" name="field1" class="Additionnal field-divided" value="' + data.Table1[i].Additionnal + '"/></td>';
                html += '<td><input type="text" id="txtDeduction" name="field1" class="Deduction field-divided" value="' + data.Table1[i].Deduction + '"/></td>';
                html += '<td>' + '' + '</td>';
                html += '<td>' + '' + '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            GetTotal();
        },
        error: function (msg) {
            alert(msg)
        }
    });
}
function GetTotal() {
    var totalManNormal = 0;
    var totalManPremium = 0;
    var totalManPremium2 = 0;
    var totalManSpecial = 0;

    var totalBathNormal = 0;
    var totalBathPremium = 0;
    var totalBathPremium2 = 0;
    var totalBathSpecial = 0;

    var totalAmountNormal = 0;
    var totalAmountPremium = 0;
    var totalAmountPremium2 = 0;
    var totalAmountSpecial = 0;

    var totalAmount = 0;
    var totalVat = 0;

    var totalWH = 0;

        for (var i = 0; i < $(".RowCal").length; i++) {
            //alert(parseFloat($('.ManNormal:eq(' + i + ')').html() != '' && $('.ManNormal:eq(' + i + ')').html() != null ? $('.ManNormal:eq(' + i + ')').html() : 0));
            totalManNormal = totalManNormal + parseFloat(parseFloat($('.ManNormal:eq(' + i + ')').html() != '' && $('.ManNormal:eq(' + i + ')').html() != null ? $('.ManNormal:eq(' + i + ')').html() : 0));

            totalManPremium = totalManPremium + parseFloat(parseFloat($('.ManPremium:eq(' + i + ')').html() != '' && $('.ManPremium:eq(' + i + ')').html() != null ? $('.ManPremium:eq(' + i + ')').html() : 0));

            totalManPremium2 = totalManPremium2 + parseFloat(parseFloat($('.ManPremium2:eq(' + i + ')').html() != '' && $('.ManPremium2:eq(' + i + ')').html() != null ? $('.ManPremium2:eq(' + i + ')').html() : 0));

            totalManSpecial = totalManSpecial + parseFloat(parseFloat($('.ManSpecial:eq(' + i + ')').html() != '' && $('.ManSpecial:eq(' + i + ')').html() != null ? $('.ManSpecial:eq(' + i + ')').html() : 0));
        }

        var html = '<td>' + totalManNormal + '</td>';
        document.getElementById("totalNormal").innerHTML = html;

        var html = '<td>' + totalManPremium + '</td>';
        document.getElementById("totalPremium").innerHTML = html;

        var html = '<td>' + totalManPremium2 + '</td>';
        document.getElementById("totalPremium2").innerHTML = html;

        var html = '<td>' + totalManSpecial + '</td>';
        document.getElementById("totalSpecial").innerHTML = html;

        
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
        alert('test');
        alert("hidJobID "+$(this).find(".hidJobID").val());
        dataObject.ID = $(this).find(".hidID").val();
        dataObject.ManpowerID = $(this).find(".hidJobID").val();
        dataObject.TechnicianID = $(this).find(".hidTechnicianID").val();
        dataObject.Additionnal = $(this).find('.Additionnal').val();
        dataObject.Deduction = $(this).find('.Deduction').val();
        dataObject.EditBy = localStorage['UserID'];
        alert('test2');
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
    alert('Update is completed')
    window.location.href = "../WageTeachnician/EditWageTeachnician?id=" + $('.hidTechnicianID').val();
}