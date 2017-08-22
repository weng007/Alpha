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
        url: 'http://localhost:13131/api/Product',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                var date = new Date(data.Table[i].ReceiveDate);
                html += '<tr>' +
                '<td class="nopointer">' + data.Table[i].RowNum + '</td>' +
                '<td class="hidecolumn">' + data.Table[i].ID + '</td>' +
                '<td class="nopointer">' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '</td>' +
                '<td class="nopointer">' + data.Table[i].SerialNo + '</td>' +
                '<td class="hideANDseek nopointer">' + data.Table[i].MachineNo + '</td>' +
                '<td class="hideANDseek nopointer">' + data.Table[i].Description + '</td>' +
                '<td class="hideANDseek nopointer">' + data.Table[i].Brand + '</td>' +
                '<td class="hideANDseek nopointer">' + data.Table[i].Model + '</td>' +
                '<td class="nopointer">' + data.Table[i].Size + '</td>' +
                '<td class="nopointer">' + data.Table[i].StockRemain + '</td>' +
                '<td class="hideANDseek nopointer">' + data.Table[i].UnitWeightName + '</td>' +
                '<td class="nopointer">' +
                '<a href="/Products/EditProducts?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgProductsUpdate"/></a>' +
                '<a href="#" id="del' + data.Table[i].ID + '" onclick="RowDelete(' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="imgProductsDelete"/></a>' +
                '<a href="/Products/EditProducts?id=' + data.Table[i].ID + '&IsView=' + true + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="imgProductsView"/></a>' +
                '</td>' +
                '</tr>';
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
           url: 'http://localhost:13131/api/JobOrderBorrow',
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

    $('#ShowDialog').modal('show');
    var html = '<div class="modal-dialog modal-dialog-danger">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header modal-header-danger">';
    html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
    html += '<h4 class="modal-title">Stock</h4>';
    html += '</div>';
    html += '<div class="modal-body modal-body-info">หากท่านลบรายการนี้ ระบบจะทำการลบ Stock Adjust ที่เกี่ยวข้องด้วย</div>';
    html += '<div class="modal-footer">';
    html += '<button type="button" class="btn btn-danger" onclick="DeleteProductAndProductAdjust(' + id + ')">Yes</button>';
    html += '<button type="button" class="btn btn-danger" data-dismiss="modal">No</button>';
    html += '</div></div></div>';
    document.getElementById("ShowDialog").innerHTML = html;
    
}

function DeleteProductAndProductAdjust(id)
{
    var dataObject = { ID: id, EditBy: localStorage['UserID'] };
    $.ajax(
        {
            url: 'http://localhost:13131/api/Product',
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
