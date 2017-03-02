$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();

    $('.Number').number(true, 2);

    

    $("#customerBody").on("click", "tr", function (e) {
        $("#txtCustomerName").val($(this).find("td:eq(3)").text());
        $("#hidCustID").val($(this).find("td:eq(1)").text());
        $("#txtTel").val($(this).find("td:eq(4)").text());
        $("#txtContact").val($(this).find("td:eq(5)").text());
        $("#txtCoWorker").val($(this).find("td:eq(6)").text());
        $("#txtFax").val($(this).find("td:eq(7)").text());
        $("#txtAddress").val($(this).find("td:eq(8)").text());
    })

    cmbIncomeMaster(0);

    $.ajax({

        url: 'http://localhost:13131/api/ExpenseMaster',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('.ExpenseSelect').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.ExpenseSelect').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '010' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('.unitSelect').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.unitSelect').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '001' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbTypeWorking').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbTypeWorking').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '002' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbJobStatus').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbJobStatus').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    $.ajax(
        {
            url: 'http://localhost:13131/api/Customer',
            type: 'GET',
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                var html = '';
                for (var i = 0; i < data.Table.length; i++) {
                    html += '<tr>';
                    html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                    html += '<td class="hidecolumn" data-dismiss="modal">' + data.Table[i].ID + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].CustNo + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].Name + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].Tel + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].Contact + '</td>';
                    html += '<td class="hidecolumn">' + data.Table[i].CoWorker + '</td>';
                    html += '<td class="hidecolumn">' + data.Table[i].Fax + '</td>';
                    html += '<td class="hidecolumn">' + data.Table[i].Address + '</td>';
                    html += '</tr>';
                }
                document.getElementById("customerBody").innerHTML = html;

            },
            error: function (msg) {
                alert(msg)
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

    $("#dtJobDate").datepicker({
        inline: true,
        showOtherMonths: true
    })
    .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');

    $("#dtSWorking").datepicker({
        inline: true,
        showOtherMonths: true
    })
    .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');

    $("#dtEWorking").datepicker({
        inline: true,
        showOtherMonths: true
    })
    .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');

    $("#dtJobDate").datepicker();
    $("#dtSWorking").datepicker();
    $("#dtEWorking").datepicker();
    $("#datepicker4").datepicker();
    $("#datepicker5").datepicker();
    $('#tabManpower').dynoTable2();
    $('#tabSaleOrder').dynoTable3();
    $('#tabInvoice').dynoTable4();
    $('#tabReceipt').dynoTable5();
    $('#tabIncome').dynoTable6();
    $('#tabCost').dynoTable7();

    var dates = new Date();
    $('.timepicker').wickedpicker({ defaultValue: dates.getTime(), twentyFour: true, showSeconds: false });
});
function cmbIncomeMaster(val) {
    $.ajax({
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);
            //alert(val);
            $.each(data.Table, function (i) {
                //alert('master');
                //alert(data.Table[i].ID);
                //alert(data.Table[i].Detail); 
                $('.Select1').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            if (val == 0) {
                //alert('000');
                $('.Select1').find('option:first-child').attr('selected', true);
            }
            else {
                //alert('111');
                //alert(val);
                $(".Select1").val(val);
            }
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetData(val) {
    var dataObject = { ID: val }
    $.ajax(
   {
       url: 'http://localhost:13131/api/JobOrder',
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
               document.getElementById("tBodyRowIncome").innerHTML = html;                        
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
        }
    });
    
    alert('Update is completed');
    window.location.href = "../BDC/EditBDC?id=" + $("#hidBDCID").val();
}

function AddRowIncome(row) {
    $.ajax({
        url: 'http://localhost:13131/api/IncomeMaster',
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
        url: 'http://localhost:13131/api/ExpenseMaster',
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
        url: 'http://localhost:13131/api/MasterService/',
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
    url: 'http://localhost:13131/api/IncomeMaster',
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
        url: 'http://localhost:13131/api/ExpenseMaster',
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
        url: 'http://localhost:13131/api/ExpenseMaster',
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
