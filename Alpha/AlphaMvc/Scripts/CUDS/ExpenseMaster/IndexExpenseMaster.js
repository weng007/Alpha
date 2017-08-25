$(document).ready(function () {
    CheckAuthorization();
    $('.imgadd').attr("style", "margin-left: 68%; margin-top: -2px;");
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
            //jo = jo.filter("*:contains('" + v + "')");
            jo = jo.filter(function () {
                return $(this).text().toLowerCase().indexOf(v.toLowerCase()) > -1;
            });
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
                html += '<td class="nopointer txtcenter">' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn nopointer">' + data.Table[i].ID + '</td>';
                html += '<td class="nopointer">' + data.Table[i].ExpenseGroup + '</td>';
                html += '<td class="nopointer">' + data.Table[i].Detail + '</td>';
                html += '<td class="nopointer text-right">' + AddComma(parseFloat(data.Table[i].PriceList).toFixed(2)) + '</td>';
                html += '<td class="nopointer txtcenter hideANDseek">' + data.Table[i].Seq + '</td>';
                html += '<td class="nopointer padedit">';
                //ManJob
                if (data.Table[i].ID == 1080 || data.Table[i].ID == 1081 || data.Table[i].ID == 1082 || data.Table[i].ID == 1083 || data.Table[i].ID == 1084 || data.Table[i].ID == 1091 || data.Table[i].ID == 1092 || data.Table[i].ID == 1093 || data.Table[i].ID == 1094 || data.Table[i].ID == 1095 || data.Table[i].ID == 1096 || data.Table[i].ID == 1097 || data.Table[i].ID == 1098 || data.Table[i].ID == 1099 || data.Table[i].ID == 1100)
                {
                    html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgExpenseUpdate" /></a>';
                    //html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'ExpenseMaster'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="imgExpenseDelete" /></a>';
                    html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '&IsView=' + true + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="imgExpenseView" /></a>';
                }
                else {
                    html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgExpenseUpdate" /></a>';
                    html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'ExpenseMaster'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="imgExpenseDelete" /></a>';
                    html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '&IsView=' + true + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="imgExpenseView" /></a>';
                }
                html += '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
            
            $('#tblExpenseMaster').paging({
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
});
function RowDelete(id) {
    var dataObject = { ID: id, EditBy: localStorage['UserID'] };
    $.ajax(
        {
            url: 'http://localhost:13131/api/ExpenseMaster/Delete',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                //alert('Delete is completed')
                window.location.href = "../ExpenseMaster/IndexExpenseMaster";
            }
            ,
            error: function (msg) {
                alert(msg)
            }


        });
}