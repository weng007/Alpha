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
    var dataObject = { typeID: '011' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            var html = '';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr class="RowCal">';
                html += '<td>' + (i+1) + '</td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidMenuTypeID" value="' + data.Table[i].ID + '"/></td>';
                html += '<td>' + data.Table[i].Detail + '</td>';
                html += '<td><input id="chkIsView" type="checkbox" class="IsView"></td>';
                html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()"></td>';
                html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()"></td>';
                html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete"></td>';
                html += '</tr>';
            }
            document.getElementById("result").innerHTML = html;

        },
        error: function (msg) {
            alert(msg)
        }
    });

});
function GetChecked() {
    $(".RowCal").each(function () {
        var IsInsert = $(this).find('.IsInsert').is(":checked");
        var IsUpdate = $(this).find('.IsUpdate').is(":checked");

        if (IsInsert || IsUpdate) {
            $(this).find('.IsView').prop('checked', true);
            $(this).find('.IsView').prop('disabled', true);
        }
        else if (IsInsert == false && IsUpdate == false) {
            $(this).find('.IsView').prop('checked', false);
            $(this).find('.IsView').prop('disabled', false);
        }
    });
}
function CreateData() {
    var dataObject = { Profile: $("#txtProfile").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'] };
    var SecurityID;
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/SecurityProfile',
        type: 'POST',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            //alert('data '+data);
            SecurityID = data;
        }
        ,
        error: function (msg) {
            alert(msg)
        }
    });

    var dataObject = {};
    $(".RowCal").each(function () {
        dataObject.SecurityID = SecurityID;
        dataObject.MenuTypeID = $(this).find(".hidMenuTypeID").val();
        dataObject.IsView = $(this).find('.IsView').is(":checked") == true ? 1 : 0;
        dataObject.IsInsert = $(this).find('.IsInsert').is(":checked") == true ? 1 : 0;
        dataObject.IsUpdate = $(this).find(".IsUpdate").is(":checked") == true ? 1 : 0;
        dataObject.IsDelete = $(this).find(".IsDelete").is(":checked") == true ? 1 : 0;
        dataObject.CreateBy = localStorage['UserID'];
        dataObject.EditBy = localStorage['UserID'];
            $.ajax(
            {
                url: 'http://localhost:13131/api/SecurityProfileDetail',
                type: 'POST',
                async: false,
                data: dataObject,
                datatype: 'json',
                success: function (data) {

                },
                error: function (msg) {
                    alert(msg)
                }
            });
    });
    alert('Create is completed')
    window.location.href = "../SecurityProfile/EditSecurityProfile?id="+SecurityID;
}