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
                $('.Author').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.Author').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

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
$(function () {
    $('#arwAuthorization').dynoTable8();
});
function GetData(val) {
    alert(val)
    var dataObject = { ID: val }
    $.ajax(
   {
       url: 'http://localhost:13131/api/UserLogin',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#hidUserID").val(data.Table[0].ID), $("#txtUser").val(data.Table[0].UserName);
       },
       error: function (msg) {
           alert(msg);
       }
   });

    alert(val);
    $.ajax(
   {
       url: 'http://localhost:13131/api/Authorization',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           if (data.Table.length > 0) {
               $('.Author').find("option").remove();
               var html = '<tbody>';
               for (var i = 0; i < data.Table.length; i++) {
                   html += '<tr class="RowCal">';
                   html += '<td>';
                   html += '<img class="drag-handle" src="/Images/drag.png" alt="click and drag to rearrange" />';
                   html += '</td>';
                   html += '<td> <input id="No" type="text" value="' + data.Table[i].RowNum + '" class="tdno" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="AuthorID" type="text" value="' + data.Table[i].ID + '" class="AuthorID" disabled /></td>';
                   html += '<td class="hidecolumn"><input id="UserID" type="text" value="' + data.Table[i].UserID + '" class="UserID" disabled /></td>'; 
                   html += '<td class="hidecolumn"><input id="RoleID" type="text" value="' + data.Table[i].RoleID + '" class="RoleID" disabled /></td>'; 
                   html += '<td> <select id="cmbAuthor" class="Author"></select></td>';
                   html += '<td> <div class="clone-1"><img class="row-cloner" src="/images/clone.png" alt="Clone Row" /></div></td>';
                   html += '<td> <img class="row-remover" src="/images/remove.png" alt="Remove Row" /></td>';
                   html += '</tr>';
               }
               html += '</tbody>';
               document.getElementById("tBodyRowAuthorization").innerHTML = html;                        
               SetAuthorization(data.Table);
           }
       },
       error: function (msg) {
           alert(msg);
       }
           
   });
}
function Update(val) {

    var input = window.location.href;
    var after = input.split('?')[1]
    var UserID = after.split('-');
    $('#hidUserID').val(UserID);

        var dataObject = {};
        $(".RowCal").each(function () {
            dataObject.UserID = $('#hidUserID').val();
            dataObject.RoleID = $(this).find('.Author').find(":selected").val();
            dataObject.CreateBy = localStorage['UserID'];
            dataObject.EditBy = localStorage['UserID'];
            if ($('#hidUserID').val() != '')
            {
                $.ajax(
                {
                    url: 'http://localhost:13131/api/Authorization',
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
            }
        });
        alert('Create is completed');
        window.location.href = "../Authorization/EditAuthorization?id=" + $('#hidUserID').val();
}
function AddRowAuthor() {
    var dataObject = { typeID: '009' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $('.Author:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.Author:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.Author:last').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}

function SetAuthorization(tmp) {

    var dataObject = { typeID: '009' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);

            $.each(data.Table, function (i) {
                $(".Author").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            for (i = 0; i < tmp.length; i++) {
                $(".Author:eq(" + i + ")").val(tmp[i].RoleID).change();
            }
        },
        failure: function () {
            alert('Error');
        }
    });
}





