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

    $.ajax(
    {
        url: 'http://localhost:13131/api/SecurityProfile',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr>';
                html += '<td>' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td>' + data.Table[i].Profile + '</td>';
                html += '<td>';
                html += '<a href="/SecurityProfile/EditSecurityProfile?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="adminupdateDisable"/></a>';
                html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'IncomeMaster'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="admindeleteDisable"/></a>';
                html += '</td>';
                html += '</tr>';
            }
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
        },
        error: function (msg) {
            alert(msg)
        }
    });

});
//function RowDelete(id) {
//    var dataObject = { ID: id, EditBy: localStorage['UserID'] };
//    $.ajax(
//        {
//            url: 'http://localhost:13131/api/IncomeMaster',
//            type: 'DELETE',
//            data: dataObject,
//            datatype: 'json',

//            success: function (result) {
//                alert('Delete is completed');
//                window.location.href = "../IncomeMaster/IndexIncomeMaster";
//            }
//            ,
//            error: function (msg) {
//                alert(msg)
//            }

//        });
//}