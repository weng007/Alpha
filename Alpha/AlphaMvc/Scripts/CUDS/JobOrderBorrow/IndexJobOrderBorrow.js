function GetJobOrderBorrow(val)
{
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
    var dataObject = { ID: val }
    $.ajax(
    {
        url: 'http://localhost:13131/api/JobOrderBorrowRefID',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr>';
                html += '<td>' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td>' + data.Table[i].Serial + '</td>';
                html += '<td>' + data.Table[i].Remark + '</td>';
                html += '<td class="hideANDseek">' + data.Table[i].Brand + '</td>';
                html += '<td class="hideANDseek">' + data.Table[i].Model + '</td>';
                html += '<td>' + data.Table[i].Size + '</td>';
                html += '<td>' + data.Table[i].Amount + '</td>';
                html += '<td>' + data.Table[i].ReturnGood + '</td>';
                html += '<td>' + data.Table[i].ReturnLost + '</td>';
                html += '<td>' + data.Table[i].ReturnRepair + '</td>';
                html += '<td>' + data.Table[i].ReturnBad + '</td>';
                html += '<td>';
                html += '<a href="/Borrow/EditBorrow?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/edit.png"/></a>';
                html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'JobOrderBorrow'" + ',' + data.Table[i].ID + ')" >' + '<img src="/Images/delete.png"/></a>';
                html += '</td>';
                html += '</tr>';
            }
            document.getElementById("result").innerHTML = html;
        },
        error: function (msg) {
            alert(msg)
        }
    });
}
function RowDelete(id) {
    var dataObject = { ID: id };
    $.ajax(
        {
            url: 'http://localhost:13131/api/IncomeMaster',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                alert('Delete is completed');
            }
            ,
            error: function (msg) {
                alert(msg)
            }

        });
}