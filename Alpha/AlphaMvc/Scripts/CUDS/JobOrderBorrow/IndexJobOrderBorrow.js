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
    $("#hidBorroeeJobID").val(val);
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
                html += '<td class="nopointer">' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td class="nopointer">' + data.Table[i].SerialNo + '</td>';
                html += '<td class="nopointer">' + data.Table[i].Remark + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].Brand + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].Model + '</td>';
                html += '<td class="nopointer">' + data.Table[i].Size + '</td>';
                html += '<td class="nopointer">' + data.Table[i].Amount + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].ReturnGood + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].ReturnLost + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].ReturnRepair + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].ReturnBad + '</td>';
                html += '<td class="nopointer">';
                html += '<a href="/Borrow/EditBorrow?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png"/></a>';
                html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'JobOrderBorrow'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png"/></a>';
                html += '</td>';
                html += '</tr>';
            }
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            $('#tblJobborrow').paging({
                limit: 30,
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
function RowDelete(id) {
    var JobID = $("#hidBorroeeJobID").val();
    var dataObject = { ID: id };
    $.ajax(
        {
            url: 'http://localhost:13131/api/JobOrderBorrow',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                alert(JobID);
                window.location.href = "../JobOrder/EditJobOrder?id=" + JobID;
            }
            ,
            error: function (msg) {
                alert(msg)
            }

        });
}