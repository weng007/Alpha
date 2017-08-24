$(document).ready(function () {
    if (localStorage['UserID'] != undefined) {
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
            url: 'http://localhost:13131/api/IncomeMaster',
            type: 'GET',
            async: false,
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                var html = '';
                for (var i = 0; i < data.Table.length; i++) {
                    //$(".rowdisable").each(function () {
                    html += '<tr>';
                    html += '<td class="nopointer txtcenter">' + data.Table[i].RowNum + '</td>';
                    html += '<td class="hidecolumn nopointer">' + data.Table[i].ID + '</td>';
                    html += '<td class="nopointer">' + data.Table[i].Detail + '</td>';
                    html += '<td class="nopointer text-right">' + AddComma(parseFloat(data.Table[i].PriceList).toFixed(2)) + '</td>';
                    html += '<td class="nopointer txtcenter">' + data.Table[i].Seq + '</td>';
                    html += '<td class="nopointer">';
                    html += '<a href="/IncomeMaster/EditIncomeMaster?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgIncomeUpdate"/></a>';
                    html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'IncomeMaster'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="imgIncomeDelete"/></a>';
                    html += '<a href="/IncomeMaster/EditIncomeMaster?id=' + data.Table[i].ID + '&IsView=' + true + '" id="read' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="imgIncomeView" /></a>';
                    html += '</td>';
                    html += '</tr>';
                    //});
                }
                document.getElementById("result").innerHTML = html;
                CheckAuthorization();
                $('#tblIncomeMaster').paging({
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
    else {
        location = "../Login/IndexLogin";
    }

});
function RowDelete(id) {
    var dataObject = { ID: id, EditBy: localStorage['UserID'] };
    $.ajax(
        {
            url: 'http://localhost:13131/api/IncomeMaster',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                //alert('Delete is completed');
                window.location.href = "../IncomeMaster/IndexIncomeMaster";
            }
            ,
            error: function (msg) {
                alert(msg)
            }

        });
}