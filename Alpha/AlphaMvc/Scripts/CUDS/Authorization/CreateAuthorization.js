$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();

    var input = window.location.href;
    var after = input.split('?')[1]
    var str = after.split('-');
    var res = String(str);
    var UserID = res.substring(4, 3);
    alert(UserID);
    $('#hidUserID').val(UserID);

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

    var dataObject = { ID: $('#hidUserID').val() };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/UserLogin',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            $("#txtUser").val(data.Table[0].UserName)
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
    $('#arwAuthorization').dynoTable8();
});
function CreateData() {

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





