$(document).ready(function () {
    var dataObject = { Group: '1' };
    $.ajax({
        url: 'http://localhost:13131/api/MenuMaster/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbMenuMaster').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbMenuMaster').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
    GetMenumasterDetail();

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
    //var dataObject = { typeID: '011' };
    var TempMenu;
    $.ajax({
        url: 'http://localhost:13131/api/MenuMaster',
        type: 'GET',
        async: false,
        dataType: 'json',
        //data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            var html = '';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr class="RowCal">';              
                if (TempMenu != data.Table[i].GroupID)
                {
                    TempMenu = data.Table[i].GroupID;
                    html += '<td colspan="5">' + data.Table[i].MasterID + '. ' + data.Table[i].GroupName + '</td>';
                    html += '<tr class="RowCal">';
                    html += '<td class="hidecolumn"><input type="hidden" class="hidTempGroupName" value="' + data.Table[i].GroupName + '"/></td>';
                    html += '<td class="hidecolumn"><input type="hidden" class="hidMenuTypeID" value="' + data.Table[i].ID + '"/></td>';
                    html += '<td>' + '   - ' + data.Table[i].Detail + '</td>';
                    html += '<td><input id="chkIsView" type="checkbox" class="IsView"></td>';
                    //MN016 Cost & Price, MN001 Dashboard, MN009 Technician, MN010 Expired Technician, MN018 (Report)Job Order, MN019 Requisition
                    if (data.Table[i].MenuID == 'MN016' || data.Table[i].MenuID == 'MN001' || data.Table[i].MenuID == 'MN009' || data.Table[i].MenuID == 'MN010' || data.Table[i].MenuID == 'MN018' || data.Table[i].MenuID == 'MN019')
                    {
                        html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()" style="display:none"></td>';
                        html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()" style="display:none"></td>';
                        html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete" style="display:none"></td>';
                    }
                        //MN006 All Activity, MN007 Calendar Job, MN008 Calendar Man Power, MN017 (Payment)Alpha & Outsource
                    else if (data.Table[i].MenuID == 'MN006' || data.Table[i].MenuID == 'MN007' || data.Table[i].MenuID == 'MN008' || data.Table[i].MenuID == 'MN017')
                    {
                        html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()" style="display:none"></td>';
                        html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()"></td>';
                        html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete" style="display:none"></td>';
                    }
                    else {
                        html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()"></td>';
                        html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()"></td>';
                        html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete"></td>';
                    }
                    html += '</tr>';
                }
                else
                {
                    html += '<td>' + '   - ' + data.Table[i].Detail + '</td>';
                    html += '<td class="hidecolumn"><input type="hidden" class="hidMenuTypeID" value="' + data.Table[i].ID + '"/></td>';
                    html += '<td><input id="chkIsView" type="checkbox" class="IsView"></td>';
                    //MN016 Cost & Price, MN001 Dashboard, MN009 Technician, MN010 Expired Technician, MN018 (Report)Job Order, MN019 Requisition
                    if (data.Table[i].MenuID == 'MN016' || data.Table[i].MenuID == 'MN001' || data.Table[i].MenuID == 'MN009' || data.Table[i].MenuID == 'MN010' || data.Table[i].MenuID == 'MN018' || data.Table[i].MenuID == 'MN019')
                    {
                        html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()" style="display:none"></td>';
                        html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()" style="display:none"></td>';
                        html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete" style="display:none"></td>';
                    }
                        //MN006 All Activity, MN007 Calendar Job, MN008 Calendar Man Power, MN017 (Payment)Alpha & Outsource
                    else if (data.Table[i].MenuID == 'MN006' || data.Table[i].MenuID == 'MN007' || data.Table[i].MenuID == 'MN008' || data.Table[i].MenuID == 'MN017')
                    {
                        html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()" style="display:none"></td>';
                        html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()"></td>';
                        html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete" style="display:none"></td>';
                    }
                    else
                    {
                        html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()"></td>';
                        html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()"></td>';
                        html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete"></td>';
                    }
                    html += '<td class="hidecolumn"><input type="hidden" class="hidTempGroupName" value="' + data.Table[i].Detail + '"/></td>';
                    TempMenu = data.Table[i].GroupID;
                }
                html += '</tr>';
            }
            document.getElementById("result").innerHTML = html;

        },
        error: function (msg) {
            alert(msg)
        }
    });

});
function GetMenumasterDetail()
{
    var val = $('#cmbMenuMaster:last').find(":selected").val();
    var dataObject = { ID: parseInt(val) };
    $.ajax({
        url: 'http://localhost:13131/api/MenuMaster/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $('#cmbMenuMasterDetail').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbMenuMasterDetail').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbMenuMasterDetail').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetChecked() {
    //alert("test");
    $(".RowCal").each(function () {
        var IsInsert = $(this).find('.IsInsert').is(":checked");
        var IsUpdate = $(this).find('.IsUpdate').is(":checked");
        //alert(IsInsert);
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
    var dataObject = { Profile: $("#txtProfile").val(), MenuID: $('#cmbMenuMaster').find(":selected").val(), MenuDetailID: $('#cmbMenuMasterDetail').find(":selected").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'] };
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
            var TempGroupName = $(this).find(".hidTempGroupName").val();
            if (TempGroupName != 'DashBoard' || TempGroupName != 'Administrator' || TempGroupName != 'Activity' || TempGroupName != 'Technician & Card' || TempGroupName != 'Tools & Machine' || TempGroupName != 'Estimate & Job Order' || TempGroupName != 'Payment' || TempGroupName != 'Report')
            {
                dataObject.SecurityID = SecurityID;
                dataObject.MenuID = TempGroupName != 'DashBoard' || TempGroupName != 'Administrator' || TempGroupName != 'Activity' || TempGroupName != 'Technician & Card' || TempGroupName != 'Tools & Machine' || TempGroupName != 'Estimate & Job Order' || TempGroupName != 'Payment' || TempGroupName != 'Report'? $(this).find(".hidMenuTypeID").val() : 0;
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
            }
            //alert("IsView Dashboard " + TempGroupName == 'DashBoard' || TempGroupName == 'Administrator' || TempGroupName == 'Activity' || TempGroupName == 'Technician & Card' || TempGroupName == 'Tools & Machine' || TempGroupName == 'Estimate & Job Order' || TempGroupName == 'Payment' || TempGroupName == 'Report' ? 0 : $(this).find('.IsView').is(":checked"));
            //alert("MenuID " + TempGroupName == 'DashBoard' || TempGroupName == 'Administrator' || TempGroupName == 'Activity' || TempGroupName == 'Technician & Card' || TempGroupName == 'Tools & Machine' || TempGroupName == 'Estimate & Job Order' || TempGroupName == 'Payment' || TempGroupName == 'Report' ? 0 : $(this).find(".hidMenuTypeID").val());

            
        });
    
    
    //alert('Create is completed')
    //window.location.href = "../SecurityProfile/EditSecurityProfile?id="+SecurityID;
    window.location.href = "../SecurityProfile/IndexSecurityProfile";
}