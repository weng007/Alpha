
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
                var ManDate = new Date(data.Table1[i].ManDate);
                ManDate = $.datepicker.formatDate('mm/dd/yy', ManDate);

                    html += '<tr class="RowCal">';
                    html += '<td class="hidecolumn"><input type="hidden" class="hidID" value="' + data.Table1[i].WageTechnicianID + '" /></td>';
                    html += '<td class="hidecolumn"><input type="hidden" class="hidJobID" value="' + data.Table1[i].JobID + '" /></td>';
                    html += '<td class="hidecolumn"><input type="hidden" Class="hidTechnicianID" value="' + data.Table1[i].TechnicianID + '" /></td>';
                    html += '<td class="nopointer">' + data.Table1[i].RowNum + '</td>';
                    html += '<td class="nopointer"><input type="text" id="txtJobNo" name="field1" class="rowjobno" value="' + data.Table1[i].JobNo + '"/></td>';
                    html += '<td class="nopointer">' + data.Table1[i].CustomerName + '</td>';
                    html += '<td class="nopointer">' + '' + '</td>';
                    html += '<td class="nopointer">' + ManDate + '</td>';
                    html += '<td class="nopointer">' + data.Table1[i].ManDayName + '</td>';
                    html += '<td class="nopointer">' + data.Table1[i].WorkingFrom + '</td>';
                    html += '<td class="nopointer">' + data.Table1[i].WorkingTo + '</td>';
                    html += '<td class="nopointer">' + data.Table1[i].TotalHours + '</td>';
                    //html += '<td>' + data.Table1[i].NormalHours + '</td>';
                    //html += '<td class="hidecolumn"><input type="hidden" Class="hidNormalHours" value="' + data.Table1[i].NormalHours + '" /></td>';
                    html += '<td class="hidecolumn"><input type="hidden" Class="hidOverNormal" value="' + data.Table1[i].ManNormal + '" /></td>';
                    html += '<td class="hidecolumn"><input type="hidden" Class="hidOverSpecial" value="' + data.Table1[i].ManSpecial + '" /></td>';
                    html += '<td class="nopointer">' + data.Table1[i].ManNormal + '</td>';
                    html += '<td class="nopointer">' + data.Table1[i].ManPremium + '</td>';
                    html += '<td class="nopointer">' + data.Table1[i].ManSpecial + '</td>';
                    html += '<td class="nopointer"><input type="text" id="txtAdditionnal" name="field1" class="Additionnal text-size100" value="' + data.Table1[i].Additionnal + '"/></td>';
                    html += '<td class="nopointer"><input type="text" id="txtDeduction" name="field1" class="Deduction text-size100" value="' + data.Table1[i].Deduction + '"/></td>';
                    html += '<td class="nopointer">' + '' + '</td>';
                    html += '<td class="nopointer">' + '' + '</td>';
                    html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
        },
        error: function (msg) {
            alert(msg)
        }
    });
}
function ControlEnable(Isview) {
    if (Isview) {
        $(".RowCal").each(function () {
            $('.Additionnal').attr('disabled', 'disabled');
            $('.Deduction').attr('disabled', 'disabled');
            $('.Additionnal').attr('Style', 'background: rgb(235, 235, 228); border: none;');
            $('.Deduction').attr('Style', 'background: rgb(235, 235, 228); border: none;');
        });
    }
}
function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}
function CreateData() {

    var dataObject = {};
    $(".RowCal").each(function () {
        dataObject.ID = $(this).find(".hidID").val();
        dataObject.JobID = $(this).find(".hidJobID").val();
        dataObject.TechnicianID = $(this).find(".hidTechnicianID").val();
        dataObject.Additionnal = $(this).find('.Additionnal').val();
        dataObject.Deduction = $(this).find('.Deduction').val();
        dataObject.CreateBy = localStorage['UserID'];
        dataObject.EditBy = localStorage['UserID'];
        $.ajax(
        {
            url: 'http://localhost:13131/api/WageTechnician',
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
        
    });
    //alert('Create is completed')
    window.location.href = "../WageTeachnician/CreateWageTeachnician?id=" + $('.hidTechnicianID').val();
}
