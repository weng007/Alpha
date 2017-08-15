$(document).ready(function () {

  
});
function GetJobOrder(val)
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
    //var input = window.location.href;
    //var after = input.split('?')[1]
    //var BDCID = after.split('=');
    //var ID = BDCID[1];
    //alert('JobBDC '+ID);
    $('#hidBDCID').val(val);
    var dataObject = { ID: val };
    $.ajax(
    {
        url: 'http://localhost:13131/api/BDCJob',
        type: 'GET',
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '<tbody>';
            if (data.Table.length > 0)
            {
                $('#imgJobOrderCreate').attr("style", "display:none");
            }
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr>';
                html += '<td>' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td>' + data.Table[i].JobNo + '</td>';
                var JobDate = new Date(data.Table[i].JobDate);
                html += '<td>' + JobDate.getDate() + '/' + (JobDate.getMonth() + 1) + '/' + JobDate.getFullYear() + '</td>';
                html += '<td>' + data.Table[i].Name + '</td>';
                html += '<td>' + data.Table[i].Tel + '</td>';
                html += '<td class="hideANDseek">' + data.Table[i].Contact + '</td>';
                html += '<td class="hideANDseek">' + data.Table[i].CoWorker + '</td>';
                html += '<td class="hideANDseek">' + data.Table[i].Remark + '</td>';
                html += '<td>';
                html += '<a href="/JobOrder/EditJobOrder?id=' + data.Table[i].ID + '&' + "BDCJob" + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgBDCUpdate"/></a>';
                html += '<a href="#" id="del' + data.Table[i].ID + '" onclick = " ConfirmDialog(' + " 'Delete'" + ',' + "'JobOrder'" + ',' + data.Table[i].ID + ')"" style="margin-right: 5px;">' + '<img src="/Images/delete.png" class="imgBDCDelete"/></a>';
                html += '<a href="/JobOrder/EditJobOrder?id=' + data.Table[i].ID + '&' + "BDCJob" + '&' + "true" + '" id="read' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="BDCviewDisable"/></a>';
                html += '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            $('#tblBDCJOb').paging({
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
    var dataObject = { ID: id };
    $.ajax(
        {
            url: 'http://localhost:13131/api/JobOrder',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                //alert('Delete is completed')
                var hidBDCID = $('#hidBDCID').val();
                window.location.href = "../BDC/EditBDC?id=" + hidBDCID;
            }
            ,
            error: function (msg) {
                alert(msg)
            }
        });
}