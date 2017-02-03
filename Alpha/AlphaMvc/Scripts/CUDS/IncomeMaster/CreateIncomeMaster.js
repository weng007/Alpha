$(document).ready(function () {

    $("#Create").click(function () {
        var dataObject = { Detail: $("#Detail").val() };
        $.ajax(
        {
            url: 'http://localhost:13131/api/IncomeMaster',
            type: 'POST',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                alert('Create is completed')
                window.location.href = "../IncomeMaster/IndexIncomeMaster";
            }
            ,
            error: function (msg) {
                alert(msg)
            }
        });
    });
});