$(document).ready(function () {
    //------------------------------------ Standard ------------------------------------
    //Sorting
    $('#tableData').paging({ limit: 5 });
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
        this.value = "";
        $(this).css({ "color": "black" });
        $(this).unbind('focus');
    }).css({ "color": "#C0C0C0" });

    //------------------------------------ Custom ------------------------------------

    $.ajax(
    {
        url: 'http://localhost:13131/api/ExpenseMaster/',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr>';
                html += '<td>' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td>' + data.Table[i].Detail + '</td>';
                html += '<td>';
                html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/edit.png"/></a>';
                html += '<a href="#" id="del' + data.Table[i].ID + '" onclick = " RowDelete(' + data.Table[i].ID + ') " >' + '<img src="/Images/delete.png"/></a>';
                html += '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
        },
        error: function (msg) {
            alert(msg)
        }
    });
});

function RowDelete(id) {
    var dataObject = { ID: id };
    $.ajax(
        {
            url: 'http://localhost:13131/api/ExpenseMaster/Delete',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                alert('Delete is completed')
                window.location.href = "../ExpenseMaster/IndexExpenseMaster";
            }
            ,
            error: function (msg) {
                alert(msg)
            }


        }); alert(id);
}