$(document).ready(function () {
    CheckAuthorization();
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
        this.value = "";
        $(this).css({ "color": "black" });
        $(this).unbind('focus');
    }).css({ "color": "#C0C0C0" });

    //------------------------------------ Custom ------------------------------------
    var dataObject = {ID: 5};
    $.ajax(
    {
        url: 'http://localhost:13131/api/CalendarManPower',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            document.getElementById("JobNo").innerHTML = data.Table[0].JobNo + " "+"(" + data.Table[0].TypeWorkingName + ")";

            var html = '<tbody>';
            for (var i = 0; i < data.Table1.length; i++) {
                html += '<tr>';
                html += '<td>' + data.Table1[i].RowNum + '</td>';
                html += '<td class="hidecolumn">' + data.Table1[i].ID + '</td>';
                html += '<td>' + data.Table1[i].TechFullName + '</td>';
                html += '<td>' + data.Table1[i].EmpoyeeType + '</td>';
                html += '<td>' + data.Table1[i].CardTypeName + '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;  
        },
        error: function (msg) {
            alert(msg)
            //alert('test Error');
        }
    });
    
});