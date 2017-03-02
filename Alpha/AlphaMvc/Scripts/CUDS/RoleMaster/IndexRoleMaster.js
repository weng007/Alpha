
$(document).ready(function () {
    hljs.tabReplace = '    '; // 4 spaces
    hljs.initHighlightingOnLoad();
});
function CreateData() {

    var dataObject = {};
    $(".RowCal").each(function () {
        dataObject.RoleID = $(this).find('.RoleID').find(":selected").val();
        dataObject.MenuType = $(this).find('.MenuType').find(":selected").val();
        dataObject.IsView = $(this).find('.IsView').val();
        dataObject.IsInsert = $(this).find(".IsInsert").val();
        dataObject.IsUpdate = $(this).find(".IsUpdate").val();
        dataObject.IsDelete = $(this).find(".IsDelete").val();
        dataObject.CreateBy = localStorage['UserID'];
        dataObject.EditBy = localStorage['UserID'];
        if ($(this).find(".IsView").val() != '' || $(this).find(".IsInsert").val() != '' || $(this).find(".IsUpdate").val() != '') {
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
        }
    });

    alert('Create is completed');
    window.location.href = "../JobOrder/EditJobOrder?id=" + ID;
}

function RowDelete(id) {
    var dataObject = { ID: id, EditBy: localStorage['UserID'] };
    $.ajax(
        {
            url: 'http://localhost:13131/api/IncomeMaster',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                alert('Delete is completed');
                window.location.href = "../IncomeMaster/IndexIncomeMaster";
            }
            ,
            error: function (msg) {
                alert(msg)
            }

        });
}