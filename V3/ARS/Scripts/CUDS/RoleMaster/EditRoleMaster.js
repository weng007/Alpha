$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();

    CheckAuthorization();
    var dataObject = { typeID: '009' };
    $.ajax({
        url: 'http://localhost:13132/api/MasterService/',
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
        url: 'http://localhost:13132/api/MasterService/',
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
$(function () {
    $('#arwRoleMaster').dynoTable();
});
function GetData(val) {
    var dataObject = { ID: val }
    $.ajax(
   {
       url: 'http://localhost:13132/api/JobOrder',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);

           ////Binding Data Income
           if (data.Table1.length > 0) {
               $('.MenuType').find("option").remove();
               $('.RoleID').find("option").remove();
               var html = '<tbody>';
               for (var i = 0; i < data.Table1.length; i++) {
                   html += '<tr class="RowCal">';
                   html += '<td>';
                   html += '<img class="drag-handle" src="/Images/drag.png" alt="click and drag to rearrange" />';
                   html += '</td>';
                   html += '<td> <input id="No" type="text" value="' + data.Table1[i].RowNum + '" class="tdno" disabled /></td>';
                   html += '<td> <select id="cmbRoleID" class="RoleID"></select></td>';
                   html += '<td class="hidecolumn"><input id="JobID" type="text" value="' + data.Table1[i].RoleID + '" class="JobID" disabled /></td>';
                   
                   html += '<td> <select id="cmbMenuType" class="Select1"></select></td>';

                   html += '<td> <input type="text" id="chkIsInsert"  class="IsInsert" Checked="' + data.Table1[i].IsView + '" /></td>';
                   html += '<td> <input type="text" id="chkIsInsert"  class="IsInsert" Checked="' + data.Table1[i].IsInsert + '" /></td>';
                   html += '<td> <input type="text" id="chkIsUpdate"  class="IsUpdate" Checked="' + data.Table1[i].IsUpdate + '"></td>';
                   html += '<td> <input type="text" id="chkIsDelete"  class="IsDelete" Checked="' + data.Table1[i].IsDelete + '"></td>';
                   html += '<td> <div class="clone-1"><img class="row-cloner" src="/images/clone.png" alt="Clone Row" /></div></td>';
                   html += '<td> <img class="row-remover" src="/images/remove.png" alt="Remove Row" /></td>';
                   html += '</tr>';
               }
               html += '</tbody>';
               document.getElementById("tBodyRowRole").innerHTML = html;
               SetIncomeMaster(data.Table1);            
           }
           
       },
       error: function (msg) {
           alert(msg);
       }
   });
}
function Update(val) {
    
    var dataObject = {};
    $(".RowCal").each(function () {
        dataObject.ID = $(this).find(".ID").val();
        dataObject.RoleID = $(this).find('.RoleID').find(":selected").val();
        dataObject.MenuType = $(this).find('.MenuType').find(":selected").val();
        dataObject.IsView = $(this).find('.IsView').val();
        dataObject.IsInsert = $(this).find(".IsInsert").val();
        dataObject.IsUpdate = $(this).find(".IsUpdate").val();
        dataObject.IsDelete = $(this).find(".IsDelete").val();
        dataObject.EditBy = localStorage['UserID'];
        if ($(this).find(".IsView").val() != '' || $(this).find(".IsInsert").val() != '' || $(this).find(".IsUpdate").val() != '') {
            $.ajax(
            {
                url: 'http://localhost:13132/api/RoleMaster',
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
    
    alert('Update is completed');
    window.location.href = "../BDC/EditBDC?id=" + $("#hidBDCID").val();
}

function AddRowIncome(row) {
    $.ajax({
        url: 'http://localhost:13132/api/IncomeMaster',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);

            $('.Select1:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.Select1:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.Select1:last').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function AddRowExpense() {
    $.ajax({
        url: 'http://localhost:13132/api/ExpenseMaster',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);

            $('.ExpenseSelect:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.ExpenseSelect:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.ExpenseSelect:last').find('option:first-child').attr('selected', true);

        },
        failure: function () {
            alert('Error');
        }
    });
    var dataObject = { typeID: '010' };
    $.ajax({
        url: 'http://localhost:13132/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $('.unitSelect:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.unitSelect:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.unitSelect:last').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function Redirect() {
    window.location = "../BDC/EditBDC?id=" + $("#hidBDCID").val();
}

function SetIncomeMaster(tmp) {
    
     $.ajax({
    url: 'http://localhost:13132/api/IncomeMaster',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        data = JSON.parse(data);

        $.each(data.Table, function (i) {
            $(".Select1").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));       
        });

        for(i=0;i<tmp.length;i++)
        {
            $(".Select1:eq("+i+")").val(tmp[i].IncomeType).change();
        }
    },
    failure: function () {
        alert('Error');
    }
});
}

function SetExpenseType(tmp) {

    $.ajax({
        url: 'http://localhost:13132/api/ExpenseMaster',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);

            $.each(data.Table, function (i) {
                $(".ExpenseSelect").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });

            for (i = 0; i < tmp.length; i++) {
                $(".ExpenseSelect:eq(" + i + ")").val(tmp[i].ExpenseType).change();
            }
        },
        failure: function () {
            alert('Error');
        }
    });
}

function SetUnitWeight(tmp) {

    $.ajax({
        url: 'http://localhost:13132/api/ExpenseMaster',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);

            $.each(data.Table, function (i) {
                $(".unitSelect").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });

            for (i = 0; i < tmp.length; i++) {
                $(".unitSelect:eq(" + i + ")").val(tmp[i].UnitWeight).change();
            }
        },
        failure: function () {
            alert('Error');
        }
    });
}
