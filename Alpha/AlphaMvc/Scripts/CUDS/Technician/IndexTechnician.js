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
        $("#result").find("tr").hide();

        //split the current value of searchInput
        var data = this.value.split(" ");
        //create a jquery object of the rows
        var jo = $("#result").find("tr");

        //Recusively filter the jquery object to get results.
        $.each(data, function (i, v) {
            //jo = jo.filter("*:contains('" + v + "')");
            jo = jo.filter(function () {
                return $(this).text().toLowerCase().indexOf(v.toLowerCase()) > -1;
            });
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
        url: 'http://localhost:13131/api/Technician',
        type: 'GET',
        datatype: 'json',
        success: function (data) {

            data = JSON.parse(data);
            console.log(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr>';
                html += '<td class="nopointer">' + data.Table[i].RowNum + '</td>';
                //html += '<td class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td class="nopointer hidecolumn">' + data.Table[i].TechnicianNo + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].HRCode + '</td>';
                html += '<td class="nopointer nopointer">' + data.Table[i].FirstName + '</td>';
                html += '<td class="nopointer">' + data.Table[i].Position + '</td>';
                html += '<td class="nopointer">' + data.Table[i].IDCard + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].TechnicianTypeName + '</td>';
                html += '<td class="nopointer">';
                html += '<a href="/Technician/EditTechnician?id=' + data.Table[i].TechnicianNo + '"  id="edit' + data.Table[i].TechnicianNo + '">' + '<img src="/Images/view.png" class="imgTechCreate" /></a>';
                html += '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            $('#tblTechnician').paging({
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
});