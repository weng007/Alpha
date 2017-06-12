$(document).ready(function () {
    //$('.imgadd').attr("style", "margin-left: 69%; margin-top: -2px;");
    
    //$('.topicattach-2').attr("style", "color: #FFFFFF; font-size: 14px; font-weight: bold; float: right; padding-top: 5px; padding-bottom: 5px; padding-right: 5px; margin-left: 0%;  margin-right: 0%;");
    //------------------------------------ Standard ------------------------------------
    //Sorting
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

    //filter
    $("#searchInput").keyup(function () {
        $("#result").find("tr").hide();
        var data = this.value.split(" ");
        var jo = $("#result").find("tr");
        $.each(data, function (i, v) {
            jo = jo.filter("*:contains('" + v + "')");
        });
        jo.show();

    }).focus(function () {
        $(this).css({ "color": "black" });
        $(this).unbind('focus');
    }).css({ "color": "#C0C0C0" });

    //------------------------------------ Custom ------------------------------------
});
function GetCalendarlist(val) {
    var dataObject = { CalendarMonth: val };
    //alert(val);
    $.ajax(
    {
        url: 'http://localhost:8082/api/CalendarManPower',
        type: 'GET',
        data: dataObject,
        async: false,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '';
            //alert(data.Table.length);
            for (var i = 0; i < data.Table.length; i++) {
                //$(".rowdisable").each(function () {
                var JobDate = ChangeformatDate(data.Table[i].JobDate, 0);
                var SWorking = ChangeformatDate(data.Table[i].SWorking, 0);
                var EWorking = ChangeformatDate(data.Table[i].EWorking, 0);
                html += '<tr>';
                html += '<td class="nopointer">' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn nopointer">' + data.Table[i].ID + '</td>';
                html += '<td class="nopointer">' + data.Table[i].TechFullName + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].PositionNameTH + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].EmpGroup + '</td>';
                html += '<td class="nopointer">' + data.Table[i].JobNo + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].TypeWorkingName + '</td>';
                html += '<td class="hideANDseek nopointer">' + JobDate + '</td>';
                html += '<td class="nopointer">' + SWorking + '</td>';
                html += '<td class="nopointer">' + EWorking + '</td>';
                html += '<td class="nopointer">';
                html += '<a href="/JobOrder/EditJobOrder?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgCarlendarUpdate"/></a>';
                html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'IncomeMaster'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px; Display:none;" >' + '<img src="/Images/delete.png" class="imgCarlendarDelete"/></a>';
                html += '<a href="/JobOrder/EditJobOrder?id=' + data.Table[i].ID + '&IsView=' + true + '" id="read' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="carlendarviewDisable" /></a>';
                html += '</td>';
                html += '</tr>';
                //});
            }
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            $('#tblcalenCMP').paging({
                limit: 16,
                rowDisplayStyle: 'block',
                activePage: 0,
                rows: []
            });
        },
        error: function (msg) {
            alert(msg)
        }
    });
}