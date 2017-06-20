$(document).ready(function () {
    $('.imgadd').attr("style", "margin-left: 72%; margin-top: -2px;");
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
        url: 'http://alphagroup.co.th:8082/api/Product',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr>';
                html += '<td class="nopointer">' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn">' + data.Table[i].ID + '</td>';
                var date = new Date(data.Table[i].ReceiveDate);
                html += '<td class="nopointer">' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '</td>';
                html += '<td class="nopointer">' + data.Table[i].SerialNo + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].MachineNo + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].Description + '</td>';
                //html += '<td class="hideANDseek nopointer">' + data.Table[i].ProductType + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].Brand + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].Model + '</td>';
                html += '<td class="nopointer">' + data.Table[i].Size + '</td>';
                html += '<td class="nopointer">' + GetRemain(data.Table[i].ID) + '</td>';
                html += '<td class="hideANDseek nopointer">' + data.Table[i].UnitWeightName + '</td>';
                html += '<td class="nopointer">';
                html += '<a href="/Products/EditProducts?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgProductsUpdate"/></a>';
                html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'Product'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="imgProductsDelete"/></a>';
                html += '<a href="/Products/EditProducts?id=' + data.Table[i].ID + '&IsView=' + true + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="productsviewDisable"/></a>';
                html += '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            $('#tblProduct').paging({
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

function GetRemain(val) {
    var remain;
    var dataObject = { ProductID: val };
    $.ajax(
       {
           url: 'http://alphagroup.co.th:8082/api/JobOrderBorrow',
           type: 'GET',
           async: false,
           data: dataObject,
           datatype: 'json',
           success: function (data) {
               data = JSON.parse(data);
               remain = data.Table[0].Amount;
           },
           error: function (msg) {
               alert(msg);
           }

       });

    return remain
}
function RowDelete(id) {
    var dataObject = { ID: id, EditBy: localStorage['UserID'] };
    $.ajax(
        {
            url: 'http://alphagroup.co.th:8082/api/Product',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                //alert('Delete is completed')
                window.location.href = "../Products/IndexProducts";
            }
            ,
            error: function (msg) {
                alert(msg)
            }

        });
}

