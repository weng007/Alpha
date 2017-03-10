
$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();
    $('#tabRoleMaster').dynoTable9();
    SetRoleMaster();
    SetMenuType();
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
    $(window).load(function () {
        $('.cloneRoleMaster').click(function () {
            $('.RowCal:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal:last').find('td input[type=text]').eq(1).val('');
        });
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

function CreateData() {
    $.ajax(
            {
                url: 'http://localhost:13131/api/RoleMaster',
                type: 'DELETE',
                async: false,
                datatype: 'json',
                success: function (result) {
                },
                error: function (msg) {
                    alert(msg)
                }
            });
    $(".RowCal").each(function () {
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
    });
    alert('Update is completed');
    window.location.href = "../RoleMaster/IndexRoleMaster";
}
function GetData() {
    localStorage['flagAddRow'] = 1;
    SetRoleMaster();
    SetMenuType();
    $.ajax(
   {
       url: 'http://localhost:13131/api/RoleMaster',
       type: 'GET',
       async: false,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);

           if (data.Table.length > 0) {
               $('.RowCal').remove();

               for (var j = 0; j < data.Table.length; j++) {
                   $("#add-row9").trigger("click");
               }
               $('.RowCal:eq(' + data.Table.length + ')').remove();

               SetRoleMaster();
               SetMenuType();

               $(".RowCal").each(function (i) {
                   var IsView = data.Table[i].IsView == '1' ? true : false;
                   var IsInsert = data.Table[i].IsInsert == '1' ? true : false;
                   var IsUpdate = data.Table[i].IsUpdate == '1' ? true : false;
                   var IsDelete = data.Table[i].IsDelete == '1' ? true : false;

                   $(this).find('.tdno').val(data.Table[i].RowNum);
                   $(this).find('.RoleMasterID').val(data.Table[i].ID);
                   $(this).find('.cmbRole').val(data.Table[i].RoleID).change();
                   $(this).find('.IsView').prop('checked', IsView);
                   $(this).find('.IsInsert').prop('checked', IsInsert);
                   $(this).find('.IsUpdate').prop('checked', IsUpdate);
                   $(this).find('.IsDelete').prop('checked', IsDelete);
                   $(this).find('.cmbMenuType').val(data.Table[i].MenuTypeID).change();
               });
               GetChecked();
           }
       },
       error: function (msg) {
           alert(msg);
       }
   });
    localStorage['flagAddRow'] = 0;
}
function SetRoleMaster() {

    var dataObject = { typeID: '009' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);

            $.each(data.Table, function (i) {
                $(".cmbRole").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbRole').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function SetMenuType() {

    var dataObject = { typeID: '011' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);

            $.each(data.Table, function (i) {
                $(".cmbMenuType").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbMenuType').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function AddRowRoleMaster() {
    if (localStorage['flagAddRow'] == 0) {
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
}
