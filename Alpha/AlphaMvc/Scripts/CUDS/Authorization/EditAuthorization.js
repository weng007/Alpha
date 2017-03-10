$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();

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
        $('.cloneRowAuthor').click(function () {
            $('.RowCal:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal:last').find('td input[type=text]').eq(1).val('');
        });
    });
});
$(function () {
    $('#arwAuthorization').dynoTable8();
});
function GetData(val) {
    localStorage['flagAddRow'] = 1;
    SetAuthorization();
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

    $.ajax(
   {
       url: 'http://localhost:13131/api/Authorization',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           ////Binding Data Income
           if (data.Table.length > 0) {          
               $('.RowCal').remove();
               for(var j=0;j< data.Table.length;j++)
               {
                   $("#add-row8").trigger("click");
               }
               $('.RowCal:eq('+ data.Table.length +')').remove();
               
               SetAuthorization();
                
               $(".RowCal").each(function (i) {
                   $(this).find('.tdno').val(data.Table[i].RowNum);
                   $(this).find('.AuthorID').val(data.Table[i].ID);
                   $(this).find('.UserID').val(data.Table[i].UserID);
                   $(this).find('.RoleID').val(data.Table[i].RoleID);
                   $(this).find('.Author').val(data.Table[i].RoleID).change();
               });                 
           }
       },
       error: function (msg) {
           alert(msg);
       }
           
   });
    localStorage['flagAddRow'] = 0;
}

function Update(val) {

    var input = window.location.href;
    var after = input.split('?')[1]
    var str = after.split('-');
    var res = String(str);
    var UserID = res.substring(4, 3);
    var id = 1;

    
    var dataObject = { userID: UserID };
    console.log(dataObject);
    $.ajax(
            {
                url: 'http://localhost:13131/api/Authorization',
                type: 'PUT',
                async: false,
                data: dataObject,
                datatype: 'json',
                success: function (result) {
                },
                error: function (msg) {               
                    alert(msg)
                }
            });

        var dataObject = {};
        $(".RowCal").each(function () {           
            dataObject.UserID = $('#hidUserID').val();
            dataObject.RoleID = $(this).find('.Author').find(":selected").val();
            dataObject.CreateBy = localStorage['UserID'];
            dataObject.EditBy = localStorage['UserID'];
            if ($('#hidUserID').val() != '') {
                $.ajax(
                {
                    url: 'http://localhost:13131/api/Authorization',
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
        });
        alert('Update is completed');
        window.location.href = "../Authorization/EditAuthorization?id=" + UserID;
}
function AddRowAuthor() {
    if (localStorage['flagAddRow'] == 0) {
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
}

function SetAuthorization() {
    var dataObject = { typeID: '009' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);

            $.each(data.Table, function (i) {
                $(".Author").append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.Author').find('option:first-child').attr('selected', true);
            //for (i = 0; i < tmp.length; i++) {
            //    $(".Author:eq(" + i + ")").val(tmp[i].RoleID).change();
            //}
        },
        failure: function () {
            alert('Error');
        }
    });
}





