$(document).ready(function () {
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
            //jo = jo.filter("*:contains('" + v + "')");
            jo = jo.filter(function () {
                return $(this).text().toLowerCase().indexOf(v.toLowerCase()) > -1;
            });
        });
        jo.show();

    }).focus(function () {
        $(this).css({ "color": "black" });
        $(this).unbind('focus');
    }).css({ "color": "#C0C0C0" });

    //------------------------------------ Custom ------------------------------------
    $.ajax(
    {
        url: 'http://localhost:13131/api/UserLogin',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '';
            for (var i = 0; i < data.Table.length; i++) {
                var FullName = data.Table[i].FullName != null ? data.Table[i].FullName : '-';
                var Email = data.Table[i].Email != null ? data.Table[i].Email : '-';
                html += '<tr>';
                html += '<td class="nopointer txtcenter">' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td class="nopointer">' + data.Table[i].UserName + '</td>';
                html += '<td class="nopointer">' + FullName + '</td>';
                html += '<td class="nopointer">' + Email + '</td>';
                //html += '<td class="nopointer">' + data.Table[i].UserStatus + '</td>';
                html += '<td class="nopointer">' + data.Table[i].SecurityProfile + '</td>';
                html += '<td>';
                html += '<a href="/User/EditUser?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/edit.png" class="imgUserUpdate" /></a>';
                html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'User'" + ',' + data.Table[i].ID + ')" >' + '<img src="/Images/delete.png" class="imgUserDelete"/></a>';
                html += '<a href="/User/EditUser?id=' + data.Table[i].ID + '&IsView=' + true + '" id="read' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="imgUserView" /></a>';
                html += '</td>';
                html += '</tr>';
            }
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            $('#tblUser').paging({
                limit: 30,
                rowDisplayStyle: 'block',
                activePage: 0,
                rows: []
            });
        },
        error: function (msg) {
            //alert(msg)
        }
    });

});
function RowDelete(id) {
    var dataObject = { ID: id, EditBy: localStorage['UserID'] };
    $.ajax(
        {
            url: 'http://localhost:13131/api/UserLogin',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                
                window.location.href = "../User/IndexUser";
            }
            ,
            error: function (msg) {
                alert(msg)
            }

        });
}