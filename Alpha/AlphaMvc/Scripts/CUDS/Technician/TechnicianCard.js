$(document).ready(function () {


    //$('#tableData').paging({ limit: 5 });


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
        $("#Card").find("tr").hide();

        //split the current value of searchInput
        var data = this.value.split(" ");
        //create a jquery object of the rows
        var jo = $("#Card").find("tr");

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
});

function GetDataCard(val) {
    var dataObject = { ID: val }
    $.ajax(
    {
        url: 'http://localhost:8082/api/TechnicianCard',
        type: 'GET',
        //async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr>';
                html += '<td>' + data.Table[i].RowNum + '</td>';
                html += '<td class="hideANDseek">' + data.Table[i].CompanyName + '</td>';
                html += '<td>' + data.Table[i].CerNo + '</td>';
                html += '<td class="hideANDseek">' + data.Table[i].CardType + '</td>';
                var IssueDate = new Date(data.Table[i].IssueDate);
                html += '<td class="hideANDseek">' + IssueDate.getDate() + '/' + (IssueDate.getMonth() + 1) + '/' + IssueDate.getFullYear() + '</td>';
                var ExpiryDate = new Date(data.Table[i].ExpiryDate);
                html += '<td>' + ExpiryDate.getDate() + '/' + (ExpiryDate.getMonth() + 1) + '/' + ExpiryDate.getFullYear() + '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("Card").innerHTML = html;
        },
        error: function (msg) {
            alert(msg)
        }
    });
}