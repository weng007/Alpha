$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();

    //var input = window.location.href;
    //var after = input.split('?')[1]
    //var str = after.split('-');
    //var res = String(str);
    //var UserID = res.substring(4, 3);
    //alert(UserID);
    //$('#hidUserID').val(UserID);

    $("#userBody").on("click", "tr", function (e) {
        $("#txtUser").val($(this).find("td:eq(2)").text());
        $("#hidUserID").val($(this).find("td:eq(1)").text());
    })

    var dataObject = { Mode: false};
    $.ajax(
       {
           url: 'http://alphagroup.co.th:8082/api/UserLogin',
           type: 'GET',
           async: false,
           datatype: 'json',
           data: dataObject,
           success: function (data) {
               data = JSON.parse(data);
               var html = '';
               for (var i = 0; i < data.Table.length; i++) {
                   html += '<tr>';
                   html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                   html += '<td class="hidecolumn" data-dismiss="modal">' + data.Table[i].ID + '</td>';
                   html += '<td data-dismiss="modal">' + data.Table[i].UserName + '</td>';
                   html += '</tr>';
               }
               document.getElementById("userBody").innerHTML = html;

           },
           error: function (msg) {
               alert(msg)
           }
       });

    var dataObject = { typeID: '009' };
    $.ajax({
        url: 'http://alphagroup.co.th:8082/api/MasterService/',
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
                    url: 'http://alphagroup.co.th:8082/api/Authorization',
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
        url: 'http://alphagroup.co.th:8082/api/MasterService/',
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





