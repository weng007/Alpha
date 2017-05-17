
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
    var dataObject = { TechnicianID: '1' };
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
            //alert(data.Table.length);

            $('#txtFullName').val(data.Table[0].FullName);
            var html = '<tbody>';
            for (var i = 0; i < data.Table1.length; i++) {
                html += '<tr class="RowCal">';
                html += '<td class="hidecolumn"><input type="hidden" class="hidID" value="' + data.Table1[i].WageTechnicianID + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidJobID" value="' + data.Table1[i].JobID + '" /></td>';
                html += '<td class="hidecolumn"><input type="hidden" Class="hidTechnicianID" value="' + val + '" /></td>';
                html += '<td>' + data.Table1[i].RowNum + '</td>';
                html += '<td>' + data.Table1[i].JobNo + '</td>';
                html += '<td>' + data.Table1[i].CustomerName + '</td>';
                html += '<td>' + '' + '</td>';
                html += '<td>' + data.Table1[i].ManDate + '</td>';
                html += '<td>' + data.Table1[i].ManDayName + '</td>';
                html += '<td>' + data.Table1[i].WorkingFrom + '</td>';
                html += '<td>' + data.Table1[i].WorkingTo + '</td>';
                html += '<td>' + data.Table1[i].TotalHours + '</td>';
                html += '<td>' + '' + '</td>';
                html += '<td>' + data.Table1[i].ManNormal + '</td>';
                html += '<td>' + data.Table1[i].ManPremium + '</td>';
                html += '<td>' + data.Table1[i].ManSpecial + '</td>';
                alert(data.Table1[i].Additionnal);
                html += '<td><input type="text" id="txtAdditionnal" name="field1" class="Additionnal field-divided" value="' + data.Table1[i].Additionnal + '"/></td>';
                html += '<td><input type="text" id="txtDeduction" name="field1" class="Deduction field-divided" value="' + data.Table1[i].Deduction + '"/></td>';
                html += '<td>' + '' + '</td>';
                html += '<td>' + '' + '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
        },
        error: function (msg) {
            alert(msg)
        }
    });
}
function Update(val) {

    var dataObject = {};
    $(".RowCal").each(function () {
        alert('test');
        dataObject.ID = $(this).find(".hidID").val();
        dataObject.JobID = $(this).find(".hidJobID").val();
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