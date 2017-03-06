
$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();

    var dataObject = { typeID: '009' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('.cmbRole').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbRole').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '011' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('.cmbMenuType').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbMenuType').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    GetData();

    $('#parentHorizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        tabidentify: 'hor_1', // The tab groups identifier
        activate: function (event) { // Callback function if tab is switched
            var $tab = $(this);
            var $info = $('#nested-tabInfo');
            var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();
        }
    });
});
function GetChecked() {
    
    $(".RowCal").each(function () {
        var IsInsert = $(this).find('.IsInsert').is(":checked");
        var IsUpdate = $(this).find('.IsUpdate').is(":checked");

        if (IsInsert || IsUpdate)
        {
            $(this).find('.IsView').prop('checked', true);
            $(this).find('.IsView').prop('disabled', true);
        }
        else if (IsInsert == false && IsUpdate == false)
        {
            $(this).find('.IsView').prop('checked', false);
            $(this).find('.IsView').prop('disabled', false);
        }
    });
}
$(function () {
    $('#arwRoleMaster').dynoTable9();
});
function CreateData() {
    $(".RowCal").each(function () {
        if ($(this).find(".RoleMasterID").val() > 0)
        {
            var dataObject = {};
            $(".RowCal").each(function () {
                dataObject.ID = $(this).find(".RoleMasterID").val();
                dataObject.RoleID = $(this).find('.cmbRole').find(":selected").val();
                dataObject.MenuTypeID = $(this).find('.cmbMenuType').find(":selected").val();
                dataObject.IsView = $(this).find('.IsView').is(":checked") == true ? 1 : 0;
                dataObject.IsInsert = $(this).find('.IsInsert').is(":checked") == true ? 1 : 0;
                dataObject.IsUpdate = $(this).find(".IsUpdate").is(":checked") == true ? 1 : 0;
                dataObject.IsDelete = $(this).find(".IsDelete").is(":checked") == true ? 1 : 0;
                dataObject.EditBy = localStorage['UserID'];
                if ($(this).find(".IsView").val() != '' || $(this).find(".IsInsert").val() != '' || $(this).find(".IsUpdate").val() != '') {
                    $.ajax(
                    {
                        url: 'http://localhost:13131/api/RoleMaster',
                        type: 'PUT',
                        async: false,
                        data: dataObject,
                        datatype: 'json',
                        success: function (data) {
                        },
                        error: function (msg) {
                            alert(msg)
                        }
                    });
                    $('.RowCal').remove();
                }
            });
        }
        else
        {
            var dataObject = {};
            $(".RowCal").each(function () {
                dataObject.RoleID = $(this).find('.cmbRole').find(":selected").val();
                dataObject.MenuTypeID = $(this).find('.cmbMenuType').find(":selected").val();
                dataObject.IsView = $(this).find('.IsView').is(":checked") == true ? 1 : 0;
                dataObject.IsInsert = $(this).find('.IsInsert').is(":checked") == true ? 1 : 0;
                dataObject.IsUpdate = $(this).find(".IsUpdate").is(":checked") == true ? 1 : 0;
                dataObject.IsDelete = $(this).find(".IsDelete").is(":checked") == true ? 1 : 0;
                dataObject.CreateBy = localStorage['UserID'];
                dataObject.EditBy = localStorage['UserID'];

                if ($(this).find(".IsView").is(":checked") == true || $(this).find(".IsInsert").is(":checked") == true || $(this).find(".IsUpdate").is(":checked") == true) {
                    alert('save');
                    $.ajax(
                    {
                        url: 'http://localhost:13131/api/RoleMaster',
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
                    $('.RowCal').remove();
                }
            });
        }
    });
    
    alert('Create is completed');
    //GetData()
    window.location.href = "../RoleMaster/IndexRoleMaster";
}
function GetData() {
    $.ajax(
   {
       url: 'http://localhost:13131/api/RoleMaster',
       type: 'GET',
       async: false,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);

           ////Binding Data Income
           if (data.Table.length > 0) {
               $('.cmbMenuType').find("option").remove();
               $('.cmbRole').find("option").remove();
               var html = '<tbody>';
               for (var i = 0; i < data.Table.length; i++) {
                   var IsView = data.Table[i].IsView == '1' ? 'Checked' : '';
                   var IsInsert = data.Table[i].IsInsert == '1' ? 'Checked' : '';
                   var IsUpdate = data.Table[i].IsUpdate == '1' ? 'Checked' : '';
                   var IsDelete = data.Table[i].IsDelete == '1' ? 'Checked' : '';
                   html += '<tr class="RowCal">';
                   html += '<td>';
                   html += '<img class="drag-handle" src="/Images/drag.png" alt="click and drag to rearrange" />';
                   html += '</td>';
                   html += '<td> <input id="No" type="text" value="' + data.Table[i].RowNum + '" class="tdno" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="RoleMasterID" type="text" class="RoleMasterID" value="' + data.Table[i].ID + '" class="JobID" disabled /></td>';
                   html += '<td> <select id="cmbRole" class="cmbRole"></select></td>';
                   html += '<td> <input type="Checkbox" id="chkIsView"  class="IsView" ' + IsView + ' /></td>';
                   html += '<td> <input type="Checkbox" id="chkIsInsert"  class="IsInsert" ' + IsInsert + ' /></td>';
                   html += '<td> <input type="Checkbox" id="chkIsUpdate"  class="IsUpdate" ' + IsUpdate + '></td>';
                   html += '<td> <input type="Checkbox" id="chkIsDelete"  class="IsDelete" ' + IsDelete + '></td>';
                   html += '<td> <select id="cmbMenuType" class="cmbMenuType"></select></td>';
                   html += '<td> <div class="clone-1"><img class="row-cloner" src="/images/clone.png" alt="Clone Row" /></div></td>';
                   html += '<td> <img class="row-remover" src="/images/remove.png" alt="Remove Row" /></td>';
                   html += '</tr>';
               }
               html += '</tbody>';
               document.getElementById("tBodyRowRole").innerHTML = html;
               SetRoleMaster(data.Table);
               SetMenuType(data.Table);
               GetChecked();
           }

       },
       error: function (msg) {
           alert(msg);
       }
   });
}
function SetRoleMaster(tmp) {

    var dataObject = { typeID: '009' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //$('.cmbRole').find("option").remove();
            $.each(data.Table, function (i) {
                $(".cmbRole").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });

            for (i = 0; i < tmp.length; i++) {
                $(".cmbRole:eq(" + i + ")").val(tmp[i].RoleID).change();
            }
        },
        failure: function () {
            alert('Error');
        }
    });
}
function SetMenuType(tmp) {

    var dataObject = { typeID: '011' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //$('.cmbMenuType').find("option").remove();
            $.each(data.Table, function (i) {
                $(".cmbMenuType").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });

            for (i = 0; i < tmp.length; i++) {
                $(".cmbMenuType:eq(" + i + ")").val(tmp[i].MenuTypeID).change();
            }
        },
        failure: function () {
            alert('Error');
        }
    });
}
function AddRowRoleMaster() {
    var dataObject = { typeID: '009' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);

            $('.cmbRole:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.cmbRole:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbRole:last').find('option:first-child').attr('selected', true);

        },
        failure: function () {
            alert('Error');
        }
    });
    var dataObject = { typeID: '011' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);

            $('.cmbMenuType:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.cmbMenuType:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbMenuType:last').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
