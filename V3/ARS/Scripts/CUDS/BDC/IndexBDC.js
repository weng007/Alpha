$(document).ready(function () {
    $('.imgadd').attr("style", "margin-left: 60%; margin-top: -2px;");
    var ShowAll = false;
    GetData(ShowAll);
});
function GetChecked(isCheck)
{
    var ShowAll = isCheck.checked;
    GetData(ShowAll);
}
function GetData(val)
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
    var price;
    var cost;
    var profit;
    
    var dataObject = { isLastVersion: val };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:8082/api/BDC',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr>';
                html += '<td class="nopointer">' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td class="nopointer">' + data.Table[i].Docver + '</td>';
                html += '<td class="nopointer">' + data.Table[i].QuotationNo + '</td>';
                html += '<td class="nopointer">' + data.Table[i].Customer + '</td>';
                html += '<td class="gvPrice text-right nopointer">' + new Intl.NumberFormat('en-IN').format(data.Table[i].Price) + '</td>';
                html += '<td class="gvCost text-right nopointer">' + new Intl.NumberFormat('en-IN').format(data.Table[i].Cost) + '</td>';
                price = data.Table[i].Price;
                cost = data.Table[i].Cost;
                profit = price - cost;
                if (profit < 0)
                {
                    html += '<td style="color:#FF0000" class="gvProfit text-right nopointer"> ' + new Intl.NumberFormat('en-IN').format(profit) + '</td>';
                }
                else
                {
                    html += '<td style="Color: black" class="gvProfit text-right nopointer">' + new Intl.NumberFormat('en-IN').format(profit) + '</td>';
                }
                html += '<td class="nopointer">';
                html += '<a href="/BDC/EditBDC?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgBDCUpdate"/></a>';
                html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'BDC'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="imgBDCDelete"/></a>';
                html += '<a href="/BDC/EditBDC?id=' + data.Table[i].ID + '&IsView=' + true + '" id="read' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="BDCviewDisable"/></a>';
                html += '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            $('#tblBDC').paging({
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
function RowDelete(id) {
    var CountDel;
    var dataObject = { BDCID: id };
    $.ajax({
        url: 'http://localhost:8082/api/BDC',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert("Test "+id);
            CountDel = data.Table[0].CountDelete;
            //alert("CountDelete "+data.Table[0].CountDelete);
        },
        failure: function () {
            alert('Error');
        }
    });
    if (CountDel <= 0)
    {
        //alert("testCountDel");
        var dataObject = { ID: id };
        $.ajax(
            {
                url: 'http://localhost:8082/api/BDC/Delete',
                type: 'DELETE',
                async: false,
                data: dataObject,
                datatype: 'json',

                success: function (result) {
                    //alert('Delete is completed')
                    window.location.href = "../BDC/IndexBDC";
                }
                ,
                error: function (msg) {
                    alert(msg)
                }

            });
    }
    else {
        //alert("Test Else");
        alert("Please Delete JobOrder.");
        window.location.href = "../BDC/IndexBDC";
    }
    
}