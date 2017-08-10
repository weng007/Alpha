$(document).ready(function () {

    GetJobOrder();
});
function GetJobOrder() {
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


    //var dataObject = { ID: val }
    $.ajax(
    {
        url: 'http://localhost:13131/api/JobOrder',
        type: 'GET',
        //data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                var Taker = data.Table[i].Taker != null ? data.Table[i].Taker : '-';
                var Giver = data.Table[i].Giver != null ? data.Table[i].Giver : '-';
                html += '<tr>';
                html += '<td class=txtcenter">' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td class="nopointer">' + data.Table[i].JobNo + '</td>';
                var JobDate = new Date(data.Table[i].JobDate);
                html += '<td class="nopointer">' + JobDate.getDate() + '/' + (JobDate.getMonth() + 1) + '/' + JobDate.getFullYear() + '</td>';
                html += '<td class="nopointer">' + data.Table[i].Name + '</td>';
                html += '<td class="nopointer nopointer">' + Taker + '</td>';
                html += '<td class="nopointer nopointer">' + Giver + '</td>';
                html += '<td class="nopointer nopointer">' + data.Table[i].Status + '</td>';
                html += '<td class="nopointer hidecolumn">' + data.Table[i].Tel + '</td>';
                html += '<td class="nopointer hidecolumn">' + data.Table[i].Contact + '</td>';
                html += '<td class="nopointer hidecolumn">' + data.Table[i].CoWorker + '</td>';
                html += '<td class="nopointer hidecolumn">' + data.Table[i].Remark + '</td>';
                html += '<td class="nopointer">';
                html += '<a href="/Reports/FormReport/RptBorrowViewer.aspx?id=' + data.Table[i].ID + '" id="read' + data.Table[i].ID + '" target="_blank">' + '<img src="/Images/report.png" style="cursor:hand" class="Reportview"/></a>';
                html += '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            $('#tblRptBorrow').paging({
                limit: 30,
                rowDisplayStyle: 'block',
                activePage: 0,
                rows: []
            });
        },
        error: function (result) {
            alert(result)
        }
    });
}
function RowDelete(id) {
    var input = window.location.href;
    var after = input.split('?')[1]
    var ID = after.split('=');
    var BDCID = ID[1];
    var dataObject = { ID: id };
    $.ajax(
        {
            url: 'http://localhost:13131/api/JobOrder',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                
                window.location.href = "../BDC/EditBDC?id=" + BDCID;
            }
            ,
            error: function (msg) {
                alert(msg)
            }
        });
}