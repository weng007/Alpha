$(document).ready(function () {
    $("#Create").click(function () {
        var dataObject = { Detail: $("#Detail").val() };
        $.ajax(
        {
            url: 'http://localhost:13131/api/ExpenseMaster',
            type: 'POST',
            data: dataObject,
            datatype: 'json',

            success: function (data) {
                alert('Created Successfully');
                window.location.href = "../ExpenseMaster/IndexExpenseMaster";
            },
            error: function (msg) { alert(msg); }
        });
    });
});