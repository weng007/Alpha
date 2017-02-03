$(document).ready(function () {

    //------------------------- Paging -------------------------

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
    //-------------------------filter------------------------
    $("#searchInput").keyup(function () {
        //hide all the rows
        $("#result").find("tr").hide();

        //split the current value of searchInput
        var data = this.value.split(" ");
        //create a jquery object of the rows
        var jo = $("#result").find("tr");

        //Recusively filter the jquery object to get results.
        $.each(data, function (i, v) {
            jo = jo.filter("*:contains('" + v + "')");
        });
        //show the rows that match.
        jo.show();
        //Removes the placeholder text

    }).focus(function () {
        this.value = "";
        $(this).css({ "color": "black" });
        $(this).unbind('focus');
    }).css({ "color": "#C0C0C0" });
    //-------------------------filter------------------------

    $.ajax(
    {
        url: 'http://localhost:13131/api/BDC',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr>';
                html += '<td>' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td>' + data.Table[i].Docver + '</td>';
                html += '<td>' + data.Table[i].QuoNo + '</td>';
                html += '<td>' + data.Table[i].Price + '</td>';
                html += '<td>' + data.Table[i].Cost + '</td>';
                html += '<td>' + data.Table[i].Profit + '</td>';
                html += '<td>';
                html += '<a href="/BDC/EditBDC?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/edit.png"/></a>';
                html += '<a href="#" id="del' + data.Table[i].ID + '" onclick = " RowDelete(' + data.Table[i].ID + ') " >' + '<img src="/Images/delete.png" /></a>';
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
            url: 'http://localhost:13131/api/BDC/Delete',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                alert('Delete is completed')
                window.location.href = "../BDC/IndexBDC";
            }
            ,
            error: function (msg) {
                alert(msg)
            }

        });
}